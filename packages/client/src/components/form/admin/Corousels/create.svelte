<script>
  import { navigate } from "svelte-routing";
  import { post } from "../../../../lib/API/methods";
  import swa from "../../../../lib/popalert";
  export let sx = "";
  let form;
  let submitButton;
  let err = { name: "", img: "", url: "" };
  let validated = false;
  const imgSize = 50000000;
  const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const name = formData.get("name");
    const img = formData.get("img");
    const url = formData.get("url");

    err = { ...err, name: "", img: "", url: "" };
    if (name === "") {
      err = { ...err, name: "Name is required" };
    }
    //check image file can't be empty and must be image file and size must be less than 50MB
    if (img.size > imgSize) {
      err = {
        ...err,
        img: `Image size must be less than ${imgSize / 1000000} MB`,
      };
    }
    //check image file extension
    if (
      !authorizedExtensions.includes(img.name.slice(img.name.lastIndexOf(".")))
    ) {
      err = { ...err, img: `Image must be ${authorizedExtensions.join(", ")}` };
    }
    //check image file name
    if (img.name === "") {
      err = { ...err, img: "Image is required" };
    }
    //check link must be url
    if (!url.includes("http") && url !== "") {
      err = { ...err, url: "Link must be url: https://example.com" };
    }

    //check if form is validated
    validated = Object.values(err).every((e) => e === "");

    //disable submit button if form is not validated
    submitButton.disabled = !validated;
  };

  //submit form function
  const handlerSubmit = () => {
    //get form data
    const formData = new FormData(form);
    const name = formData.get("name");
    const img = formData.get("img");
    const url = formData.get("url");
    const data = {
      name,
      img,
      url,
    };
    console.log(data);
    //change button while creating
    submitButton.innerHTML = "Creating...";
    submitButton.disabled = true;
    //send data to server
    post("corousels", data, {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((res) => {
        console.log(res);
        swa(
          {
            icon: res.status,
            title: res.status,
            text: res.message,
          },
          () => {
            //change button after creating
            if(res.status === "success"){
                submitButton.innerHTML = "Created";
            submitButton.disabled = false;
            navigate("/viewcorousels");
            }else{
                submitButton.innerHTML = "Create";
            submitButton.disabled = false;
            form.reset();
            }
            
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<form
  class={"form-control" + sx}
  bind:this={form}
  on:submit|preventDefault={handlerSubmit}
  on:change={formValidate}
>
  <h2 class="text-2xl font-semibold text-center">
    Create New Banner Corousels
  </h2>
  <div class="mb-4">
    <label for="name" class="label justify-start"
      >Name<span class="text-red-500">*</span></label
    >
    <input
      type="text"
      name="name"
      id="name"
      required
      class="input input-bordered input-primary w-full"
      placeholder="Enter corousel name here (required)"
    />
    {#if err.name}
      <p class="text-red-500">{err.name}</p>
    {/if}
  </div>

  <div class="mb-4">
    <label for="img" class="label justify-start"
      >Image<span class="text-red-500">*</span></label
    >
    <input
      class="file-input file-input-bordered file-input-primary w-full"
      type="file"
      name="img"
      id="img"
      accept={authorizedExtensions.join(",")}
      required
    />
    {#if err.img}
      <p class="text-red-500">{err.img}</p>
    {/if}
  </div>

  <div class="mb-4">
    <label for="url" class="label">Link</label>
    <input
      type="url"
      name="url"
      id="url"
      class="input input-bordered input-primary w-full"
      placeholder="Enter banner reference link here. (Option)"
    />
    {#if err.url}
      <p class="text-red-500">{err.url}</p>
    {/if}
  </div>

  <div class="mt-6">
    <button
      bind:this={submitButton}
      type="submit"
      class="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:btn-loading"
      >Create</button
    >
  </div>
</form>
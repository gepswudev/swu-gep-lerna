<script>
  import { navigate, link } from "svelte-routing";
  import { get, put } from "../../../../lib/API/methods";
  import log from "../../../../lib/log";
  import Loading from "../../../Loading.svelte";
  import swa from "../../../../lib/popalert";
  import getImg from "../../../../lib/getImg";
  export let id;
  export let sx = "";
  let form;
  let submitButton;
  let err = { name: "", img: "", url: "" };
  let validated = false;
  let name;
  let img;
  let url;
  let previewData = {
    name: "Banner Corousel Preview",
    img: "https://via.placeholder.com/1440x650",
    url: "#",
  };

  //preview data function
  const loadPreview = () => {
    const formData = new FormData(form);
    const name = formData.get("name");
    const img = formData.get("img");
    const url = formData.get("url");

    previewData = {
      ...previewData,
      name,
      img: getImg(img),
      url,
    };
  };

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const name = formData.get("name");
    const url = formData.get("url");

    err = { ...err, name: "", url: "" };
    if (name === "") {
      err = { ...err, name: "Name is required" };
    }

    //check link must be url
    if (!url.includes("http") && href !== "") {
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
    const newimg = formData.get("newimg");
    const url = formData.get("url");
    const data = {
      name,
      url,
      img:newimg,
    };

    //change button while creating
    submitButton.innerHTML = "Updating...";
    submitButton.disabled = true;
    //send data to server
    put(`corousels/${id}`, data, {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((res) => {

        swa({
          icon: res.status,
          title: res.status,
          text: res.message,
        },
          () => {
            //change button after creating
            submitButton.innerHTML = "Update";
            submitButton.disabled = false;
            navigate("/viewcorousels", { replace: true });

          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get activity data by id and set it to form
  let corousel = get(`corousels/${id}`).then((res) => {
    if (res.status === "error")
      return swa(
        {
          icon: res.status,
          title: res.status,
          text: res.message,
        },
        () => {
          if (res.status === "error") navigate("/viewcorousels", { replace: true });
        }
      );
    log("Edit corousel", `Corousel: ${res.data.name} (${res.data._id})`);
    

    name = res.data.name;
    previewData.name = name;
    img = res.data.img;
    previewData.img = getImg(img);
    url = res.data.url;
    previewData.url = url;
    corousel = res.data;
    return res.data;
  });
</script>

{#await corousel}
  <Loading title="Loading activity data" desc="Please wait..." />
  <form bind:this={form} />
{:then data}
<div class="flex flex-col md:flex-row">
  <div class="max-w-md flex-1 mx-16 my-4 gap-4">
    <p class="text-center">Preview</p>
    <a use:link replace href={previewData.url} class="flex justify-center hover:tooltip-open" tooltip={`Go to ${previewData.url}`} target="_blank">
      <img
        src={previewData.img}
        alt={previewData.name+"_Banner"}
        class="w-full"
      />
    </a>
  </div>
  <form
    class={"form-control flex-1 " + sx}
    bind:this={form}
    on:submit|preventDefault={handlerSubmit}
    on:change={formValidate}
  >
    <h2 class="text-2xl font-semibold text-center">
      Create New Banner Carousels
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
        bind:value={name}
      />
      {#if err.name}
        <p class="text-red-500">{err.name}</p>
      {/if}
    </div>

    <div class="mb-4">
      <label for="img" class="label justify-start"
        >Image<span
          class="text-red-500">*</span
        ></label
      >
      <input
        type="text"
        name="img"
        id="img"
        class="input input-bordered input-primary w-full"
        placeholder="Enter banner image here (required)"
        readonly
        value={img}
      />
      <label for="newimg" class="label justify-start"
        >Upload new image</label
      >
      <input type="file" name="newimg" id="newimg" class="file-input file-input-primary file-input-bordered w-full">
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
        bind:value={url}
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
        >Update</button
      >
    </div>
  </form>
</div>
{/await}

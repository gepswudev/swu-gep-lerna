<script>
  import { navigate } from "svelte-routing";
  import { get, put } from "../../../../lib/API/methods";
  import log from "../../../../lib/log";
  import Loading from "../../../Loading.svelte";
  import swa from "../../../../lib/popalert";
  export let id;
  export let sx = "";
  let form;
  let submitButton;
  let err = { name: "", img: "", url: "" };
  let validated = false;
  let name;
  let img;
  let url;

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
    const url = formData.get("url");
    const data = {
      name,
      url,
    };
    console.log(data);
    //change button while creating
    submitButton.innerHTML = "Updating...";
    submitButton.disabled = true;
    //send data to server
    put(`corousels/${id}`, data, {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((res) => {
        console.log(res);
        swa({
          icon: res.status,
          title: res.status,
          text: res.message,
        },
          () => {
            //change button after creating
            submitButton.innerHTML = "Update";
            submitButton.disabled = false;
            navigate("/viewcorousels");
            console.log(res);
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
          if (res.status === "error") navigate("/viewcorousels");
        }
      );
    log("Edit corousel", `Corousel: ${res.data.name} (${res.data._id})`);
    console.log(res);
    name = res.data.name;
    img = res.data.img;
    url = res.data.url;
    corousel = res.data;
    return res.data;
  });
</script>

{#await corousel}
  <Loading title="Loading activity data" desc="Please wait..." />
  <form bind:this={form} />
{:then data}
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
        bind:value={name}
      />
      {#if err.name}
        <p class="text-red-500">{err.name}</p>
      {/if}
    </div>

    <div class="mb-4">
      <label for="img" class="label justify-start"
        >Image (Image can't edit, Please delete and create new one!)<span
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
{/await}

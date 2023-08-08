<script>
  import { onMount } from "svelte";
  import { get, post } from "../../../../lib/API/methods";
  import swa from "../../../../lib/popalert";
  import log from "../../../../lib/log";
  import Loading from "../../../Loading.svelte";
  export let id;
  export let sx = "";
  let form;
  let submitButton;
  let err = { title: "", desc: "", img: "", href: "", badge: "" };
  let validated = false;
  const imgSize = 10000000;
  const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const img = formData.get("img");
    const href = formData.get("href");
    const badge = formData.get("badge");

    err = { ...err, title: "", desc: "", img: "", href: "", badge: "" };
    if (title === "") {
      err = { ...err, title: "Title is required" };
    }
    //check image file can't be empty and must be image file and size must be less than 10MB
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
    if (!href.includes("http") && href !== "") {
      err = { ...err, href: "Link must be url: https://example.com" };
    }
    //check badge must be at most 8 characters
    if (badge !== "") {
      if (badge.length > 8) {
        err = { ...err, badge: "Badge must be at most 8 characters" };
      }
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
    const title = formData.get("title");
    const desc = formData.get("desc");
    const img = formData.get("img");
    const href = formData.get("href");
    const badge = formData.get("badge");
    const data = {
      title,
      desc,
      img,
      href,
      badge,
    };
    console.log(data);
    post("activities", data, {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((res) => {
        console.log(res);
        swa({
          icon: res.status,
          title: res.status,
          text: res.message,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get activity data by id and set it to form
  let activity = get(`activities/${id}`).then((res) => {
    if (res.status === "error")
      return swa({
        icon: res.status,
        title: res.status,
        text: res.message,
      });
    log("Edit activity", `Activity: ${res.data.title} (${res.data.id})`);
    form.title.value = activity.title;
    form.desc.value = activity.desc;
    form.href.value = activity.href;
    form.badge.value = activity.badge;
  });
</script>

{#await activity}
  <Loading title="Loading activity data" desc="Please wait..." />
{:then data}
  <form
    class={"form-control" + sx}
    bind:this={form}
    on:submit|preventDefault={handlerSubmit}
    on:change={formValidate}
  >
    <h2 class="text-2xl font-semibold text-center">Activity : {data.title}</h2>
    <div class="mb-4">
      <label for="title" class="label justify-start"
        >Title<span class="text-red-500">*</span></label
      >
      <input
        type="text"
        name="title"
        id="title"
        required
        class="input input-bordered input-primary w-full"
        placeholder="Enter activity title here (required)"
      />
      {#if err.title}
        <p class="text-red-500">{err.title}</p>
      {/if}
    </div>

    <div class="mb-4">
      <label for="desc" class="label">Description</label>
      <textarea
        name="desc"
        id="desc"
        class="textarea textarea-primary w-full"
        placeholder="Enter activity description here. (Option)"
      />
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
      <label for="href" class="label">Link</label>
      <input
        type="url"
        name="href"
        id="href"
        class="input input-bordered input-primary w-full"
        placeholder="Enter activity reference link here. (Option)"
      />
      {#if err.href}
        <p class="text-red-500">{err.href}</p>
      {/if}
    </div>

    <div class="mb-4">
      <label for="badge" class="label">Badge</label>
      <input
        type="text"
        name="badge"
        id="badge"
        class="input input-bordered input-primary w-full"
        placeholder="Enter activity badge here. (Option)"
      />
      {#if err.badge}
        <p class="text-red-500">{err.badge}</p>
      {/if}
    </div>

    <div class="mt-6">
      <button bind:this={submitButton} type="submit" class="btn btn-primary"
        >Create</button
      >
    </div>
  </form>
{/await}

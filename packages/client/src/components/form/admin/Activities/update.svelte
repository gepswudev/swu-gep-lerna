<script>
  import { get, put } from "../../../../lib/API/methods";
  import swa from "../../../../lib/popalert";
  import log from "../../../../lib/log";
  import Loading from "../../../Loading.svelte";
  import { navigate } from "svelte-routing";
  export let id;
  export let sx = "";
  let form;
  let title;
  let desc;
  let img;
  let href;
  let badge;
  let tag;
  let submitButton;
  let err = { title: "", desc: "", img: "", href: "", badge: "" };
  let validated = false;

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const img = formData.get("img");
    const href = formData.get("href");
    const badge = formData.get("badge");
    const tag = formData.get("tag");

    err = { ...err, title: "", desc: "", img: "", href: "", badge: "" , tag: ""};
    if (title === "") {
      err = { ...err, title: "Title is required" };
    }
    //check link must be url
    if (!href.includes("http") && href !== "") {
      err = {
        ...err,
        href: "Link must be url: https://example.com or leave it empty",
      };
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
    const tag = formData.get("tag");

    const data = {
      title,
      desc,
      href,
      badge,
      tag
    };
    console.log(data);
    put(`activities/${id}`, data, {
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
        navigate("/viewactivities");
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
    log("Edit activity", `Activity: ${res.data.title} (${res.data._id})`);
    console.log(res);
    activity = res.data;
    title = res.data.title;
    desc = res.data.desc;
    img = res.data.img;
    href = res.data.href;
    badge = res.data.badge;
    return res.data;
  });
</script>

{#await activity}
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
      Update Activity : {data?.title}
    </h2>
    <div class="mb-4">
      <label for="title" class="label justify-start"
        >Title<span class="text-red-500">*</span></label
      >
      <input
        bind:value={title}
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
        bind:value={desc}
        name="desc"
        id="desc"
        class="textarea textarea-primary w-full"
        placeholder="Enter activity description here. (Option)"
      />
    </div>

    <div class="mb-4">
      <label for="img" class="label justify-start"
        >Image (Image can't edit, Please delete and create new one!)<span
          class="text-red-500">*</span
        ></label
      >
      <input
        class="input input-bordered input-primary w-full"
        type="text"
        name="img"
        id="img"
        bind:value={img}
        readonly
      />
      {#if err.img}
        <p class="text-red-500">{err.img}</p>
      {/if}
    </div>

    <div class="mb-4">
      <label for="href" class="label">Link</label>
      <input
        bind:value={href}
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
        bind:value={badge}
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

    <div class="mb-4">
      <label for="tag" class="label">Tag</label>
      <input
      bind:value={tag}
        type="text"
        name="tag"
        id="tag"
        class="input input-bordered input-primary w-full"
        placeholder="Enter activity tag for filter here. ex ใหม่, แนะนำ (Option)"
      />
      <p class="text-neutral text-md">* Tag must be a unique and split by comma (,) Ex. ใหม่, แนะนำ, สำคัญ</p>
      {#if err.tag}
        <p class="text-red-500">{err.tag}</p>
      {/if}
    </div>

    <div class="mt-6">
      <button
        bind:this={submitButton}
        type="submit"
        class="btn btn-primary w-full disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >Update</button
      >
    </div>
  </form>
{/await}

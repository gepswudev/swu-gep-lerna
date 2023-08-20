<script>
  import { get, put } from "../../../../lib/API/methods";
  import ActivityCard from "../../../activities/ActivityCard.svelte";
  import swa from "../../../../lib/popalert";
  import log from "../../../../lib/log";
  import Loading from "../../../Loading.svelte";
  import { navigate } from "svelte-routing";
  import getImg from "../../../../lib/getImg";
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
  let degreeSelect = [];
  

  let err = { title: "", desc: "", img: "", href: "", badge: "" };
  let validated = false;
  let previewData = {
    title: "Title",
    desc: "Description",
    img: "https://picsum.photos/seed/picsum/500/500",
    href: "https://www.google.com",
    badge: "Badge",
    degree: "bechelor",
    tag: "ใหม่, แนะนำ, สำคัญ",
    createAt: Date.now(),
    views: 10,
  };

  const loadPreview = () => {
    previewData = {
      ...previewData,
      title,
      desc,
      img: getImg(img),
      href,
      badge,
      tag,
      degree: degreeSelect.toString(),
    };
  };
  
  const selectCheck = (value) => {
    if(degreeSelect.includes(value)){
      return true;
    }
    return false;
  }

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const img = formData.get("img");
    const href = formData.get("href");
    const degree = degreeSelect;
    const badge = formData.get("badge");
    const tag = formData.get("tag");

    err = {
      ...err,
      title: "",
      desc: "",
      img: "",
      href: "",
      badge: "",
      tag: "",
    };
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
    const newimg = formData.get("newimg");
    const href = formData.get("href");
    const badge = formData.get("badge");
    const degree = degreeSelect.toString();
    const tag = formData.get("tag");

    const data = {
      title,
      desc,
      href,
      img: newimg,
      badge,
      degree,
      tag,
    };

    put(`activities/${id}`, data, {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((res) => {

        swa({
          icon: res.status,
          title: res.status,
          text: res.message,
        });

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

    activity = res.data;
    title = res.data.title;
    desc = res.data.desc;
    img = res.data.img;
    previewData.img = getImg(img);
    degreeSelect = res.data.degree;
    href = res.data.href;
    badge = res.data.badge;
    loadPreview();
    return res.data;
  });
</script>

{#await activity}
  <Loading title="Loading activity data" desc="Please wait..." />
  <form bind:this={form} />
{:then data}

<div class="flex flex-col md:flex-row">
  <div class="max-w-md flex-1 mx-16 my-4">
    <p class="text-center">Preview</p>
    <ActivityCard data={previewData} sx={"mx-auto border-primary "} />
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <form
    class={"form-control flex-1 " + sx}
    bind:this={form}
    on:submit|preventDefault={handlerSubmit}
    on:change={formValidate}
    on:keyup={loadPreview}
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
        >Image <span
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
      <label for="newimg" class="label justify-start"
        >Upload new image</label
      >
      <input type="file" name="newimg" id="newimg" class="file-input file-input-primary file-input-bordered w-full">
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
      <label for="badge" class="label">Degree</label>
      <label class="cursor-pointer label justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          name="degree"
          bind:group={degreeSelect}
          value="bechelor"
          checked={selectCheck("bechelor")}
        />
        <span class="label-text">Bachelor Degree</span>
      </label>
      <label class="cursor-pointer label justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:group={degreeSelect}
          value="master"
          name="degree"
          checked={selectCheck("master")}
        />
        <span class="label-text">Master Degree</span>
      </label>
      <label class="cursor-pointer label justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:group={degreeSelect}
          value="doctor"
          name="degree"
          checked={selectCheck("docter")}
        />
        <span class="label-text">Docet Degree</span>
      </label>
      {#if err.degree}
        <p class="text-red-500">{err.degree}</p>
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
      <p class="text-neutral text-md">
        * Tag must be a unique and split by comma (,) Ex. ใหม่, แนะนำ, สำคัญ
      </p>
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
</div>
{/await}

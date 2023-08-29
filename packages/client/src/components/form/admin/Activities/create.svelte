<script>
  import { navigate } from "svelte-routing";
  import ActivityCard from "../../../activities/ActivityCard.svelte";
  import { post } from "../../../../lib/API/methods";
  import swa from "../../../../lib/popalert";
  export let sx = "";
  let form;
  let degreeSelect = [];
  let submitButton;
  let err = { title: "", desc: "", img: "", href: "", badge: "" };
  let validated = false;
  const imgSize = 10000000;
  const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
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
    const formData = new FormData(form);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const img = formData.get("img");
    const href = formData.get("href");
    const badge = formData.get("badge");
    const tag = formData.get("tag");

    previewData = {
      ...previewData,
      title,
      desc,
      img: URL.createObjectURL(img),
      href,
      badge,
      tag,
      degree: degreeSelect.toString(),
    };
  };

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const img = formData.get("img");
    const href = formData.get("href");
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

    loadPreview();
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
    const degree = degreeSelect.toString();
    const data = {
      title,
      desc,
      img,
      href,
      badge,
      degree,
      tag,
    };

    //change button while creating
    submitButton.innerHTML = "Creating...";
    submitButton.disabled = true;
    //send data to server
    post("activities", data, {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((res) => {

        swa({
          icon: res.status,
          title: res.status,
          text: res.message,
        });
        //change button after creating
        submitButton.innerHTML = "Create";
        submitButton.disabled = false;
        navigate("/viewactivities");

      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<h6 class="text-2xl font-semibold text-center">Create New Activity</h6>
<div class="flex flex-col md:flex-row">
  <div class="max-w-md flex-1 mx-16 my-4">
    <p class="text-center">Preview</p>
    <ActivityCard data={previewData} sx={"mx-auto border-primary "} />
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <form
    class={"form-control flex-1" + sx}
    bind:this={form}
    on:submit|preventDefault={handlerSubmit}
    on:change={formValidate}
    on:keyup={loadPreview}
  >
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
      <label for="badge" class="label">Degree</label>
      <label class="cursor-pointer label justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:group={degreeSelect}
          value="bechelor"
        />
        <span class="label-text">Bachelor Degree</span>
      </label>
      <label class="cursor-pointer label justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:group={degreeSelect}
          value="master"
        />
        <span class="label-text">Master Degree</span>
      </label>
      <label class="cursor-pointer label justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox checkbox-primary"
          bind:group={degreeSelect}
          value="doctor"
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
        class="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:btn-loading"
        >Create</button
      >
    </div>
  </form>
</div>
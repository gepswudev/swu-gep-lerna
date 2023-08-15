<script>
  import { navigate } from "svelte-routing";
  import { post } from "../../../../lib/API/methods";
  import swa from "../../../../lib/popalert";

  export let sx;

  let form = null;
  let wellcenter = null;
  let wellcenterDate = [];
  let submitButton;
  let err = {
    name: "",
    email: "",
    img: "",
    posiotion: "",
    wellcenter: "",
  };
  const imgSize = 50000000;
  const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const formValidate = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const combindData = {
      name: data.name,
      email: data.email,
      img: data.img,
      position: data.position,
      wellcenter: {
        position: data["well-position"],
        date: wellcenterDate,
        time: data["well-time"],
      },
    };
    if (combindData.name.length < 3) {
      err.name = "Name must be at least 3 characters";
    } else {
      err.name = "";
    }
    //img validate
    if (combindData.img.length > 0 && combindData.img !== "") {
      const img = combindData.img;
      const imgSizeInMb = img.size / 1000000;
      const imgExtension = img.name.substring(img.name.lastIndexOf("."));
      if (!authorizedExtensions.includes(imgExtension)) {
        err.img = "Image must be in format : .jpg, .jpeg, .png, .webp";
      } else if (imgSizeInMb > imgSize) {
        err.img = "Image must be less than 50MB";
      } else {
        err.img = "";
      }
    } else {
      err.img = "";
    }
    //email validate
    if (combindData.email.length > 0 && combindData.email !== "") {
      if (!combindData.email.includes("@")) {
        err.email = "Email must be be in format : exmaple@email.com";
      } else {
        err.email = "";
      }
    } else {
      err.email = "";
    }
    console.log(combindData);
  };

  const handlerSubmit = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const combindData = {
      name: data.name,
      email: data.email,
      img: data.img,
      position: data.position,
      wellcenter: {
        position: data["well-position"],
        date: wellcenterDate,
        time: data["well-time"],
      },
    };
    console.log(combindData);
    //change button while creating
    submitButton.innerHTML = "Creating...";
    submitButton.disabled = true;
    //send data to server
    post("personnels", combindData, {
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
            if (res.status === "success") {
              submitButton.innerHTML = "Created";
              submitButton.disabled = false;
              navigate("/viewcorousels");
            } else {
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
  class={"form-control " + sx}
  bind:this={form}
  on:submit|preventDefault={handlerSubmit}
  on:change={formValidate}
>
  <h2 class="text-2xl font-semibold text-center">Create New Personnels Data</h2>
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
      placeholder="Enter name here (required)"
    />
    {#if err.name}
      <p class="text-red-500">{err.name}</p>
    {/if}
  </div>

  <div class="mb-4">
    <label for="img" class="label justify-start">
      Profile Picture<span class="text-red-500">*</span>
    </label>
    <input
      type="file"
      name="img"
      id="img"
      required
      accept={authorizedExtensions.join(",")}
      class="file-input file-input-bordered file-input-primary w-full"
      placeholder="Upload img here"
    />
  </div>

  <div class="mb-4">
    <label for="email" class="label justify-start">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      class="input input-bordered input-primary w-full"
      placeholder="Enter email here"
    />
    {#if err.email}
      <p class="text-red-500">{err.email}</p>
    {/if}
  </div>

  <div class="mb-4">
    <label for="position" class="label justify-start">Position</label>
    <input
      type="text"
      name="position"
      id="position"
      class="input input-bordered input-primary w-full"
      placeholder="Enter position here"
    />
    {#if err.position}
      <p class="text-red-500">{err.position}</p>
    {/if}
  </div>

  <div class="mb-4">
    <label
      class="label cursor-pointer justify-start items-center align-middle gap-2"
    >
      <input
        type="checkbox"
        class="checkbox checkbox-primary"
        bind:checked={wellcenter}
      />
      <span class="label-text">ADD WELL CENTER DATA (Optional)</span>
    </label>

    {#if wellcenter}
      <label for="well-position" class="label justify-start"
        >WELL CENTER position</label
      >
      <input
        type="text"
        name="well-position"
        id="well-position"
        class="input input-bordered input-primary w-full"
        placeholder="Enter wellcenter-position here"
      />
      <label for="well-data" class="label justify-start"
        >WELL CENTER Date ({wellcenterDate.toString()})</label
      >
      <div
        class="grid grid-cols-5 gap-2 max-w-xl justify-center items-center text-center"
      >
        <label
          class="label cursor-pointer justify-start items-center align-middle gap-2"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            value="Monday"
            bind:group={wellcenterDate}
          />
          <span class="label-text">Monday</span>
        </label>
        <label
          class="label cursor-pointer justify-start items-center align-middle gap-2"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            value="Tuesday"
            bind:group={wellcenterDate}
          />
          <span class="label-text">Tuesday</span>
        </label>
        <label
          class="label cursor-pointer justify-start items-center align-middle gap-2"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            value="Wednesday"
            bind:group={wellcenterDate}
          />
          <span class="label-text">Wednesday</span>
        </label>
        <label
          class="label cursor-pointer justify-start items-center align-middle gap-2"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            value="Thursday"
            bind:group={wellcenterDate}
          />
          <span class="label-text">Thursday</span>
        </label>
        <label
          class="label cursor-pointer justify-start items-center align-middle gap-2"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            value="Friday"
            bind:group={wellcenterDate}
          />
          <span class="label-text">Friday</span>
        </label>
      </div>
      <label for="well-time" class="label justify-start">WELL CENTER Time</label
      >
      <label for="well-time" class="label justify-start text-primary"
        >!! Please keep in format : 10.00-13.00,14.00-16.00 !!<span
          class="text-red-500">*</span
        ></label
      >
      <input
        type="text"
        name="well-time"
        id="well-time"
        class="input input-bordered input-primary w-full"
        placeholder="Enter wellcenter-time here <Please keep in format : 10.00-13.00,14.00-16.00>"
      />
    {/if}

    {#if err.wellcenter}
      <p class="text-red-500">{err.wellcenter}</p>
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

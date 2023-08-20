<script>
  import { navigate } from "svelte-routing";
  import { get, post, put } from "../../../../lib/API/methods";
  import PersonnelsCard from "../../../admin/PersonnelsCard.svelte";
  import swa from "../../../../lib/popalert";
  import Loading from "../../../Loading.svelte";
  import getImg from "../../../../lib/getImg";

  export let sx;
  export let id;

  let form = null;
  let name = "";
  let email = "";
  let phone = "";
  let img = "";
  let position = "";
  let wellcenterPosition = "";
  let wellcenterTime = "";
  let wellcenter = false;
  let wellcenterDate = [];
  let submitButton;
  let err = {
    name: "",
    email: "",
    phone: "",
    img: "",
    posiotion: "",
    wellcenter: "",
  };
  const imgSize = 50000000;
  const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  let previewData = {
    name: "Personnels Preview",
    img: "https://via.placeholder.com/1440x650",
    phone: "",
    email: "",
    position: "Position",
    wellcenter: {
      status: false,
      position: "Wellcenter Position",
      availableTime: "Wellcenter Time",
      availableDate: [],
    },
  };
  const loadPreview = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const combindData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      wellcenter: {
        position: data["well-position"],
        date: wellcenterDate,
        time: data["well-time"],
      },
    };

    previewData = {
      ...previewData,
      name: combindData.name,
      position: combindData.position,
      phone: combindData.phone,
      email: combindData.email,
      wellcenter: {
        status: wellcenter,
        position: combindData.wellcenter.position,
        availableTime: combindData.wellcenter.time,
        availableDate: combindData.wellcenter.date,
      },
    };

  };

  const formValidate = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const combindData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
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
    loadPreview();
  };

  const handlerSubmit = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const combindData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      img: data.newimg,
      position: data.position,
      wellcenterStatus: wellcenter,
      wellcenterPosition: data["well-position"],
      wellcenterDate: wellcenterDate.toString(),
      wellcenterTime: data["well-time"],

    };

    //change button while creating
    submitButton.innerHTML = "Updating...";
    submitButton.disabled = true;
    //send data to server
    put(`personnels/${id}`, combindData, {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    })
      .then((res) => {

        swa(
          {
            icon: res.status,
            title: res.status,
            text: res.message,
          },
          () => {
            //change button after creating
            if (res.status === "success") {
              submitButton.innerHTML = "Updated";
              submitButton.disabled = false;
              navigate("/personnels");
            } else {
              submitButton.innerHTML = "Update";
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

  const selfCheck = (value) => {
    //if data is null or undefined
    if (
      !wellcenterDate ||
      wellcenterDate === null ||
      wellcenterDate === undefined
    )
      return false;
    //if data includes value return true
    if (wellcenterDate.includes(value)) return true;

    return false;
  };

  let personnels = get(`personnels/${id}`, {
    Authorization: "Bearer " + localStorage.getItem("token"),
  }).then((res) => {

    name = res.data.name;
    email = res.data.email;
    phone = res.data.phone;
    img = res.data.img;
    position = res.data.position;
    wellcenterPosition = res.data.wellcenter.position;
    wellcenterTime = res.data.wellcenter.availableTime;
    wellcenter = res.data.wellcenter.status;
    wellcenterDate = res.data.wellcenter.availableDate;
    personnels = res.data;
    previewData = {
      ...previewData,
      name,
      img: getImg(img),
      position,
      wellcenter: {
        status: wellcenter,
        position: wellcenterPosition,
        time: wellcenterTime,
        date: wellcenterDate,
      },
    };
    return res.data;
  });
</script>

{#await personnels}
  <Loading title="Loading personnels data" desc="Please wait..." />
  <form bind:this={form} />
{:then personnel}
  <div class="flex flex-col md:flex-row">
    <div class="max-w-md flex-1 mx-16 my-4 gap-4">
      <p class="text-center">Preview</p>
      <PersonnelsCard data={previewData} />
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
        Update Personnels Data : {personnel.name}
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
          placeholder="Enter name here (required)"
          bind:value={name}
        />
        {#if err.name}
          <p class="text-red-500">{err.name}</p>
        {/if}
      </div>

      <div class="mb-4">
        <label for="img" class="label justify-start">
          Profile Picture<span
            class="text-red-500">*</span
          >
        </label>
        <input
          type="text"
          name="imgReadOnly"
          id="imgReadOnly"
          readonly
          class="input input-bordered input-primary w-full"
          placeholder="Image path preview "
          bind:value={img}
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
        <label for="name" class="label justify-start">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          class="input input-bordered input-primary w-full"
          placeholder="Enter phone here"
          bind:value={phone}
        />
        {#if err.phone}
          <p class="text-red-500">{err.phone}</p>
        {/if}
      </div>

      <div class="mb-4">
        <label for="email" class="label justify-start">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="input input-bordered input-primary w-full"
          placeholder="Enter email here"
          bind:value={email}
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
          bind:value={position}
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
            bind:value={wellcenterPosition}
          />
          <label for="well-data" class="label justify-start"
            >WELL CENTER Date</label
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
                checked={selfCheck("Monday")}
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
                checked={selfCheck("Tuesday")}
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
                checked={selfCheck("Wednesday")}
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
                checked={selfCheck("Thursday")}
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
                checked={selfCheck("Friday")}
              />
              <span class="label-text">Friday</span>
            </label>
          </div>
          <label for="well-time" class="label justify-start"
            >WELL CENTER Time</label
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
            bind:value={wellcenterTime}
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
          >Update</button
        >
      </div>
    </form>
  </div>
{/await}

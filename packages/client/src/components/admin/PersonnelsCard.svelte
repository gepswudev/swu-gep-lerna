<script>
  import Swal from "sweetalert2";
  import { navigate } from "svelte-routing";
  import { del } from "../../lib/API/methods";
  import getImg from "../../lib/getImg";
  import { IconCalendar, IconClock, IconMail, IconPhone, IconUser } from "@tabler/icons-svelte";

  export let data;
  export let index;
  export let admin = false;

  const editHandler = () => {
    navigate(`/admin/personnels/update/${data._id}`);
  };

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${data.name} data?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        del(`personnels/${data._id}`)
          .then((res) => {

            if (res.status === "success") {
              Swal.fire({
                title: "Deleted!",
                text: `${data.name} has been deleted.`,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: res.message,
                icon: res.status,
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
          });
      }
    });
  };
</script>

<div class="card bg-base-100 shadow-xl mx-auto text-sm" id={index + data._id}>
  <figure>
    <img
      src={getImg(data.img)}
      alt={data.name + "_ProfilePic"}
      class="w-[30rem] h-auto object-cover"
    />
  </figure>
  <div class="card-body text-sm">
    <div class="flex flex-col text-start justify-start">
      <div class="flex flex-col">
        <h2 class="card-title">{data.name}</h2>
        {#if data.engName}
        <h2 class="card-title">{data.engName}</h2>
        {/if}
        {#if data.position}
          <p class="label text-start justify-start"><span><IconUser/></span>  {data.position}</p>
        {/if}
        {#if data.email}
          <p class="label text-start justify-start"><span><IconMail/></span>  {data?.email}</p>
        {/if}
        {#if data.phone}
          <p class="label text-start justify-start"><span><IconPhone/></span>  {data?.phone}</p>
        {/if}
      </div>
      {#if data.wellcenter?.status == "true"}
        <div class="break-words border-2 rounded-lg px-4 py-2 my-4">
          <h2 class="card-title text-lg">Well Center</h2>
          {#if data.wellcenter?.position}
            <p class="label text-start justify-start"><span><IconUser/></span> {data.wellcenter?.position}</p>
          {/if}
          {#if data.wellcenter?.availableDate}
            <p class="label text-start justify-start break-words"><span><IconCalendar/></span>  {data.wellcenter?.availableDate.toString()}</p>
          {/if}
          {#if data.wellcenter?.availableTime}
            <p class="label text-start justify-start"><span><IconClock/></span>  {data.wellcenter?.availableTime}</p>
          {/if}
        </div>
      {/if}
    </div>
    {#if admin}
    <div class="card-actions justify-end">
      <button class="btn btn-primary" on:click={editHandler}>Edit</button>
      <button class="btn btn-error" on:click={deleteHandler}>Delete</button>
    </div>
    {/if}
  </div>
</div>

<!-- <div class="card card-side bg-base-100 shadow-xl max-w-xl mx-auto" id={index+data._id}>
  <figure><img src={getImg(data.img)} alt={data.name+"_ProfilePic"} class="h-64 w-48 object-cover"/></figure>
  <div class="card-body text-start">
    <h2 class="card-title">{data.name}</h2>
    {#if data.position}
    <p>Position: {data.position}</p>
    {/if}
    {#if data.email}
    <p>Email: {data?.email}</p>
    {/if}
    {#if data.phone}
    <p>Phone: {data?.phone}</p>
    {/if}
    {#if data.wellcenter.status}
      <div class="w-full border border-base-300 p-4 my-2">
        <div class="text-xl font-medium">Well Center</div>
        <div class="">
          {#if data.wellcenter?.position}
          <p>Position: {data.wellcenter?.position}</p>
          {/if}
          {#if data.wellcenter?.availableDate}
          <p>Date: {data.wellcenter?.availableDate.toString()}</p>
          {/if}
          {#if data.wellcenter?.availableTime}
          <p>Time: {data.wellcenter?.availableTime}</p>
          {/if}
        </div>
      </div>
    {/if}
    {#if admin}
      <div class="card-actions justify-end">
        <button class="btn btn-primary" on:click={editHandler}>Edit</button>
        <button class="btn btn-error" on:click={deleteHandler}>Delete</button>
      </div>
    {/if}
  </div>
</div> -->

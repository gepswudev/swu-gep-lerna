<script>
  import Swal from "sweetalert2";
  import { navigate } from "svelte-routing";
  import { del } from "../../lib/API/methods";
  import getImg from "../../lib/getImg";

  export let data;
  export let index;
  export let admin = false;

  const editHandler = () => {
    navigate(`/admin/personnels/update/${data._id}`);
  }

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
            console.log(res);
            if(res.status === "success"){
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
            }else{
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
  }
</script>

<div class="card card-side bg-base-100 shadow-xl" id={index+data._id}>
  <figure><img src={getImg(data.img ? "" : "https://fakeimg.pl/270x270")} alt={data.name+"_ProfilePic"} /></figure>
  <div class="card-body">
    <h2 class="card-title">{data.name}</h2>
    <p>Position: {data.position}</p>
    {#if data.email}
    <p>Email: {data?.email}</p>
    {/if}
    {#if data.phone}
    <p>Phone: {data?.phone}</p>
    {/if}
    {#if data.wellcenter.status}
      <div class="collapse join-item collapse-arrow border border-base-300">
        <input type="radio" name={`my-accordion-1`} checked="checked" />
        <div class="collapse-title text-xl font-medium">Well Center</div>
        <div class="collapse-content">
          {#if data.wellcenter?.position}
          <p>Position: {data.wellcenter?.position}</p>
          {/if}
          {#if data.wellcenter?.Date}
          <p>Date: {data.wellcenter?.availableDate}</p>
          {/if}
          {#if data.wellcenter?.Time}
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
</div>

<!-- Card -->
<script>
  import { IconPencilMinus, IconTrash } from "@tabler/icons-svelte";
  import { navigate } from "svelte-routing";
  import { del } from "../../lib/API/methods";
  import Swal from "sweetalert2";
  import getImg from "../../lib/getImg";
  export let data;
  export let id = "";

  const editHandler = () => {
    navigate(`/admin/activities/update/${id}`, { replace: true });
  };

  const deleteHandler = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${data.title}?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          del(`activities/${id}`)
            .then((res) => {
              if (res.status === "success") {
                Swal.fire({
                  title: "Deleted!",
                  text: res.message,
                  icon: "success",
                  confirmButtonText: "OK",
                  confirmButtonColor: "#00A2E0",
                }).then((result) => {
                  location.reload();
                });
              } else {
                Swal.fire({
                  title: res.status,
                  text: res.message + " as Admin",
                  icon: res.status,
                  confirmButtonText: "OK",
                  cancelButtonColor: "#00A2E0",
                }).then(() => {
                  location.reload();
                });
              }
            })
            .catch((e) => {
              Swal.fire({
                title: "Error!",
                text: e.message,
                icon: "error",
                confirmButtonText: "OK",
                cancelButtonColor: "#00A2E0",
              }).then(() => {
                location.reload();
              });
            });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // $: log("HorizonCard", `Card loaded : ${data.title}`);
</script>

<!-- Card -->
<div
  id={data.title}
  class="card w-[20rem] bg-base-100 border-none shadow-xl hover:shadow-2xl border hover:border-primary duration-500 transition-transform transform hover:scale-110"
>
  <figure>
    <img class="h-52" src={getImg(data.img)} alt={data.title + "_IMG"} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      {data.title ?? ""}
      {#if data.badge}
        <div class="badge badge-primary">{data.badge}</div>
      {/if}
    </h2>
    <p>{(data.desc ?? "").substring(0, 80) + " ..."}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" on:click={editHandler}
        ><IconPencilMinus /> Edit</button
      >
      <button class="btn btn-error" on:click={deleteHandler}
        ><IconTrash /> Delete</button
      >
    </div>
  </div>
</div>
<!-- Card -->

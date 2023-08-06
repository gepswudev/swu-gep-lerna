<!-- Card -->
<script>
  import { IconPencilMinus, IconTrash } from "@tabler/icons-svelte";
  import { navigate } from "svelte-routing";
  import { del } from "../../lib/API/methods";
  import Swal from "sweetalert2";
  export let data;
  export let id = '';


  const editHandler = () => {
    navigate(`/admin/activities/${id}`);
  }

  const deleteHandler = () => {
    try {
      del(`activities/${id}`)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: res.message + " as Admin",
            icon: res.status,
            confirmButtonText: "OK",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Error!",
          text: e.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  // $: log("HorizonCard", `Card loaded : ${data.title}`);
</script>

<!-- Card -->
<div
  id={data.title}
  class="card w-[20rem] mx-auto bg-base-100 border-none shadow-xl hover:shadow-2xl border hover:border-primary duration-500 transition-transform transform hover:scale-110"
>
  <figure><img class="h-52" src={data.img} alt={data.title + "_IMG"} /></figure>
  <div class="card-body">
    <h2 class="card-title">
      {data.title ?? ""}
      {#if data.badge}
        <div class="badge badge-primary">{data.badge}</div>
      {/if}
    </h2>
    <p>{(data.desc ?? "").substring(0, 80) + " ..."}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" on:click={editHandler}><IconPencilMinus /> Edit</button>
      <button class="btn btn-error" on:click={deleteHandler}><IconTrash /> Delete</button>
    </div>
  </div>
</div>
<!-- Card -->

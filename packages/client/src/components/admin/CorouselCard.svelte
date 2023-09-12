<script>
  import { IconEdit, IconTrash } from "@tabler/icons-svelte";
  import { navigate } from "svelte-routing";
  import { del } from "../../lib/API/methods";
  import Swal from "sweetalert2";
  import getImg from "../../lib/getImg";
  import { link } from "svelte-routing";

  export let data;

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        del(`corousels/${data._id}`)
          .then((res) => {
            if (res.status === "success") {
              Swal.fire({
                title: "Deleted!",
                text: res.message,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#00A2E0",
              }).then(() => {
                location.reload();
              });
            } else {
              Swal.fire({
                title: res.status,
                text: res.message + " as Admin",
                icon: res.status,
                confirmButtonText: "OK",
                confirmButtonColor: "#00A2E0",
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your file is safe :)",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
</script>

<!-- Card -->
<div
  class="flex flex-col w-96 md:w-[30rem] justify-center text-start p-4 border-2 border-base-300"
>
  <img src={getImg(data.img)} alt={`${data.name}_Banner`} />
  <p class="font-bold text-2xl my-4">
    Name : <span class="text-xl"> {data.name}</span>
  </p>
  <p class="text-md">
    URL : <a use:link replace href={data.url} class="text-md underline">{data.url}</a>
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-center">
    <button
      class="btn btn-primary"
      on:click={navigate(`/admin/corousels/update/${data._id}`, { replace: true })}
      ><IconEdit /> Edit</button
    >
    <button class="btn btn-error" on:click={deleteHandler}
      ><IconTrash /> Delete</button
    >
  </div>
</div>
<!-- Card -->

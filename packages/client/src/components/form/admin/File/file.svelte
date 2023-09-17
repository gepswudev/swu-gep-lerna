<script>
    import { copy } from 'svelte-copy';
    import Swal from 'sweetalert2';
    import swa from '../../../../lib/popalert';
    import { del } from '../../../../lib/API/methods';
    import Config from '../../../../config.json';
  import { IconDownload, IconShare } from '@tabler/icons-svelte';
    
    export let data;
    export let index;

    const getURL = () => {
      if(window.location.hostname === "localhost"){
        return `http://localhost:${Config.local}/files/${data.name}`;
      }
      return `${Config.deploy}files/${data.name}`;
    };

    const handlerCopy = (e) => {
      swa({
        icon: "success",
        title: "Copied",
        text: `${data.name} URL copied to clipboard, You can share this link to download this file`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
      });
    };

    const downloadFile = (e) => {
      const url = getURL();
      window.open(url, "_blank");
    };

    const deleteFile = (e) => {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${data.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          del(`filesys/${data.name}`)
            .then((res) => {
              if (res.status === "success") {
                Swal.fire({
                  title: "Deleted!",
                  text: res.message,
                  icon: "success",
                  confirmButtonText: "OK",
                  cancelButtonColor: "#00A2E0",
                }).then(() => {
                  location.reload();
                });
              } else {
                Swal.fire({
                  title: res.status,
                  text: res.message,
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
    };
</script>

   
{#if data.isDir === false}
    <tr class="bg-base-200">
      <th>{index+1}</th>
      <td>{data.name}</td>
      <td>{data.ext === "" ? "No extention" : data.ext.replace(".","").toUpperCase()}</td>
      <td>{new Date(data.created).toLocaleString()}</td>
      <td class="px-0 p-0">
        <button class="btn btn-success" on:click={downloadFile}>Download <IconDownload/></button>
        <button class="btn btn-primary" use:copy={getURL()} on:svelte-copy={handlerCopy}> Share <IconShare /></button>
      </td>
      <td><button class="btn btn-error" on:click={deleteFile}>Delete</button></td>
    </tr>
{/if}
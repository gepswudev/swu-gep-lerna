<script>
  import AdminProtect from "../../components/admin/adminProtect.svelte";
  import Loading from "../../components/Loading.svelte";
  import {marked } from 'marked';
  import { get, getPublic, put } from '../../lib/API/methods';
  import { IconSwitchHorizontal } from "@tabler/icons-svelte";
  import Swal from "sweetalert2";
  
  let value = `# Hello World`;
  let switcher = true;
  let person = {}
  export let path = "";

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "profile.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href);
  };

  const edit = () => {
    console.log("edited")
    Swal.fire({
      title: "Are you sure?",
      text: `Save ${person?.name} data?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Saving...",
          text: `Saving ${person?.name} data.`,
          icon: "info",
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        })
        put(`md/edit/${path}`, {md:value}).then(res => {
          if (res.status === "success") {
            Swal.fire({
              title: "Saved!",
              text: `${person?.name} has been saved.`,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(`personnel/${path}`, { replace: true });
              }
            });
          } else {
            console.log("canceled")
            // cancel
            Swal.fire({
              title: "Canceled!",
              text: `${person?.name} has not been saved.`,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        })
      } else {
        console.log("canceled")
        // cancel
        Swal.fire({
          title: "Canceled!",
          text: `${person?.name} has not been saved.`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    })
  }

  const switchSide = () => {
    switcher = !switcher;
    console.log(switcher)
  }

  async function loadAndProcessData() {
  try {
    const res = await fetch(getPublic(`md/${path}.md`));
    const text = await res.text();
    const personData = await get(`personnels/${path}`);
    person = personData.data;
    value = text;
  } catch (error) {
    console.error(error);
  }
}
  const data = loadAndProcessData();
  
</script>

<AdminProtect>
{#await  data }
<Loading />
{:then text }
{#if person.name}
<p class="text-center text-3xl font-bold">ประวัติ {person.name}</p>
{/if}
<button class="flex w-full justify-end" on:click={switchSide} >
  <button class="btn-primary p-2 rounded-lg mx-12" >
    <IconSwitchHorizontal class="w-6 h-6" />
    </button>
</button>
  
  {#if value !== "" || value !== null || typeof value !== "undefined" || typeof value !== "object"}
  
  <div class={switcher ? "pt-12 flex flex-row-reverse gap-4 mx-2 min-h-screen" :"pt-12 flex flex-row gap-4 mx-2 min-h-screen"}>
    <div>
      <textarea class="w-[45vw] h-full bg-transparent border-2 flex-auto" bind:value={value}></textarea>
    </div>
    <div class="prose max-w-none w-[45vw] flex-auto">
      {@html marked(value)}
    </div>
  </div>
  {/if}
  <button class="btn btn-success w-full m-4 " on:click={edit}>Edit</button>
  <button class="btn btn-primary w-full m-4 " on:click={download}>Download</button>
{/await}
</AdminProtect>

<svelte:head>
  <title>ปรับแต่งประวัติบุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
  <meta
    property="og:title"
    content="ปรับแต่งประวัติบุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
  />
  <meta
    property="og:description"
    content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
  />
  <meta property="og:url" content={window.location} />
</svelte:head>

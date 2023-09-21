<script>
  import PersonnelsCard from "../../../components/admin/PersonnelsCard.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";
  import { get } from "../../../lib/API/methods";
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import Loading from "../../../components/Loading.svelte";

  let filtered = "";

  const personels = get("personnels");
</script>

<AdminProtect>
  {#await personels}
    <Loading />
  {:then personelsData}
    <div class="mx-auto p-12 justify-center text-center">
      <h1 class="text-4xl font-semibold text-gray-900">Personnel ({personelsData.data.length} people)</h1>
      <p class="mt-1 text-sm text-gray-600">List of all personnel</p>
      <div
        class="mt-12 px-24 py-12 flex flex-col md:flex-row w-full justify-center md:justify-start gap-4"
      >
      <input type="text" bind:value={filtered} class="input input-bordered focus:input-primary w-full grow" placeholder="Search ">
        <button
          class="btn btn-success w-full max-w-[12rem] text-xl flex-none"
          on:click={() => navigate("/admin/personnels/create", { replace: true })}
          ><IconPlus /> New</button
        >
      </div>

      <div class="grid grid-cols-1  xl:grid-cols-3 text-start gap-4">
        {#each personelsData.data as data, index}
          {#if filtered === "" || data.name.toLowerCase().includes(filtered.toLowerCase()) || data.engName.toLowerCase().includes(filtered.toLowerCase())}
            <PersonnelsCard {data} admin={true} {index} />

          {/if}

        {/each}
      </div>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</AdminProtect>

<svelte:head>
  <title>บุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
  <meta
    property="og:title"
    content="บุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
  />
  <meta
    property="og:description"
    content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
  />
  <meta property="og:url" content={window.location} />
</svelte:head>
<script>
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import { user } from "../../../store/user";
  import { get } from "../../../lib/API/methods";
  import Card from "../../../components/admin/CorouselCard.svelte";
  import Skeleton from "../../../components/skeletons/CorouselAdmin_Skeleton.svelte";
  import Corousel from "../../../components/Corousel.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";

  let filtered = "";
  let corousels = get("corousels");
</script>

<AdminProtect>
  <h2 class="font-bold text-3xl text-center mt-12">
    Banner Corousels Management {#await corousels} (Loding...)
    {:then data}
      ({data.data.length} {data.data.length > 1 ? "Banners" : "Banner"})
    {/await}
  </h2>
  <div
    class="mt-12 px-36 flex flex-col md:flex-row w-full justify-center md:justify-start gap-4"
  >
  <input type="text" bind:value={filtered} class="input input-bordered focus:input-primary w-full grow" placeholder="Search ">
    <button
      class="btn btn-success w-full max-w-[12rem] text-xl flex-none"
      on:click={() => navigate("/admin/corousels/create")}
      ><IconPlus /> New</button
    >
  </div>

  <div
    class="mx-16 justify-center items-center align-baseline my-24 mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
  >
    {#await corousels}
      <Skeleton load={2} />
    {:then data}
      {#each data.data as corousel}
      {#if filtered === "" || corousel.name.toLowerCase().includes(filtered.toLowerCase())}
        {@const id = corousel._id}
        <Card data={corousel} {id} />
      {/if}
      {/each}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
  <h2 class="font-bold text-3xl text-center mt-12">Preview</h2>
  <div class="mt-12">
    {#await corousels}
      <div />
    {:then data}
      <Corousel data={data.data} />
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
</AdminProtect>

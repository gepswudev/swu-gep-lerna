<script>
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import { user } from "../../../store/user";
  import { get } from "../../../lib/API/methods";
  import Card from "../../../components/form/admin/Corousels/card.svelte";
  import Skeleton from "../../../components/skeletons/CorouselAdmin_Skeleton.svelte";
  import Corousel from "../../../components/Corousel.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";

  let corousels = get("corousels");
</script>

<AdminProtect>
  <h2 class="font-bold text-3xl text-center mt-12">
    Banner Corousels Management
  </h2>
  <div
    class="mt-12 px-36 flex flex-row-reverse w-full justify-center md:justify-start"
  >
    <button
      class="btn btn-success w-full xl:max-w-[12rem] text-xl"
      on:click={() => navigate("/admin/corousels/create")}
      ><IconPlus /> New</button
    >
  </div>

  <div
    class="mx-16 justify-center items-center align-baseline my-24 mt-8 grid grid-cols-2 lg:grid-cols-3 gap-12"
  >
    {#await corousels}
      <Skeleton load={2} />
    {:then data}
      {#each data.data as corousel}
        {@const id = corousel._id}
        <Card data={corousel} {id} />
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

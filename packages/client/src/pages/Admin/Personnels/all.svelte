<script>
  import PersonnelsCard from "../../../components/PersonnelsCard.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";
  import { get } from "../../../lib/API/methods";
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";

  const personels = get("personnels");
</script>

<AdminProtect>
  {#await personels}
    <div />
  {:then personelsData}
    <div class="mx-auto p-12 justify-center text-center">
      <h1 class="text-4xl font-semibold text-gray-900">Personnels</h1>
      <p class="mt-1 text-sm text-gray-600">List of all personnels</p>
      <div
        class="m-12 px-36 flex flex-row-reverse w-full justify-center md:justify-start"
      >
        <button
          class="btn btn-success w-full xl:max-w-[12rem] text-xl"
          on:click={() => navigate("/admin/personnels/create")}
          ><IconPlus /> New</button
        >
      </div>
      <div class="grid grid-cols-3 text-start gap-4">
        {#each personelsData.data as data, index}
          <PersonnelsCard {data} admin={true} {index} />
        {/each}
      </div>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</AdminProtect>

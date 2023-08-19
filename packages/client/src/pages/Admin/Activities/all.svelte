<script>
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import Card from "../../../components/admin/HorizonCard.svelte";
  import Skeleton from "../../../components/skeletons/HorizonCard_Skeleton.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";
  import { get } from "../../../lib/API/methods";
  import Loading from "../../../components/Loading.svelte";
  
  let activities = get("activities");
</script>

<AdminProtect>
  <div
        class="mt-12 px-24 flex flex-row-reverse w-full justify-center md:justify-start"
      >
        <button
          class="btn btn-primary w-full xl:max-w-[12rem] text-xl"
          on:click={() => navigate("/admin/activities/create")}
          ><IconPlus /> New</button
        >
      </div>

      <div
        class="mx-16 justify-center items-start my-24 mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        {#await activities}
          <Skeleton load={4} />
        {:then data}
          {#each data.data as activity}
            {@const id = activity._id}
            <Card data={activity} {id} />
          {/each}
        {:catch error}
          <p>{error.message}</p>
        {/await}
      </div>
</AdminProtect>

{#await activities}
  <Loading />
{:then data} 
{#each data.data as activity}
            {@const id = activity._id}
            <Card data={activity} {id} />
          {/each}
{/await}
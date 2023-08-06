<script>
  import Card from "../../../components/admin/HorizonCard.svelte";
  import Skeleton from "../../../components/skeletons/HorizonCard_Skeleton.svelte";
  import { get } from "../../../lib/API/methods";
  onMount(async () => {
      isAdmin = await adminAuth();
      if (!isAdmin) navigate("/user");
    });
    
  let activities = get("activities");
  $:console.log(activities);
</script>

<div class="mx-auto my-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#await activities}
    <Skeleton load={4} />
  {:then data}
    {#each data.data as activity}
      {@const id = activity._id}
      <Card data={activity}  {id}/>
    {/each}
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

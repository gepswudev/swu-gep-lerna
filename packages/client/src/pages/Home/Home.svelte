<!-- Hero Homepage -->
<script>
  import medata from "../metadata.json";
  import Corousel from "../../components/Corousel.svelte";
  import HorizonCard from "../../components/HorizonCard.svelte";
  import HorizonCardSkeleton from "../../components/skeletons/HorizonCard_Skeleton.svelte";
  import { get } from "../../lib/API/methods";



  let activityData = get("activities");
  let corouselData = get("corousels");
</script>

<svelte:head>
  <title>{medata.base.title}</title>
  <meta property="og:title" content={medata.base.title} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={window.location} />
</svelte:head>

<!-- Hero -->
<div class="min-h-screen bg-base-200">
  {#await corouselData}
    <div></div>
  {:then data} 
  <Corousel data={data.data}/>
  {/await}
  
  <div class="hero text-center py-8 z-30">
    <div class="max-w-md">
      <h2 class="text-5xl font-bold">Hello there</h2>
      <p class="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
      </p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>

  <div class="hero bg-center items-center align-middle text-center py-8">
    <div class="container mx-auto">
      <h2 class="text-5xl font-bold">ประมวลภาพกิจกรรรม</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16"
      >
        {#await activityData}
          <HorizonCardSkeleton load={4} />
        {:then activitise}
          {#if activitise.data.length == 0}
            <div class="text-center text-2xl text-gray-500">ไม่มีกิจกรรม</div>
          {:else}
            {#each activitise.data as activity}
              <HorizonCard data={activity} />
            {/each}
          {/if}
        {:catch error}
        <div class="text-center text-2xl text-gray-500">{error.message}</div>
        {/await}
      </div>
    </div>
  </div>
</div>
<!-- Hero Homepage -->

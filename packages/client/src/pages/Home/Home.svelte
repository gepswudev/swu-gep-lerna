<!-- Hero Homepage -->
<script>
  
  import Corousel from "../../components/Corousel.svelte";
  import HorizonCard from "../../components/HorizonCard.svelte";
  // @ts-ignore
  import activities from "../../data/Activities.json"

  export let lang;
  let data;
  


</script>

<svelte:head>
    <title>Home</title>
    <meta property="og:title" content="SWU" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="" />
    <meta property="og:image" content="" />
</svelte:head>

<!-- Hero -->
<div class="min-h-screen bg-base-200">
  <Corousel/>
  <div class="hero text-center py-8 z-30">
    <div class="max-w-md">
      <h2 class="text-5xl font-bold">Hello there</h2>
      <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>

  <div class="hero bg-center items-center align-middle text-center py-8">
    <div class="container mx-auto">
      <h2 class="text-5xl font-bold">ประมวลภาพกิจกรรรม</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16 ">
        {#each activities as activity (activity.title)}
        <HorizonCard data={activity}/>
        {/each}
      </div>

    </div>
  </div>

</div>
<!-- Hero Homepage -->
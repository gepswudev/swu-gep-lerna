<!-- Hero Homepage -->
<script>
  import Corousel from "../../components/Corousel.svelte";
  import HorizonCard from "../../components/HorizonCard.svelte";
  import HorizonCardSkeleton from "../../components/skeletons/HorizonCard_Skeleton.svelte";
  import { get } from "../../lib/API/method";

  let activityData = get("activities").data;
  let corouselData = get("corousels").data;
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
</div>
<!-- Hero Homepage -->

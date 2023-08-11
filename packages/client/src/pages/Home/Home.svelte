<script>
  import medata from "../metadata.json";
  import Corousel from "../../components/Corousel.svelte";
  import HorizonCard from "../../components/activities/ActivityLayout.svelte";
  import HorizonCardSkeleton from "../../components/skeletons/HorizonCard_Skeleton.svelte";
  import Youtube from "svelte-youtube-embed";
  import { get } from "../../lib/API/methods";

  let corouselData = get("corousels");
</script>

<!-- Homepage -->
<svelte:head>
  <title>{medata.base.title}</title>
  <meta property="og:title" content={medata.base.title} />
  <meta property="og:description" content={medata.base.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={window.location} />
</svelte:head>
<!-- Hero -->
<div class="min-h-screen bg-base-100">
  {#await corouselData}
    <div />
  {:then data}
    <Corousel data={data.data} />
  {/await}

  

  <div class="hero bg-center items-center align-middle text-center py-8">
    <div class="container mx-auto">
      <!-- YouTube -->
  <div class="mx-48 flex flex-col w-[80rem] text-neutral">
    <div class="w-full border-b-2 border-black py-4">
      <p class="text-3xl font-semibold text-start">แนะนำหลักสูตร</p>
      <div
        class="mt-1 flex flex-row items-center justify-between align-baseline"
      >
        <p class="grow text-start">
          ภาควิชาการแนะแนวและจิตวิทยาการศึกษาคณะศึกษาศาสตร์
        </p>
        <p class="flex-1 text-end">ก่อตั้งปี 2497</p>
      </div>
    </div>
    <div class="p-8 flex flex-row border-b-2 text-start">
      <div class="w-[55rem]  grow"><Youtube id="jK89KESDWzU" altThumb={true} animations={false} /></div>
      <div class=" w-[13rem] m-6 my-0 flex-none">
        <h3 class="font-semibold">หลักสูตร</h3>
        <div class="mt-4 hover:underline hover:text-primary">
          <p>ระดับปริญญาตรี</p>
          <p>การศึกษาบัณฑิต (กศ.บ)</p>
        </div>

        <div class="mt-4 hover:underline hover:text-primary">
          <p>ระดับปริญญาโท</p>
          <p>การศึกษามหาบัณฑิต (กศ.ม.)</p>
        </div>

        <div class="mt-4 hover:underline hover:text-primary">
          <p>ระดับปริญญาเอก</p>
          <p>การศึกษาดุษฎีบัณฑิต (กศ.ด.)</p>
        </div>
      </div>
    </div>
  </div>
  <!-- YouTube -->

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16"
      >
        <HorizonCard />
      </div>
    </div>
  </div>
</div>
<!-- Hero Homepage -->

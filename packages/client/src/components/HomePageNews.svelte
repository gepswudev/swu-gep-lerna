<script>
  import { link } from "svelte-routing";
  import { get } from "../lib/API/methods";
  import getImg from "../lib/getImg";
  import lang from "../lib/lang";
  import Loading from "./Loading.svelte";
  let activityData = get("activities");
</script>

{#await activityData}
<Loading />
{:then activity}

{#if lang() === "th"}
{@const data = activity.data.reverse()}
<section id="news" class="w-full mx-auto">

  <div
    class="flex flex-col md:flex-row gap-4 justify-center items-start p-12"
  >
    <div class="flex-initial flex justify-center  hover:shadow-2xl hover:scale-105 duration-1000">
      <div class="card w-96 glass">
        <figure>
          <img src={getImg(data[0].img)} class="h-[20rem] w-full object-cover bg-white" alt={`${data[0].title} image`}/>
        </figure>
        <div class="card-body">
          <h2 class="card-title">{data[0].title.substr(0,60)}</h2>
          <p title={data[3].desc}>{data[3].desc.substr(0,130) + "..."}</p>
        </div>
      </div>
    </div>

    <div
      class="flex-initial flex flex-col gap-2 items-center justify-center  text-start"
    >
      <div class="flex flex-row w-full rounded-xl max-w-3xl max-h-[10rem] border-2 border-base-200 shadow-lg bg-base-100  hover:shadow-2xl hover:scale-105 duration-1000">
        <img class="w-48 object-cover rounded-l-xl" src={getImg(data[1].img)} alt={data[1].title + " image"}>
        <div class="p-4">
            <h3 class="font-bold text-sm md:text-xl py-2">{data[1].title.substr(0,60)}</h3>
            <p class="hidden md:flex" title={data[1].desc}>{data[1].desc.substr(0,180)+ `${data[1].desc.length > 180 ? "..." : ""}`}</p>
        </div>
      </div>

      <div class="flex flex-row w-full rounded-xl max-w-3xl max-h-[10rem] border-2 border-base-200 shadow-lg bg-base-100  hover:shadow-2xl hover:scale-105 duration-1000">
        <img class="w-48 object-cover rounded-l-xl" src={getImg(data[2].img)} alt={data[2].title + " image"}>
        <div class="p-4">
            <h3 class="font-bold text-sm md:text-xl py-2">{data[2].title.substr(0,60)}</h3>
            <p class="hidden md:flex" title={data[2].desc}>{data[2].desc.substr(0,180)+ `${data[2].desc.length > 180 ? "..." : ""}`}</p>
        </div>
      </div>

      <div class="flex flex-row w-full rounded-xl max-w-3xl max-h-[10rem] border-2 border-base-200 shadow-lg bg-base-100  hover:shadow-2xl hover:scale-105 duration-1000">
        <img class="w-48 object-cover rounded-l-xl" src={getImg(data[3].img)} alt={data[3].title + " image"}>
        <div class="p-4">
            <h3 class="font-bold text-sm md:text-xl py-2">{data[3].title.substr(0,60)}</h3>
            <p class="hidden md:flex" title={data[3].desc}>{data[3].desc.substr(0,180)+ `${data[3].desc.length > 180 ? "..." : ""}`}</p>
        </div>
      </div>


      <div class="w-full flex justify-center">
        <a href="/activity" use:link class="btn btn-primary w-full  hover:shadow-2xl duration-1000">อ่านเพิ่มเติม</a>

      </div>
    </div>
  </div>
</section>
{:else}
{@const data = activity.data.reverse()}
<section id="news" class="w-full mx-auto">
    <div
      class="flex flex-col md:flex-row gap-4 justify-center items-start p-12"
    >
      <a href={data[0].href ?? "#"} class="flex-initial flex justify-center hover:shadow-2xl hover:scale-105 duration-1000 ">
        <div class="card w-96 glass">
          <figure>
            <img src={getImg(data[0].img)} class="h-[20rem] w-full object-cover bg-white" alt={`${data[0].engTitle} image`}/>
          </figure>
          <div class="card-body">
            <h2 class="card-title">{data[0].engTitle.substr(0,60)}</h2>
            <p title={data[3].engDesc}>{data[3].engDesc.substr(0,130) + "..."}</p>
            <!-- <div class="card-actions justify-end">
              <button class="btn btn-primary">Learn now!</button>
            </div> -->
          </div>
        </div>
      </a>
  
      <div
        class="flex-initial flex flex-col gap-2 items-center justify-center"
      >
        <a href={data[1].href ?? "#"} class="flex flex-row w-full rounded-xl max-w-3xl max-h-[10rem] border-2 border-base-200 shadow-lg  hover:shadow-2xl hover:scale-105 duration-1000">
          <img class="w-48 object-cover rounded-l-xl" src={getImg(data[1].img)} alt={data[1].engTitle + " image"}>
          <div class="p-4">
              <h3 class="font-bold text-sm md:text-xl py-2">{data[1].engTitle ? data[1].engTitle.substr(0,60) : data[1].title.substr(0,60)}</h3>
              <p class="hidden md:flex" title={data[1].engDesc}>{data[1].engDesc.substr(0,180)+ `${data[1].engDesc.length > 180 ? "..." : ""}`}</p>
          </div>
        </a>
  
        <a href={data[2].href ?? "#"} class="flex flex-row w-full rounded-xl max-w-3xl max-h-[10rem] border-2 border-base-200 shadow-lg bg-base-100  hover:shadow-2xl hover:scale-105 duration-1000">
          <img class="w-48 object-cover rounded-l-xl" src={getImg(data[2].img)} alt={data[2].engTitle + " image"}>
          <div class="p-4">
              <h3 class="font-bold text-sm md:text-xl py-2">{data[2].engTitle ? data[2].engTitle.substr(0,60) : data[2].title.substr(0,60)}</h3>
              <p class="hidden md:flex" title={data[2].engDesc}>{data[2].engDesc.substr(0,180)+ `${data[2].engDesc.length > 180 ? "..." : ""}`}</p>
          </div>
        </a>
  
        <a href={data[3].href ?? "#"} class="flex flex-row w-full rounded-xl max-w-3xl max-h-[10rem] border-2 border-base-200 shadow-lg bg-base-100  hover:shadow-2xl hover:scale-105 duration-1000">
          <img class="w-48 object-cover rounded-l-xl" src={getImg(data[3].img)} alt={data[3].engTitle + " image"}>
          <div class="p-4">
              <h3 class="font-bold text-sm md:text-xl py-2">{data[3].engTitle ? data[3].engTitle.substr(0,60) : data[3].title.substr(0,60)}</h3>
              <p class="hidden md:flex" title={data[3].engDesc}>{data[3].engDesc.substr(0,180)+ `${data[3].engDesc.length > 180 ? "..." : ""}`}</p>
          </div>
        </a>
  
  
        <div class="w-full flex justify-center">
          <a href="/activity" use:link class="btn btn-primary w-full  hover:shadow-2xl duration-1000">Read more</a>
  
        </div>
      </div>
    </div>
  </section>
{/if}

{/await}
<script>
  import axios from "axios";
  import Carousel from "svelte-carousel";
  import data from "../data/lang/th/Corousel.json";
  import { onMount } from "svelte";
  let corousels = data;
  let loaded = false;
  let err = "";
  onMount(async () => {
    axios
      .get("https://gepswu-server.onrender.com/corousels")
      .then((res) => {
        if (res.status === 200) {
          loaded = true;
          corousels = res.data.data;
        } else {
          err = res.statusText || "Server Error";
        }
      })
      .catch((e) => {
        err = e.message || "Server Error";
      });
  });
</script>

{#if !loaded && !err}
  <!-- tailwindcss full page loader animation progress bar-->
  <div
    class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-base-100"
  >
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
    />
  </div>
{:else if err}
  <!-- display error message -->
  <div
    class="fixed top-0 left-0 z-50 w-screen h-screen flex flex-col items-center justify-center bg-base-100"
  >
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
    />
    <div class="text-2xl text-center text-gray-900">
      <p>Server Error, Please try again later</p>
      <p>{err}</p>
    </div>
  </div>
{:else}
  <!-- Carousel -->
  <div class="pt-28 md:pt-22 z-10">
    <Carousel
      autoplay
      autoplayDuration={2000}
      autoplayProgressVisible
      pauseOnFocus
      arrows={false}
    >
      {#each data as { name, img } (name)}
        <img src={img} alt={name} />
      {/each}
    </Carousel>
  </div>
  <!-- Carousel -->
{/if}

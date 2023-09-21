<script>
  import Carousel from "svelte-carousel";
  import getImg from "../lib/getImg";
  import Loading from "./Loading.svelte";
  export let data;

  const goTo = (url) => {
    if (!url || url === "" || url === "#") return;
    var win = window.open(url, "_blank");
    win.focus();
  };
</script>

{#if data}
  <div>
    <Carousel
      autoplay
      autoplayDuration={5000}
      autoplayProgressVisible
      pauseOnFocus={false}
      arrows={false}
      loop
    >
      {#each data as { name, img, url }, i ((name, i))}
        {@const c_img = getImg(img)}
        <img
          src={c_img}
          alt={name}
          on:click={goTo(url)}
          class="object-cover w-full max-h-[42rem]"
        />
      {/each}
    </Carousel>
  </div>
{:else}
  <Loading />
{/if}

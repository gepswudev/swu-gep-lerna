<script>
  import Carousel from "svelte-carousel";
  import getImg from "../lib/getImg";
  export let data;

</script>

{#if data}
  <div>
    <Carousel
      autoplay
      autoplayDuration={3500}
      autoplayProgressVisible
      pauseOnFocus
      arrows={false}
      loop
    >
      {#each data as { name, img }, i ((name, i))}
      {@const c_img = getImg(img)}
        <img src={c_img} alt={name} />
      {/each}
    </Carousel>
  </div>
{/if}

<script>
  import Carousel from "svelte-carousel";
  export let data;
</script>

{#if data}
  <div>
    <Carousel
      autoplay
      autoplayDuration={2000}
      autoplayProgressVisible
      pauseOnFocus
      arrows={false}
    >
      {#each data as { name, img }, i (name,i)}
        <img src={img} alt={name} />
      {/each}
    </Carousel>
  </div>
{/if}

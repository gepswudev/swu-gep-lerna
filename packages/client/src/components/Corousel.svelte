<script>
  import Carousel from "svelte-carousel";
  import data from "../data/lang/th/Corousel.json";

</script>

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

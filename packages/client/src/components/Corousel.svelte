<script>
  import Carousel from "svelte-carousel";
  export let data;

  const getImg = (img) => {
    if (img.startsWith("http")) return img;
    if (window.location.hostname === "localhost") return `http://localhost:5001/${img}`;
    return `https://gepswu-server.onrender.com/${img}`;
  };
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

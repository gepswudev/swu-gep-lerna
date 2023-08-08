<script>
  import Carousel from "svelte-carousel";
  export let data;

  const getImg = (img) => {
    if (img.startsWith("http")) return img;
    if (window.location.hostname === "localhost")
      return `http://localhost:5001/${data.img}`;
    return `https://gepswu-server.onrender.com/${data.img}`;
  };
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
      {#each data as { name, img }, i ((name, i))}
        <img src={getImg(img)} alt={name} />
      {/each}
    </Carousel>
  </div>
{/if}

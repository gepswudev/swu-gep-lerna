<script>
  import Carousel from "svelte-carousel";
  import getImg from "../lib/getImg";
  export let data;

  const redirect = (url) => {
    if(!url || url === "" || url === "#") return;
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
        <img src={c_img} alt={name} on:click={redirect(url)}/>
      {/each}
    </Carousel>
  </div>
{/if}

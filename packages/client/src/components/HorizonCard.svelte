<!-- Card -->
<script>
  import Swal from "sweetalert2";
  import log from "../lib/log";
  export let data;
  export let style = "";
  export let popup = true;
  export let disabled = false;

  const showAllDesc = () => {
    if (disabled) return;
    if(!popup){
      window.open(data.href);
      return;
    }
    Swal.fire({
      title: data.title,
      text: data.desc,
      icon: data.icon,
      imageUrl: data.img,
      imageWidth: 500,
      imageHeight: 200,
      imageAlt: `${data.title}_cardImgaes`,
      confirmButtonText: "Read more",
    }).then((result) => {
      if (result.isConfirmed) window.open(data.href);
    });
  };

  // $: log("HorizonCard", `Card loaded : ${data.title}`);
</script>

<!-- Card -->
<a
  id={data.title}
  class={"card w-[20rem] mx-auto bg-base-100 border-none shadow-xl hover:shadow-2xl border hover:border-primary duration-500 transition-transform transform hover:scale-110 " + style}
  href={"#" + data.title}
  on:click={showAllDesc}
>
  <figure><img class="h-52" src={data.img} alt={data.title + "_IMG"} /></figure>
  <div class="card-body">
    <h2 class="card-title">
      {data.title ?? ""}
      {#if data.badge}
        <div class="badge badge-primary">{data.badge}</div>
      {/if}
    </h2>
    <p>{(data.desc ?? "").substring(0, 80) + " ..."}</p>
  </div>
</a>
<!-- Card -->

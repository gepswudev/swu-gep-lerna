<script>
  export let line1 = "";
  export let line2 = "";
  export let href = "#";
  export let img;
  export let sx = "";
</script>

<a class={"card w-72 bg-gray shadow-xl hover:scale-105 hover:shadow-xl" + " " + sx} href={href}>
  <figure class="px-5 pt-5">
    <img
      src={img}
      alt={`Fb page ${line1 + line2} link image`}
      class="rounded-xl w-64"
    />
  </figure>
  <div class="card-body items-center text-center font-semibold">
    <p>{line1}</p>
    <p>{line2}</p>
  </div>
</a>

<script>
    export let load = 1;
</script>

{#each {length:load} as _, i}
<a id={`sklt_card_${i}`} class="card w-[20rem] mx-auto bg-base-100 border-none shadow-xl hover:shadow-2xl border hover:border-primary duration-500 transition-transform transform hover:scale-110" href={`#sklt_card_${i}`}>
    <figure class="h-52 bg-base-300 animate-pulse"></figure>
    <div class="card-body">
      <h2 class="card-title bg-base-300 rounded-sm animate-pulse">
        &nbsp
      </h2>
      <p class="bg-base-300 rounded-sm animate-pulse">&nbsp;<br>&nbsp;</p>
    </div>
</a>
{/each}
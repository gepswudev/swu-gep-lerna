<script>
    import { IconEdit, IconTrash } from "@tabler/icons-svelte";
    import { link } from "svelte-routing";
    export let load = 1;
</script>

{#each {length:load} as _, i}
<div
  class="flex flex-col w-96 md:w-[40rem] justify-center text-start p-4 border-2 border-base-300 animate-pulse"
>
  <img src="https://fakeimg.pl/1440x650" alt="banner" />
  <p class="font-bold text-2xl my-4">
    Name : <span class="text-xl">&nbsp</span>
  </p>
  <p class="font-semibold text-xl ">
    URL : <a use:link replace href="/viewcorousels" class="text-xl">&nbsp;</a>
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-center">
    <button
      class="btn btn-primary"
      ><IconEdit /> Edit</button
    >
    <button class="btn btn-error"
      ><IconTrash /> Delete</button
    >
  </div>
</div>
{/each}
<script>
  import AdminProtect from "../../components/admin/adminProtect.svelte";
  import Loading from "../../components/Loading.svelte";
  import {marked } from 'marked';
  import { getPublic } from '../lib/API/methods';
  let value = `# Hello World`;
  export let path = "";

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "profile.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href);
  };

  const data = fetch(getPublic(`md/${path}.md`)).then(res => value = res.text());

</script>


<AdminProtect>
{#await  data}
<Loading />
{:then text}  
  <div class="pt-12 grid grid-cols-2 gap-4 mx-2 min-h-screen">
    <div>
      <textarea class="w-full h-full bg-transparent border-2" bind:value={value}></textarea>
    </div>
    <div class="prose max-w-none">
      {@html marked(value)}
    </div>
  </div>
  <button class="btn btn-success">Edit</button>
  <button class="btn btn-primary w-full m-4 " on:click={download}>Download</button>
{/await}
</AdminProtect>

<script>
  import AdminProtect from "../components/admin/adminProtect.svelte";
  import {marked } from 'marked';
  let value = `# Hello World`;

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "profile.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href);
  }
</script>

<!-- Test playground -->
<!-- <AdminProtect> -->
  <button class="btn btn-primary w-full m-4 " on:click={download}>Download</button>
  <div class="pt-12 grid grid-cols-2 gap-4 mx-2 min-h-screen">
    <div>
      <textarea class="w-full h-full bg-transparent border-2" bind:value={value}></textarea>
    </div>
    <div class="prose max-w-none">
      {@html marked(value)}
    </div>
  </div>
  <button class="btn btn-primary w-full m-4 " on:click={download}>Download</button>
<!-- </AdminProtect> -->
<!-- Test playground -->
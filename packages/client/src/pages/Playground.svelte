<script>
  import AdminProtect from "../components/admin/adminProtect.svelte";
  import {marked } from 'marked';
  let value = `# Hello World`;
</script>

<!-- Test playground -->
<AdminProtect>
  <div class="pt-12 grid grid-cols-2 gap-4 mx-2 min-h-screen">
    <div>
      <textarea class="w-full bg-transparent border-2" bind:value={value}></textarea>
    </div>
    <div class="prose max-w-none">
      {@html marked(value)}
    </div>
  </div>
</AdminProtect>
<!-- Test playground -->
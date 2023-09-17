<script>
  import { marked } from "marked";
  import { get, getPublic, put } from "../../lib/API/methods";
  import AdminProtect from "../../components/admin/adminProtect.svelte";
  import Loading from "../../components/Loading.svelte";
  

  let value = `# Loading...`;

  const loadManual = async () => {
    const res = await fetch(getPublic(`md/manual.md`));
    const text = await res.text();
    value = text;
  };
</script>

<AdminProtect>
    {#await loadManual() }
        <Loading />
    {:then text} 
        
  <!-- <p class="text-center text-3xl font-bold">Website Manual</p> -->
  <div class="prose max-w-none w-full px-16">
    {@html marked(value)}
  </div>
    {/await}

</AdminProtect>

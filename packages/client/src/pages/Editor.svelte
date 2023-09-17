<script>
  import AdminProtect from "../components/admin/adminProtect.svelte";
  import { IconDownload, IconSwitchHorizontal } from "@tabler/icons-svelte";
  import { marked } from 'marked';
  let value = `# Hello World`;
  let switcher = true;

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href);
  };

  const switchSide = () => {
    switcher = !switcher;
  }
</script>

<!-- Test playground -->
<!-- <AdminProtect> -->
  <div class="flex flex-row w-full justify-end mx-12 px-24 gap-4" >
    <button on:click={switchSide}  class="btn-primary p-2 rounded-lg " >
      <IconSwitchHorizontal class="w-6 h-6" />
      </button>
    <button on:click={download}  class="btn-primary p-2 rounded-lg" >
      <IconDownload class="w-6 h-6" />
      </button>
  </div>
  <div class={switcher ? "pt-12 flex flex-row-reverse gap-4 mx-2 min-h-screen" :"pt-12 flex flex-row gap-4 mx-2 min-h-screen"}>
    <div>
      <textarea class="w-[45vw] h-full bg-transparent border-2 flex-auto" bind:value={value}></textarea>
    </div>
    <div class="prose max-w-none w-[45vw] flex-auto">
      {@html marked(value)}
    </div>
  </div>
  <button class="btn btn-primary w-full m-4 " on:click={download}>Download</button>
<!-- </AdminProtect> -->
<!-- Test playground -->

<svelte:head>
    <title>Markdown Editor | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="Markdown Editor | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
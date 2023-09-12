<script>
  export let id = "";
  import PersonnelBannerProfile from "../../components/PersonnelBannerProfile.svelte";
  import Markdown from "../../components/Markdown.svelte";
</script>

<main>
  <PersonnelBannerProfile {id} />
  <div class="w-full flex justify-center">
    <Markdown path={id} sx="pt-12" />
  </div>
</main>

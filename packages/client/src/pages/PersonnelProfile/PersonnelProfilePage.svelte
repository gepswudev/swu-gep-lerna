<script>
  import { get } from "../../lib/API/methods";
  import Loading from "../../components/Loading.svelte";
  import Markdown from "../../components/Markdown.svelte";
  import PersonnelBannerProfile from "../../components/PersonnelBannerProfile.svelte";

  export let id = "";
  let person = get(`personnels/${id}`);
</script>

{#await person}
  <Loading />
{:then data}
  <PersonnelBannerProfile person={data.data} />
  <div class="w-full flex justify-center">
    <Markdown path={data.data._id} sx="pt-12"/>
  </div>
{/await}
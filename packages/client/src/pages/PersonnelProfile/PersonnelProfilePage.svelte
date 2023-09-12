<script>
  import { get } from "../../lib/API/methods";
  import Loading from "../../components/Loading.svelte";
  import PersonnelBannerProfile from "../../components/PersonnelBannerProfile.svelte";


  export let id = "";
  let person = get(`personnels/${id}`);
</script>

<h1>Hello, {id}</h1>
{#await person}
  <Loading />
{:then data}

  <PersonnelBannerProfile person={data.data} />
{/await}

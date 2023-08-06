<script>
  import { navigate } from "svelte-routing";
  import { get } from "../../../lib/API/methods";
  export let id = "";

  let activity = get(`activities/${id}`);
</script>

<div class="mx-auto text-center items-center">
  {#await activity}
    <p>loading...</p>
  {:then data}
    <h2 class="text-error text-2xl bold">This page is duringg developemnt</h2>
    <h1 class="text-2xl bold">Activity: {data.data.title}</h1>
    <textarea readonly cols="100" rows="20" class="m-12 p-4 text-lg"
      >{JSON.stringify(data, null, 2)}</textarea
    ><br />
    <button
      class="btn btn-primary"
      on:click={() => navigate("/admin/activities")}>Back</button
    >
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

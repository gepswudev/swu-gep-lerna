<script>
  import { navigate } from "svelte-routing";
  import { get } from "../../../lib/API/methods";
  import { user } from "../../../store/user";
  export let id = "";

  let activity = get(`activities/${id}`);
</script>

{#key $user}
  {#if $user !== null}
    {#if $user?.role === "admin"}
      <div class="mx-auto text-center items-center">
        {#await activity}
          <p>loading...</p>
        {:then data}
          <h2 class="text-error text-2xl bold">
            This page is duringg developemnt
          </h2>
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
    {:else}
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col text-center">
          <div class="max-w-xl">
            <h1 class="text-5xl font-bold">You are not an admin!</h1>
            <button class="btn btn-primary mt-12" on:click={() => navigate("/")}
              >Home</button
            >
          </div>
        </div>
      </div>
    {/if}
  {:else}
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col text-center">
        <div class="max-w-xl">
          <h1 class="text-5xl font-bold">Checking your access!</h1>
          <p class="py-6">Please wait...</p>
          <!-- Loding animation -->
          <div
            class="loading ease-linear rounded-full border-8 border-t-8 border-primary bg-primary h-32 w-32"
          />

          <br />
          <button
            class="btn btn-primary mt-12"
            on:click={() => navigate("/login")}>Login</button
          >
          <p class="text-md m-2">Not logged in?</p>
        </div>
      </div>
    </div>
  {/if}
{/key}

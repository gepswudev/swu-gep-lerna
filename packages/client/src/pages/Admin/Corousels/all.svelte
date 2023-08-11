<script>
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import { user } from "../../../store/user";
  import { get } from "../../../lib/API/methods";
  import Card from "../../../components/form/admin/Corousels/card.svelte";
  import Skeleton from "../../../components/skeletons/CorouselAdmin_Skeleton.svelte";
  import Corousel from "../../../components/Corousel.svelte";

  let corousels = get("corousels");
  
</script>

{#key $user}
  {#if $user !== null}
    {#if $user?.role === "admin"}
    <h2 class="font-bold text-3xl text-center mt-12">Banner Corousels Management</h2>
      <div
        class="mt-12 px-36 flex flex-row-reverse w-full justify-center md:justify-start"
      >
        <button
          class="btn btn-success w-full xl:max-w-[12rem] text-xl"
          on:click={() => navigate("/admin/corousels/create")}
          ><IconPlus /> New</button
        >
      </div>

      <div
        class="mx-16 justify-center items-center align-baseline my-24 mt-8 grid grid-cols-2 lg:grid-cols-3 gap-12"
      >

      {#await corousels}
        <Skeleton load={2} />
      {:then data}
        {#each data.data as corousel}
          {@const id = corousel._id}
          <Card data={corousel} {id} />
        {/each}
      {:catch error}
        <p>{error.message}</p>
      {/await}
      </div>
      <h2 class="font-bold text-3xl text-center mt-12">Preview</h2>
      <div class="mt-12">
        {#await corousels}
          <div></div>
        {:then data}
          <Corousel data={data.data} />
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

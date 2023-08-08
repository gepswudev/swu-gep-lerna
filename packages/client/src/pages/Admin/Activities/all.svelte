<script>
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import Card from "../../../components/admin/HorizonCard.svelte";
  import Skeleton from "../../../components/skeletons/HorizonCard_Skeleton.svelte";
  import { get } from "../../../lib/API/methods";
  import { user } from "../../../store/user";
  import Swal from "sweetalert2";

  const handlerDelete = (data) => {
    
  };
  let activities = get("activities");
  $: console.log(activities);
</script>

<svelte:head>
  <title>Admin | Activities</title>
</svelte:head>

{#key $user}
  {#if $user !== null}
    {#if $user?.role === "admin"}
      <div
        class="mt-12 px-24 flex flex-row-reverse w-full justify-center md:justify-start"
      >
        <button
          class="btn btn-primary w-full xl:max-w-[12rem] text-xl"
          on:click={() => navigate("/admin/activities/create")}
          ><IconPlus /> New</button
        >
      </div>

      <div
        class="mx-auto my-24 mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {#await activities}
          <Skeleton load={4} />
        {:then data}
          {#each data.data as activity}
            {@const id = activity._id}
            <Card data={activity} {id} />
          {/each}
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

<script>
  import { navigate } from "svelte-routing";
  import { user } from "../../store/user";

  const data = [
    {
      title: "Users",
      desc: "Manage users",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/FF1500/Disabled",
      icon: "info",
      href: "/viewusers",
      disabled: true,
    },
    {
      title: "Corousels",
      desc: "Manage corousels",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/FF1500/Disabled!",
      icon: "info",
      href: "/viewcorousels",
      disabled: true,
    },
    {
      title: "Activities",
      desc: "Manage activities",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/008000/Activities",
      icon: "info",
      href: "/viewactivities",
    },
  ];
</script>

{#key $user}
  {#if $user !== null}
    {#if $user?.role === "admin"}
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col text-center">
          <div class="max-w-xl">
            <h1 class="text-5xl font-bold">This page is under development!</h1>
            <button
              class="btn btn-primary mt-12"
              on:click={() => navigate("/admin")}>Back</button
            >
          </div>
        </div>
      </div>
    {:else}
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col text-center">
          <div class="max-w-xl">
            <h1 class="text-5xl font-bold">You are not admin!</h1>
            <button
              class="btn btn-primary mt-12"
              on:click={() => navigate("/login")}>Login</button
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

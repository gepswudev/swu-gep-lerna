<script>
  export let username = "Admin1";

  import { IconUsersGroup } from "@tabler/icons-svelte";
  import HorizonCard from "../../components/HorizonCard.svelte";
  import { onMount } from "svelte";
  import adminAuth from "../../lib/admin/auth";
  import { navigate } from "svelte-routing";

  const data = [
    {
      title: "Users",
      desc: "Manage users",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/FF1500/Disabled",
      icon: "info",
      href: "/admin/users",
      disabled: true,
    },
    {
      title: "Corousels",
      desc: "Manage corousels",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/FF1500/Disabled!",
      icon: "info",
      href: "/admin/corousels",
      disabled: true,
    },
    {
      title: "Activities",
      desc: "Manage activities",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/008000/Activities",
      icon: "info",
      href: "/admin/activities",
    },
  ];
    
    let isAdmin = false;
    
    onMount(async () => {
      isAdmin = await adminAuth();
      if (!isAdmin) navigate("/user");
    });
</script>

{#if isAdmin}
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col text-center">
    <div class="max-w-xl">
      <h1 class="text-5xl font-bold">Admin panel</h1>
      <p class="py-6">Welcome to {username} Admin panel</p>
    </div>
    <div
      class="grid grid-cols-3 gap-16 align-middle items-center self-auto text-center"
    >
      {#each data as d}
        <HorizonCard data={d} style="" popup={false} disabled={d.disabled}/>
      {/each}
    </div>
  </div>
</div> 

{/if}

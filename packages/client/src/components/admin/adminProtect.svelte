<script>
    import NotAdmin from "./notAdmin.svelte";
    import NotAccess from "./notAccess.svelte";
    import { user } from "../../store/user";
  import isMobile from "../../lib/isMobile";
  
    let mobile = isMobile();
</script>

{#key $user}
  {#if $user !== null}
    {#if $user?.role === "admin"}
      <slot />
    {:else}
      <NotAdmin />
    {/if}
  {:else}
    <NotAccess />
  {/if}
{/key}

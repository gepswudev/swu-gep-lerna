<script>
  import { user } from "../../store/user";
  import LoginForm from "../../components/form/LoginForm.svelte";
  import RegisterForm from "../../components/form/RegisterForm.svelte";
</script>


<div class="pt-28 grid grid-cols-2 grid-rows-2">
  
  <LoginForm />
  <RegisterForm />
  {#if $user.username !== ""}
  <div class="h-full p-12 my-0 mx-auto col-span-2 border border-black rounded-lg">
    {#if $user.username !== ""}
      <p class="text-2xl">Username :</p>
      {$user.username}
    {/if}
    {#if $user.token !== ""}
      <p class="text-2xl">Token :</p>
      {$user.token.substr(0, 10) + "*".repeat($user.token.length - 10)}
    {/if}
    {#if $user.role !== ""}
      <p class="text-2xl">Role :</p>
      {$user.role}
    {/if}
    {#if $user.loginAt !== ""}
      <p class="text-2xl">Login at :</p>
      {$user.loginAt}
    {/if}
  </div>
  {/if}
</div>

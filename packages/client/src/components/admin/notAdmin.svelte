<script>
  import { _login } from "../../lib/API/user";
</script>

<div class="hero min-h-screen">
  <div class="hero-content flex-col text-center">
    <div class="max-w-xl">
      <h2 class="text-5xl font-bold">You are not admin!</h2>
      <button class="btn btn-primary mt-12" on:click={_login}>Login</button>
    </div>
  </div>
</div>

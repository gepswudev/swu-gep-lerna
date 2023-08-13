<script>
    import { navigate } from "svelte-routing";
    import AdminProtect from "../../components/admin/adminProtect.svelte";
  </script>

<AdminProtect>
  <div class="hero min-h-screen">
        <div class="hero-content flex-col text-center">
          <div class="max-w-xl">
            <h2 class="text-5xl font-bold">This page is under development!</h2>
            <button
              class="btn btn-primary mt-12"
              on:click={() => navigate("/admin")}>Back</button
            >
          </div>
        </div>
      </div>
</AdminProtect>
  
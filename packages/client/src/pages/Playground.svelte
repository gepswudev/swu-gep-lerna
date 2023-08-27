<script>
  import AdminProtect from "../components/admin/adminProtect.svelte";
  
</script>

<!-- Test playground -->
<AdminProtect>
  <div class="m-24 justify-center">
    <slot name="Playground"/>
  </div>
</AdminProtect>
<!-- Test playground -->
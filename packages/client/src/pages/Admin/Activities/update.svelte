<script>
  import UpdateForm from "../../../components/form/admin/Activities/update.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";

  export let id;
</script>

<AdminProtect>
  <div class="m-24 justify-center">
        <UpdateForm {id} />
      </div>
</AdminProtect>
<script>
    import UpdateForm from "../../../components/form/admin/Activities/update.svelte";
    export let id;
</script>

<svelte:head>
    <title>Admin | Update Activities</title>
</svelte:head>

<div class="m-24 justify-center">
    <UpdateForm id={id} />
</div>
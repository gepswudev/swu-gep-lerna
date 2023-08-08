<script>
    import EditForm from "../../../components/form/admin/Activities/update.svelte";
    import CreateForm from "../../../components/form/admin/Activities/create.svelte";
    export let type;
</script>

{#if type === "edit"}
    <EditForm />
{:else if type === "create"}
    <CreateForm />
{/if}
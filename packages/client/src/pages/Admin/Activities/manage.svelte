<script>
    import CreateForm from "../../../components/form/admin/Activities/create.svelte";
    import UpdateForm from "../../../components/form/admin/Activities/update.svelte";
    export let type = "create" || "edit";
    export let id = "";

    if(type === "edit" || id == "") {
        throw new Error("id is required when type is edit");
    }
</script>

{#if type === "edit"}
    <UpdateForm {id} />
{:else if type === "create"}
    <CreateForm />
{:else}
    <p>Invalid type</p>
{/if}
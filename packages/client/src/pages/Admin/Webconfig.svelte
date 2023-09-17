<script>
    import AdminProtect from "../../components/admin/adminProtect.svelte";
import config from "../../config.json";

    let data = {
        ...config
    };
</script>
<AdminProtect>
<p class="text-center text-2xl font-bold pb-4">Web Configuration</p>
<p class="text-sm font-thin text-error text-center pb-10">*This configuration can't edit in client due to the security of use for user. To edit this configuration, please contact the developer to edit.</p>


<main class="grid grid-cols-2 mx-12 gap-12 pl-12">
    <div class="flex flex-col justify-start gap-2">
        <label for="mode">Mode</label>
        <select name="" id="" disabled class="select select-bordered select-primary w-full max-w-xs" bind:value={data.mode}>
            <option value="development">development</option>
            <option value="production">production</option>
        </select>
        <p class="text-[0.7rem]">{data._comment_mode}</p>
    </div>
    <div class="flex flex-col justify-start gap-2">
        <label for="port">Local Development Port</label>
        <input type="number" readonly class="input input-bordered input-primary w-full max-w-xs" bind:value={data.local} />
        <p class="text-[0.7rem]">{data._comment_local}</p>
    </div>
    <div class="flex flex-col justify-start gap-2">
        <label for="server">Server</label>
        <input type="text" class="input input-bordered input-primary w-full max-w-xs" bind:value={data.deploy} />
        <p class="text-[0.7rem]">{data._comment_deploy}</p>
    </div>
    <div class="flex flex-col justify-start gap-2">
        <label for="mode">Default language</label>
        <select name="" disabled id="" class="select select-bordered select-primary w-full max-w-xs" bind:value={data.default_lang}>
            <option value="th">Thai</option>
            <option value="en">English</option>
        </select>
        <p class="text-[0.7rem]">{data._comment_default_lang}</p>
    </div>
    <div class="flex flex-col justify-start gap-2">
        <label for="hp-vid">Homepage YouTube Video ID</label>
        <input type="text" readonly class="input input-bordered input-primary w-full max-w-xs" bind:value={data.homepage_vid} />
        <p class="text-[0.7rem]">{data._comment_homepage_vid}</p>
    </div>
</main>
</AdminProtect>




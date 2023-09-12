<script>
    import {marked} from 'marked';
    import { getPublic } from '../lib/API/methods';
    import Loading from './Loading.svelte';

    export let path = "";
    export let sx = "";

    const data = fetch(getPublic(`md/${path}.md`)).then(res => res.text());
</script>

{#await  data}
<Loading />
{:then text}
{#if text.includes("404") || text.includes("Not Found")}
    <h1 class="py-12 text-4xl text-center">ไม่มีข้อมูล</h1>
    {:else}
    <article class={"prose md:max-w-none px-32" + " " + sx}>
        {@html marked(text)}
    </article>
{/if}

{/await}

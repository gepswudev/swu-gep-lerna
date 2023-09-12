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
<article class={"prose max-w-none px-32" + " " + sx}>
    {@html marked(text)}
</article>
{/await}

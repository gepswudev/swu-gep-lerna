<script>
    import lang from "../lib/lang";
    import getImg from "../lib/getImg";
    import { get } from "../lib/API/methods";

    export let data;

    let display = lang() || "th";
</script>

<div class="w-[414px] h-[175px] bg-amber-100 mt-4">
    <img
    src={getImg(data.img)}
    alt={data.email + "_IMG"}
    class="max-h-[175px]"
    />
    <p>
        {data.name}
    </p>
</div>

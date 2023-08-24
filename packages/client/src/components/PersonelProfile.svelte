<script>
    import lang from "../lib/lang";
    import getImg from "../lib/getImg";
    import { get } from "../lib/API/methods";

    import {IconMail, IconPhone} from "@tabler/icons-svelte";

    export let data;

    let display = lang() || "th";
</script>

<div class="w-[350px] md:w-[414px] h-[175px] mt-4 flex border-b-2 pb-8 border-red-500 md:border-none">
    <img
    src={getImg(data.img)}
    alt={data.email + "_IMG"}
    class="max-h-[175px] w-[120px] md:w-[153px] object-cover"
    />
    <div class="pl-4 pt-2">
        <!-- Thai Name -->
        <p class="text-[14px] text-primary font-bold">
            {data.name}
        </p>
        <!-- Eng Name -->
        <p class="text-[14px] text-primary">
            {data?.engName}
        </p>
        <!-- Position -->
        <p class="text-[14px]">
            {data?.position}
        </p>
        <!-- Phone -->
        <div class="flex items-center">
            <div class="bg-[#b3b3b3] h-[18px] w-[18px] rounded-full">
                <IconPhone class="py-1 h-[18px] w-[18px] fill-white stroke-none"/>
            </div>
            <p class="text-[14px] pl-2">
                {data?.phone}
            </p>
        </div>
        <!-- Email -->
        <div class="flex items-center">
            <div class="bg-[#b3b3b3] h-[18px] w-[18px] rounded-full">
                <IconMail class="py-1 h-[18px] w-[18px] stroke-white"/>
            </div>
            <a href="mailto:{data?.email}" class="text-[14px] pl-2 hover:text-primary"> {data?.email} </a>
        </div>

    </div>
</div>

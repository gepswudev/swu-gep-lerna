<script>
    import { IconMail, IconPhone } from "@tabler/icons-svelte";
    import { IconUser, IconClock } from "@tabler/icons-svelte";
    import getImg from "../../lib/getImg";

    export let data;
</script>

<div class="bg-white h-fit w-80 rounded-[20px] shadow-xl flex py-6 p-3 hover:scale-105 hover:shadow-2xl duration-1000">
    <div class="items-center self-center">
        <img
            src={getImg(data.img)}
            alt=""
            class="object-cover w-64 rounded-full"
        />
    </div>
    <div class="pl-3 flex flex-col gap-1">
        <p class="text-black">{data.name}</p>
        <div class="flex flex-row items-center">
            <IconUser class="stroke-primary" />
            <div class="bg-[#00A2E014] h-fit w-fit px-[13px] rounded-xl py-2">
                <p class="text-primary">{data.wellcenter.position}</p>
            </div>
        </div>
        <div class="flex flex-row border-t pt-1 mt-1">
            <!-- <div class="bg-primary w-[13px] h-[13px] rounded-full mr-2" /> -->
            <IconClock class="stroke-primary" size=23/>
            <div class="flex flex-col gap-1 ml-2 mt-1">
                {#each data.wellcenter.availableTime as counsultTime }
                <p class="text-black"> {counsultTime} </p>
                {/each}
            </div>
        </div>
    </div>
</div>

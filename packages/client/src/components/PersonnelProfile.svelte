<script>
  import lang from "../lib/lang";
  import getImg from "../lib/getImg";

  import { IconMail, IconPhone } from "@tabler/icons-svelte";
  import { Link } from "svelte-routing";

  export let data;
</script>

<Link
  to={`personnel/${data._id}`}
  class="w-[350px] md:w-[414px] h-[175px] mt-4 flex border-b-2 pb-8 border-red-500 md:border-none hover:bg-base-200 hover:rounded-xl duration-700 transition-all hover:scale-105 hover:p-4 text-start"
>
  <img
    src={getImg(data.img)}
    alt={data.email + "_IMG"}
    class="max-h-[175px] w-[120px] md:w-[153px] object-cover rounded-md"
  />
  <div class="pl-4 pt-2">
    {#if lang() === "th"}
      <!-- In Thai Lang -->
      <!-- Thai Name -->
      <p class="text-[14px] text-primary font-bold">
        {data.name}
      </p>
      <!-- Eng Name -->
      <p class="text-[14px] text-primary">
        {data?.engName}
      </p>
    {:else}
      <!-- In Eng Lang -->
      <!-- Eng Name -->
      <p class="text-[14px] text-primary font-bold">
        {data?.engName}
      </p>
      <!-- Thai Name -->
      <p class="text-[14px] text-primary">
        {data.name}
      </p>
    {/if}

    <!-- Position -->
    <p class="text-[14px]">
      {#if lang() === "th"}
        {data?.position}
      {:else}
        {data?.engPosition}
      {/if}
    </p>
    <!-- Phone -->
    <div class="flex items-center">
      <div class="bg-[#b3b3b3] h-[18px] w-[18px] rounded-full">
        <IconPhone class="py-1 h-[18px] w-[18px] fill-white stroke-none" />
      </div>
      <p class="text-[14px] pl-2">
        {data?.phone}
      </p>
    </div>
    <!-- Email -->
    <div class="flex items-center">
      <div class="bg-[#b3b3b3] h-[18px] w-[18px] rounded-full">
        <IconMail class="py-1 h-[18px] w-[18px] stroke-white" />
      </div>
      <a
        href="mailto:{data?.email}"
        class="text-[14px] pl-2 hover:text-primary"
      >
        {data?.email}
      </a>
    </div>
  </div>
</Link>

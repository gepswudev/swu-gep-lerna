<script>
    import lang from "../lib/lang";
    import getImg from "../lib/getImg";
    import { get } from "../lib/API/methods";

    import {IconMail, IconPhone} from "@tabler/icons-svelte";

    export let data;

    let display = lang() || "th";
</script>

<div class="bg-white h-[118px] w-[255px] rounded-[20px] shadow-xl flex py-6 p-3">
    <div class="">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg" 
      alt=""
      class="object-cover w-[75px] h-[75px] rounded-full">
    </div>
    <div class="pl-3 flex flex-col gap-1">
      <p class="text-black"> อาจารย์ ดร.วีระพันธุ์ จันทะพา </p>
      <div class="bg-[#00A2E014] h-[23px] w-fit px-[13px] rounded-full">
        <p class="text-[#00A2E0]"> ป้องกันตัวจากศาสตร์มืด </p>
      </div>
      <div class="flex flex-row border-t pt-1 mt-1">
        <div class="bg-[#00A2E0] w-[13px] h-[13px] rounded-full mr-2"> </div>
        <div class="flex flex-col gap-1">
          <p class="text-black"> 10:00 AM - 12:00 PM </p>
          <p class="text-black"> 13:30 AM - 15:00 PM </p>
        </div>
      </div>
    </div>
  </div>
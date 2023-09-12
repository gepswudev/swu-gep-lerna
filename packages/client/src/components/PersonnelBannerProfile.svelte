<script>
  import { IconMail, IconPhone } from "@tabler/icons-svelte";
  import Loading from "../components/Loading.svelte";
  import getImg from "../lib/getImg";
  import lang from "../lib/lang";
  import { get } from "../lib/API/methods";

  export let id = "";
</script>

{#await get(`personnels/${id}`)}
  <Loading />
{:then person }
<div class="hero ">
  <div class="z-0 flex flex-col lg:flex-row items-center justify-center md:justify-start gap-8 p-1 w-full px-32">
    <img
      src={getImg(person.data.img)}
      alt={`${person.data.name} profile image`}
      class="max-w-[16rem] rounded-lg"
    />
    <div>
      <h2 class="text-5xl font-bold">
        {lang() === "th" ? person.data.name : person.data.engName}
      </h2>
      <h3 class="pt-4 text-xl font-semibold">
        {lang() === "th" ? person.data.engName : person.data.name}
      </h3>
      <p class="pt-8 font-semibold">
        {lang() === "th" ? person.data.position : person.data.engPosition}
      </p>
      <a
        href={`mailto:${person.data.email}`}
        class="pt-2 font-semibold flex flex-row gap-1 hover:text-primary hover:underline"
        ><span><IconMail /></span>{person.data.email}</a
      >
      <a
        href={`tel:${person.data.phone.replace(/-/g, "")}`}
        class="pt-2 pb-4 font-semibold flex flex-row gap-1 hover:text-primary hover:underline"
        ><span><IconPhone /></span>{person.data.phone}</a
      >
    </div>
  </div>
</div>
{:catch error }
  <p>{lang() === "th" ? "พบข้อผิดพลาด" : "Something went wrong"}</p>
{/await}
  


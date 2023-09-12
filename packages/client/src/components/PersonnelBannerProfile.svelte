<script>
  import { IconMail, IconPhone } from "@tabler/icons-svelte";
  import getImg from "../lib/getImg";
  import lang from "../lib/lang";

  export let person;
</script>

<div class="hero ">
  <div class="z-0 flex flex-col lg:flex-row items-center justify-start gap-8 p-1 w-full px-32">
    <img
      src={getImg(person.img)}
      alt={`${person.name} profile image`}
      class="max-w-[16rem] rounded-lg"
    />
    <div>
      <h2 class="text-5xl font-bold">
        {lang() === "th" ? person.name : person.engName}
      </h2>
      <h3 class="text-xl font-semibold">
        {lang() === "th" ? person.engName : person.name}
      </h3>
      <p class="pt-4 font-semibold">
        {lang() === "th" ? person.position : person.engPosition}
      </p>
      <a
        href={`mailto:${person.email}`}
        class="pt-4 font-semibold flex flex-row gap-1"
        ><span><IconMail /></span>{person.email}</a
      >
      <a
        href={`tel:${person.phone.replace(/-/g, "")}`}
        class="pt-4 pb-4 font-semibold flex flex-row gap-1"
        ><span><IconPhone /></span>{person.phone}</a
      >
    </div>
  </div>
</div>

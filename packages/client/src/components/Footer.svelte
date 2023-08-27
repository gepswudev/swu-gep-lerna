<!-- Footer -->
<script>
  import lang from "../lib/lang";
  import GEPLOGO from "../assets/GEPSWU_Logo.png";
  import { IconBrandFacebook, IconMail, IconPhone } from "@tabler/icons-svelte";
  
</script>

<footer class="bg-gray text-neutral w-full">
  <div class="footer p-10 border-b-0 md:border-b-2 border-white m-4 ">
    <div class="w-72">
      <img src={GEPLOGO} alt="GEPLOGO" class="w-36" />
      <p class="text-lg">{lang() === "th" ? "ภาควิชาการแนะแนวและ" : "Guidance Psychology"}</p>
      <p class="text-lg">{lang() === "th" ? "จิตวิทยาการศึกษาคณะศึกษาศาสตร์" : "Faculty of Education"}</p>
      <div class="grid grid-cols-3 gap-3">
        <a href="mailto:ed.swu@g.swu.ac.th"
          ><IconPhone
            size={24}
            class={"w-7 h-7 bg-dark-gray rounded-full p-1 stroke-gray"}
          /></a
        >
        <a href="tel:026495000"
          ><IconMail
            size={24}
            class={"w-7 h-7 bg-dark-gray rounded-full p-1 stroke-gray"}
          /></a
        >
        <a href="https://www.facebook.com/profile.php?id=100057497767786"
          ><IconBrandFacebook
            size={24}
            class={"w-7 h-7 bg-dark-gray rounded-full p-1 stroke-gray"}
          /></a
        >
      </div>
    </div>
    <div class="hidden md:block w-96">&nbsp;</div>
    <div>
      <span
        class="footer-title text-xl font-extrabold text-red-500 border-b-2 border-red-500 opacity-100 md:border-none w-full mb-4"
        >{lang() === "th" ? "เกี่ยวกับเรา" : "About us"}</span
      >
      <a class="link link-hover text-lg" href="/about"
        >{lang() === "th" ? "สถาบันการศึกษาด้านศักยภาพมนุษย์นำไปสู่เป้าหมายของการพัฒนามนุษย์และสังคมอย่างสมบูรณ์" : "Human potential institutions lead to the goal of complete human and social development."}</a
      >
    </div>
      <div>
        <span class="footer-title text-xl font-extrabold text-red-500 border-b-2 border-red-500 opacity-100 md:border-none w-full mb-4">
          {lang() === "th" ? "ติดต่อเรา" : "Contact us"}
        </span>
        <a class="link link-hover text-lg" href="/contact">
          {lang() === "th" ? "มหาวิทยาลัยศรีนครินทรวิโรฒ" : "Srinakharinwirot University"}
        </a>
      </div>
      <div>
        <span class="footer-title text-xl font-extrabold text-red-500 border-b-2 border-red-500 opacity-100 md:border-none w-full mb-4 pr-44 md:pr-0">
          {lang() === "th" ? "หน่วยงานที่เกี่ยวข้อง" : "Related Units"}
        </span>
        <a class="link link-hover text-lg" href="https://edu.swu.ac.th/">
          {lang() === "th" ? "คณะศึกษาศาสตร์" : "Faculty of Education"}
        </a>
        <a class="link link-hover text-lg" href="https://swu.ac.th">
          {lang() === "th" ? "มหาวิทยาลัยศรีนครินทรวิโรฒ" : "Srinakharinwirot University"}
        </a>
        <a class="link link-hover text-lg" href="https://swu.ac.th">SWU</a>
        <a class="link link-hover text-lg" href="https://grad.swu.ac.th"> {lang() === "th" ? "บัณฑิตวิทยาลัย" : "Graduate School"}</a>
      </div>
      
  </div>
  <div
    class="flex flex-col md:flex-row justify-center md:justify-between p-4 pb-6 text-base-100 font-semibold bg-neutral md:bg-gray  "
  >
    <a href="https://swu.ac.th" class="hover:underline hover:text-primary"
      >Copyright 2023 by Srinakharinwirot University</a
    >
    <p>
      <a href="/privacy" class="hover:underline hover:text-primary">Privacy Policy</a> |
      <a href="/terms" class="hover:underline hover:text-primary">Terms of Use</a>
      | <a href="/cookies" class="hover:underline hover:text-primary">Cookie Policy</a>
    </p>
  </div>
</footer>
<!-- Footer -->

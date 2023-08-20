<!-- Footer -->
<script>
  //muti-lang handlers
  import { onMount } from "svelte";
  import lang from "../lib/lang";
  import swa from "../lib/popalert";
  import log from "../lib/log";
  import GEPLOGO from "../assets/GEPSWU_Logo.png";
  import { IconBrandFacebook, IconMail, IconPhone } from "@tabler/icons-svelte";
  let data = [];
  onMount(async () => {
    try {
      // Use dynamic import to load the module based on the 'lang' variable
      const module = await import(`../data/lang/${lang()}/Footer.json`);
      data = module.default;
      log("Footer", `Language loaded : ${lang().toLocaleUpperCase()}`);
    } catch (error) {
      log(
        "Footer",
        `Language ${lang().toLocaleUpperCase()} is not supported`,
        "error"
      );
      swa(
        {
          title: "Error",
          text: `Language ${lang().toLocaleUpperCase()} is not supported`,
          icon: "error",
          confirmButtonText: "Change to default language",
        },
        () => {
          localStorage.setItem("lang", "th");
          window.location.reload();
        }
      );
      log(
        "Footer",
        `Language ${lang().toLocaleUpperCase()} is not supported`,
        "error"
      );
    }
  });
</script>

<footer class="bg-gray text-neutral">
  <div class="footer p-10 border-none md:border-b-2 md:border-white m-4">
    <div class="w-72">
      <img src={GEPLOGO} alt="GEPLOGO" class="w-36" />
      <p>ภาควิชาการแนะแนวและ</p>
      <p>จิตวิทยาการศึกษาคณะศึกษาศาสตร์</p>
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
    <div class="w-64">&nbsp;</div>
    <div>
      <span
        class="footer-title text-xl font-extrabold text-primary border-b-2 border-primary md:border-none w-full mb-4"
        >เกี่ยวกับเรา</span
      >
      <a class="link link-hover" href="/about"
        >สถาบันการศึกษาด้านศักยภาพมนุษย์นำไปสู่เป้าหมายของการพัฒนามนุษย์และสังคมอย่าง
        สมบูรณ์</a
      >
    </div>
    <div>
      <span
        class="footer-title text-xl font-extrabold text-primary border-b-2 border-primary md:border-none w-full mb-4"
        >ติดต่อเรา</span
      >
      <a class="link link-hover" href="/contact"
        >ภาควิชาการแนะแนวและ จิตวิทยาการศึกษา ชั้น 4 คณะศึกษาศาสตร์
        มหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร</a
      >
    </div>
    <div>
      <span
        class="footer-title text-xl font-extrabold text-primary border-b-2 border-primary md:border-none w-full mb-4 pr-44 md:pr-0"
        >หน่วยงานที่เกี่ยวข้อง</span
      >
      <a class="link link-hover" href="https://edu.swu.ac.th/"
        >คณะศึกษาศาสตร์
      </a>
      <a class="link link-hover" href="https://swu.ac.th"
        >มหาวิทยาลัยศรีนครินทรวิโรฒ</a
      >
      <a class="link link-hover" href="https://swu.ac.th">SWU</a>
      <a class="link link-hover" href="https://grad.swu.ac.th">บัณฑิตวิทยาลัย</a
      >
    </div>
  </div>
  <div
    class="flex flex-col md:flex-row justify-center md:justify-between p-4 pb-6 text-base-100 font-semibold bg-neutral md:bg-gray  "
  >
    <a href="https://swu.ac.th" class="hover:underline"
      >Copyright 2023 by Srinakharinwirot University</a
    >
    <p>
      <a href="/privacy" class="hover:underline">Privacy Policy</a> |
      <a href="/terms" class="hover:underline">Terms of Use</a>
      | <a href="/cookies" class="hover:underline">Cookie Policy</a>
    </p>
  </div>
</footer>
<!-- Footer -->

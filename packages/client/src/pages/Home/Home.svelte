<script>
  import Carousel from "svelte-carousel";
  import Youtube from "svelte-youtube-embed";

  import config from "../../config";
  import wellcenter from "../../assets/wellcenter.png";
  import wellcenterQr from "../../assets/wellcenter_qr.png";
  import fb1 from "../../assets/fb/fb1.jpg";
  import fb2 from "../../assets/fb/fb2.jpg";
  import fb3 from "../../assets/fb/fb3.jpg";
  import fb4 from "../../assets/fb/fb4.jpg";
  import CorouselBanner from "../../components/Corousel.svelte";
  import HorizonCard from "../../components/activities/ActivityLayout.svelte";
  import HorizonCardSkeleton from "../../components/skeletons/HorizonCard_Skeleton.svelte";
  import { get } from "../../lib/API/methods";
  import FbPageCard from "../../components/FbPageCard.svelte";
  import ActivityMobileLayout from "../../components/activities/ActivityMobileLayout.svelte";
  import FbPageCardMobile from "../../components/FbPageCardMobile.svelte";
  import lang from "../../lib/lang";

  let corouselWellcenter;
  const handleNextClick = () => {
    corouselWellcenter.goToNext();
  };

  let corouselData = get("corousels");
</script>

<!-- Hero -->
<div class="min-h-screen bg-base-100 pb-28">
  {#await corouselData}
    <div />
  {:then data}
    <CorouselBanner data={data.data} />
  {/await}
  <!-- Desktop Home page -->
  <div
    class="hidden lg:hero bg-center items-center align-middle text-center py-8"
  >
    <div class="w-full mx-auto">
      <!-- YouTube -->
      <div class="flex flex-col w-[80rem] text-neutral mx-auto">
        <div class="w-full border-b-2 border-black py-4">
          <p class="text-3xl font-semibold text-start">
            {lang() === "th" ? "แนะนำหลักสูตร" : "Course Introduction"}
          </p>
          <div
            class="mt-1 flex flex-row items-center justify-between align-baseline"
          >
            <p class="grow text-start">
              {lang() === "th"
                ? "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์"
                : "Department of Guidance Psychology, Faculty of Education"}
            </p>
            <p class="flex-1 text-end">
              {lang() === "th" ? "ก่อตั้งปี 2497" : "Since 1954"}
            </p>
          </div>
        </div>

        <div class="p-8 flex flex-row border-b-2 text-start">
          <div class="w-[55rem] grow">
            <Youtube id={config.homepage_vid} altThumb={true} animations={false} />
          </div>
          <div class=" w-[13rem] m-6 my-0 flex-none flex flex-col">
            <h3 class="font-semibold">
              {lang() === "th" ? "หลักสูตร" : "Course"}
            </h3>
            <a href="/course" class="mt-2 hover:underline hover:text-primary">
              <p>{lang() === "th" ? "ระดับปริญญาตรี" : "Bechelor Degree"}</p>
              <p>
                {lang() === "th"
                  ? "การศึกษาบัณฑิต (กศ.บ.)"
                  : "Bachelor of Education (B.Ed.)"}
              </p>
            </a>

            <a href="/course" class="mt-2 hover:underline hover:text-primary">
              <p>{lang() === "th" ? "ระดับปริญญาโท" : "Master Degree"}</p>
              <p>
                {lang() === "th"
                  ? "การศึกษามหาบัณฑิต (กศ.ม.)"
                  : "Master of Education (M.Ed.)"}
              </p>
            </a>

            <a href="/course" class="mt-2 hover:underline hover:text-primary">
              <p>{lang() === "th" ? "ระดับปริญญาเอก" : "Doctoral Degree"}</p>
              <p>
                {lang() === "th"
                  ? "การศึกษาดุษฎีบัณฑิต (กศ.ด.)"
                  : "Doctor of Education (Ed.D.)"}
              </p>
            </a>
          </div>
        </div>
      </div>
      <!-- YouTube -->

      <HorizonCard showTagFilter={false} />

      <!-- WELLCENTER -->
      <div class="flex w-[76rem] flex-row text-neutral mx-auto text-start">
        <div class="w-[23.5rem] bg-gray">
          <img class="h-full w-full" src={wellcenter} alt="wellcenterimg" />
        </div>
        <div class="flex w-[29.5rem] flex-col bg-gray p-12">
          <strong class=" text-3xl font-semibold">W.E.L.L Center</strong>
          <b>"You Are Not Alone"</b>
          <div class="my-6">
            <b
              >{lang() === "th"
                ? "ศูนย์ให้คำปรึกษา คณะศึกษาศาสตร์ มศว"
                : "Counseling Center Faculty of Education, SWU"}</b
            >
            <p>The mental health counselors are ready to hear you</p>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-col">
              <b>{lang() === "th" ? "เปิดให้บริการ" : "Service Hours"}</b>
              <b>{lang() === "th" ? "เวลา" : "Time"}</b>
              <b>{lang() === "th" ? "สถานที่" : "Location"}</b>
            </div>
            <div class="mx-2 flex flex-col">
              <p>
                {lang() === "th" ? "วันจันทร์ - วันศุกร์" : "Monday - Friday"}
              </p>
              <p>
                {lang() === "th" ? "10.00 - 16.00 น." : "10.00 AM - 4.00 PM"}
              </p>
              <p>
                {lang() === "th"
                  ? "มหาวิทยาลัยศรีนครินทรวิโรฒ"
                  : "Srinakharinwirot University"}
              </p>
              <p>
                {lang() === "th"
                  ? "อาคารคณะศึกษาศาสตร์ ห้อง 408 ชั้น 4"
                  : "Faculty of Education Building, Room 408, 4th Floor"}
              </p>
            </div>
          </div>
          <a
            href="https://www.facebook.com/Well.Center.SWU"
            class="text-primary mt-4 hover:underline"
            >{lang() === "th" ? "ช่องทาง" : "Contact"} -&gt; www.facebook.com/Well.Center.SWU</a
          >
        </div>
        <div
          class="flex flex-1 flex-col items-center justify-center text-center font-semibold p-3 align-baseline"
        >
          <img src={wellcenterQr} class="py-3" alt="wellcenterQR" />
          {lang() === "th"
            ? "ติดต่อสอบถามข้อมูลได้โดยการแสกน QR Code นี้"
            : "You can contact us for inquiries by scanning this QR code."}
        </div>
        &nbsp;
      </div>
      <!-- WELLCENTER -->

      <!-- Facebook follow -->
      <div class="text-neutral mx-auto my-24 flex w-[80rem] flex-col">
        <div class="w-full border-b-2 border-black py-4">
          <p class="text-start text-2xl font-semibold">
            {lang() === "th" ? "ติดตาม" : "Follow"}
          </p>
          <div
            class="mt-1 flex flex-row items-center justify-between align-baseline"
          >
            <p class="grow text-start">
              {lang() === "th"
                ? "ช่องทางการติดตามและสอบถามเพิ่มเติม"
                : "Additional ways to follow up and inquire"}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-16 justify-center items-center mt-6">
          <FbPageCard
            line1={lang() === "th" ? "คณะศึกษาศาสตร์" : "Faculty of Education"}
            line2={lang() === "th"
              ? "มหาวิทยาลัยศรีนครินทรวิโรฒ"
              : "Srinakharinwirot University"}
            href="https://www.facebook.com/EDUCATIONSWU/"
            img={fb1}
          />
          <FbPageCard
            line1={lang() === "th"
              ? "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา มศว"
              : "Department of Guidance Psychology, SWU"}
            href="https://www.facebook.com/profile.php?id=100057497767786"
            img={fb2}
          />
          <FbPageCard
            line1="ED Internship"
            line2=" "
            href="https://www.facebook.com/edinternship/?locale=th_TH"
            img={fb3}
          />
          <FbPageCard
            line1={lang() === "th"
              ? "สโมสรนิสิตคณะศึกษาศาสตร์ มศว"
              : "Faculty of Education Student Club SWU"}
            line2=" "
            href="https://www.facebook.com/eduswu/"
            img={fb4}
          />
        </div>
      </div>
      <!-- Facebook follow -->
    </div>
  </div>

  <!-- Mobile Home page -->
  <div
    class="flex flex-col bg-center items-center align-middle text-center py-8 lg:hidden"
  >
    <div class="w-full px-12 grow text-start">
      <div class="mb-4 pb-4 border-b-2">
        <p class="text-3xl font-semibold">
          {lang() === "th" ? "แนะนำหลักสูตร" : "Course Introduction"}
        </p>
        <h1 class="">
          {lang() === "th"
            ? "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา"
            : "Department of Guidance Psychology"}
        </h1>
        <p>
          {lang() === "th" ? "คณะศึกษาศาสตร์" : "Faculty of Education"}
        </p>
      </div>

      <div class="mx-auto mt-3 w-full border-b-2 pb-4">
        <Youtube id={config.homepage_vid} altThumb={true} animations={false} />
      </div>
    </div>
    <div class="w-full mx-auto">
      <ActivityMobileLayout />
    </div>
    <div class="w-screen h-64">
      <p class="text-start text-xl font-bold my-4 pl-12">W.E.L.L Center</p>
      <Carousel bind:this={corouselWellcenter} arrows={false} dots={false}>
        <div>
          <div class="w-full h-32 md:h-48 flex flex-row overflow-hidden">
            <img
              class="w-32 md:w-48 h-32 md:h-48 flex-1 object-fill"
              src={wellcenter}
              alt="wellcenterimg"
            />
            <div
              class="grow bg-gray flex flex-col justify-center items-center text-start px-12 py-10"
            >
              <p class="text-sm md:text-xl font-bold">“You Are Not Alone”</p>
              <p>The mental health counselors are ready to hear you</p>
            </div>
            <div>
              <button
                class="flex-none h-full w-12 bg-gray flex flex-col justify-center items-center"
                on:click={handleNextClick}><p class="text-xl">&gt;</p></button
              >
            </div>
          </div>
        </div>
        <div>
          <div class="w-full h-32 md:h-48 flex flex-row overflow-hidden">
            <img
              class="w-24 md:w-48 h-32 md:h-48 flex-1 object-fit"
              src={wellcenterQr}
              alt="wellcenterimg"
            />

            <div
              class="grow bg-gray flex flex-row justify-center items-start text-start px-12 py-4"
            >
              <div
                class="text-[0.8rem] md:text-xl flex flex-col justify-center text-start"
              >
                <p>
                  <b>{lang() === "th" ? "เปิดให้บริการ" : "Service Hours"}</b
                  >{lang() === "th"
                    ? "วันจันทร์ - วันศุกร์"
                    : "Monday - Friday"}
                </p>
                <p>
                  <b>{lang() === "th" ? "เวลา" : "Time"}</b>{lang() === "th"
                    ? "10.00 - 16.00 น."
                    : "10.00 AM - 4.00 PM"}
                </p>
                <p>
                  <b>{lang() === "th" ? "สถานที่" : "Location"}</b>{lang() ===
                  "th"
                    ? "มหาวิทยาลัยศรีนครินทรวิโรฒ อาคารคณะศึกษาศาสตร์ ห้อง 408 ชั้น 4"
                    : "Srinakharinwirot University, Faculty of Education Building, Room 408, 4th Floor"}
                </p>
              </div>
            </div>
            <div>
              <button
                class="flex-none h-full w-12 bg-gray flex flex-col justify-center items-center"
                on:click={handleNextClick}><p class="text-xl">&gt;</p></button
              >
            </div>
          </div>
        </div>
      </Carousel>
    </div>

    <div class="w-full px-6 my-12 mb-0 grow">
      <div class="mb-8 pb-4 border-b-2">
        <p class="text-3xl font-semibold text-center">
          {lang() === "th" ? "ติดตาม" : "Follow"}
        </p>
        <p>
          {lang() === "th"
            ? "ช่องทางการติดตามและสอบถามเพิ่มเติม"
            : "Additional ways to follow up and inquire"}
        </p>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 gap-12 justify-center md:justify-start items-center mt-6"
      >
        <FbPageCardMobile
          line1={lang() === "th"
            ? "คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
            : "Faculty of Education Srinakharinwirot University"}
          href="https://www.facebook.com/EDUCATIONSWU/"
          img={fb1}
        />
        <FbPageCardMobile
          line1={lang() === "th"
            ? "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา มศว"
            : "Department of Guidance Psychology, SWU"}
          href="https://www.facebook.com/profile.php?id=100057497767786"
          img={fb2}
        />
        <FbPageCardMobile
          line1="ED Internship"
          href="https://www.facebook.com/edinternship/?locale=th_TH"
          img={fb3}
        />
        <FbPageCardMobile
          line1={lang() === "th"
            ? "สโมสรนิสิตคณะศึกษาศาสตร์ มศว"
            : "Faculty of Education Student Club SWU"}
          href="https://www.facebook.com/eduswu/"
          img={fb4}
        />
      </div>
    </div>
  </div>
</div>
<!-- Hero Homepage -->

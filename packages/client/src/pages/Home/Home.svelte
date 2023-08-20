<script>
  import medata from "../metadata.json";
  import wellcenter from "../../assets/wellcenter.png";
  import wellcenterQr from "../../assets/wellcenter_qr.png";
  import fb1 from "../../assets/fb1.png";
  import fb2 from "../../assets/fb2.png";
  import fb3 from "../../assets/fb3.png";
  import fb4 from "../../assets/fb4.png";
  import Corousel from "../../components/Corousel.svelte";
  import HorizonCard from "../../components/activities/ActivityLayout.svelte";
  import HorizonCardSkeleton from "../../components/skeletons/HorizonCard_Skeleton.svelte";
  import Youtube from "svelte-youtube-embed";
  import { get } from "../../lib/API/methods";

  let corouselData = get("corousels");
</script>

<!-- Homepage -->
<svelte:head>
  <title>{medata.base.title}</title>
  <meta property="og:title" content={medata.base.title} />
  <meta property="og:description" content={medata.base.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={window.location} />
</svelte:head>
<!-- Hero -->
<div class="min-h-screen bg-base-100 pb-28">
  {#await corouselData}
    <div />
  {:then data}
    <Corousel data={data.data} />
  {/await}
  <!-- Desktop Home page -->
  <div class="hidden md:hero bg-center items-center align-middle text-center py-8 ">
    <div class="w-full mx-auto">
      <!-- YouTube -->
      <div class="flex flex-col w-[80rem] text-neutral mx-auto">
        <div class="w-full border-b-2 border-black py-4">
          <p class="text-3xl font-semibold text-start">แนะนำหลักสูตร</p>
          <div
            class="mt-1 flex flex-row items-center justify-between align-baseline"
          >
            <p class="grow text-start">
              ภาควิชาการแนะแนวและจิตวิทยาการศึกษาคณะศึกษาศาสตร์
            </p>
            <p class="flex-1 text-end">ก่อตั้งปี 2497</p>
          </div>
        </div>
        <div class="p-8 flex flex-row border-b-2 text-start">
          <div class="w-[55rem] grow">
            <Youtube id="jK89KESDWzU" altThumb={true} animations={false} />
          </div>
          <div class=" w-[13rem] m-6 my-0 flex-none">
            <h3 class="font-semibold">หลักสูตร</h3>
            <div class="mt-4 hover:underline hover:text-primary">
              <p>ระดับปริญญาตรี</p>
              <p>การศึกษาบัณฑิต (กศ.บ)</p>
            </div>

            <div class="mt-4 hover:underline hover:text-primary">
              <p>ระดับปริญญาโท</p>
              <p>การศึกษามหาบัณฑิต (กศ.ม.)</p>
            </div>

            <div class="mt-4 hover:underline hover:text-primary">
              <p>ระดับปริญญาเอก</p>
              <p>การศึกษาดุษฎีบัณฑิต (กศ.ด.)</p>
            </div>
          </div>
        </div>
      </div>
      <!-- YouTube -->

      <HorizonCard />

      <!-- WELLCENTER -->
      <div class="flex w-[76rem] flex-row text-neutral mx-auto text-start">
        <div class="w-[23.5rem] bg-gray">
          <img class="h-full w-full" src={wellcenter} alt="wellcenterimg" />
        </div>
        <div class="flex w-[29.5rem] flex-col bg-gray p-12">
          <strong class=" text-3xl font-semibold">W.E.L.L Center</strong>
          <b>"You Are Note Alone"</b>
          <div class="mt-6">
            <b>ศูนย์ให้คำปรึกษา คณะศึกษาศาสตร์ มศว</b>
            <p>The mental health counselors are ready to hear you</p>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-col">
              <b>เปิดให้บริการ</b>
              <b>เวลา</b>
              <b>สถานที่</b>
            </div>
            <div class="mx-2 flex flex-col">
              <p>วันจันทร์ - วันศุกร์</p>
              <p>10.00 - 16.30 น.</p>
              <p>มหาวิทยาลัยมหาวิทยาลัยศรีนครินทรวิโรฒ</p>
              <p>อาคารคณะศึกษาศาสตร์ ห้อง 408 ชั้น 4</p>
            </div>
          </div>
          <a
            href="www.facebook.com/Well.Center.SWU"
            class="text-primary mt-4 hover:underline"
            >ช่องทาง -&gt; www.facebook.com/Well.Center.SWU</a
          >
        </div>
        <div
          class="flex flex-1 flex-col items-center justify-center text-center font-semibold p-3 align-baseline"
        >
          <img src={wellcenterQr} class="py-3" alt="wellcenterQR" />
          ติดต่อสอบถามข้อมูลได้โดยการแสกน QR Code นี้
        </div>
        &nbsp;
      </div>
      <!-- WELLCENTER -->

      <!-- Facebook follow -->
      <div class="text-neutral mx-auto my-24 flex w-[80rem] flex-col">
        <div class="w-full border-b-2 border-black py-4">
          <p class="text-start text-2xl font-semibold">ติดตาม</p>
          <div
            class="mt-1 flex flex-row items-center justify-between align-baseline"
          >
            <p class="grow text-start">ช่องทางการติดตามและสอบถามเพิ่มเติม</p>
          </div>
        </div>
        <div
          class="grid grid-cols-2 px-24 pt-6 gap-4 justify-center items-center"
        >
          <a
            class="hover:scale-105"
            href="https://www.facebook.com/EDUCATIONSWU/"
            ><img src={fb1} alt="FBLINK1" /></a
          >
          <a
            class="hover:scale-105"
            href="https://www.facebook.com/profile.php?id=100057497767786"
            ><img src={fb2} alt="FBLINK2" /></a
          >
          <a
            class="hover:scale-105"
            href="https://www.facebook.com/edinternship/?locale=th_TH"
            ><img src={fb3} alt="FBLINK3" /></a
          >
          <a class="hover:scale-105" href="https://www.facebook.com/eduswu/"
            ><img src={fb4} alt="FBLINK4" /></a
          >
        </div>
      </div>
      <!-- Facebook follow -->
    </div>
  </div>

  <!-- Mobile Home page -->
  <div class="hero bg-center items-center align-middle text-center py-8 md:hidden">
    <h1>HelloWorld</h1>
  </div>
</div>
<!-- Hero Homepage -->

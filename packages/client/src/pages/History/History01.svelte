<script>
  import Banner from "./HistoryBanner.png";
  import Logo from "./GepLogo.png";
  import HeaderTitle from "./HeaderBgTitle.png";
  import Building from "./EDU_building.png";

</script>

<svelte:head>
  <title>History</title>
  <meta property="og:title" content="SWU" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="" />
  <meta property="og:image" content="" />
</svelte:head>

<div class="min-h-full bg-base-200">
  <div class="md:flex justify-center">
    <div class="ml-auto mr-auto py-8 max-w-sm block md:hidden">
      <div
        class="bg-[#2B3440] h-20 flex items-center rounded-2xl max-w-sm mr-auto ml-auto"
      >
        <h2
          class="text-[18px] md:text-3xl font-bold drop-shadow-md text-white ml-7 mr-7"
        >
          ประวัติภาควิชาแนะแนวและจิตวิทยาการศึกษา
        </h2>
      </div>
      <h2 class="text-[16px] font-bold drop-shadow-md mt-6">คณาจารย์</h2>
      <img src={Banner} alt="" class="mt-6 block md:max-w-xl" />
      <h2 class="text-[16px] font-bold drop-shadow-md mt-12">
        สัญลักษณ์ประจำภาควิชา
      </h2>
      <img src={Logo} alt="" class="mt-6 block md:max-w-xl ml-auto mr-auto" />
    </div>
    <div
      class="text-left max-w-sm py-8 md:max-w-md lg:max-w-3xl grid ml-auto mr-auto md:ml-0 md:mr-0"
    >
      <div
        class="bg-[#2B3440] h-20 md:flex items-center rounded-2xl hidden max-w-fit"
      >
        <h2
          class="text-[18px] md:text-3xl font-bold drop-shadow-md text-white ml-7 mr-7"
        >
          ประวัติภาควิชาแนะแนวและจิตวิทยาการศึกษา
        </h2>
      </div>
      <p class="py-6 indent-8 text-[16px]">
        <b>
          ในอดีตเริ่มจากสถาบันการศึกษาเป็นวิทยาลัยวิชาการศึกษา แผนกการแนะแนว
        </b> ปฏิบัติหน้าที่อยู่ในคณะวิชาการศึกษา ซึ่งเปิดดําเนินการสอนในระดับปริญญาโทสาขาการแนะแนว
        มาตั้งแต่ปีการศึกษา 2497 ต่อมาได้ขยายงานวิชาการเปิดสอนระดับปริญญาตรีและปริญญาโทและให้การบริการแนะแนวแก่นิสิตด้วย
        แต่เมื่อวิทยาลัยได้ยกฐานะเป็นมหาวิทยาลัยศรีนครินทรวิโรฒในปี พ.ศ. 2517 จึงมีการแบ่งส่วนราชการใหม่
        แผนกแนะแนวได้รับการเปลี่ยนเป็นภาควิชาการแนะแนวและจิตวิทยาการ ศึกษาคณะศึกษาศาสตร์
        ซึ่งรับผิดชอบเฉพาะงานด้านการเรียนการสอน ส่วนงานบริการแนะแนวนั้นได้โอนไปสังกัดกองกิจการนิสิต
      </p>
      <p class="py-6 indent-8 text-[16px]">
        งานด้านการเรียนการสอนของภาควิชาการแนะแนวและจิตวิทยาการศึกษา
        ในปัจจุบันเปิดสอนรายวิชาต่าง ๆ ของจิตวิทยาและการแนะแนวให้แก่นิสิต
        กล่าวคือ <b> ระดับปริญญาตรี </b>
        เปิดสอนทั้งวิชาเอกและวิชาโทการแนะแนว วิชาพื้นฐานซึ่งเป็นวิชาบังคับพื้นฐานให้แก่นิสิตทุกสาขาวิชาเอกและวิชาชีพครูหลายวิชา
        <b> ในระดับปริญญาโท </b> ให้บริการสอนวิชาพื้นฐานทางจิตวิทยาของการศึกษา
        โครงการเรียนการสอนสาขาวิชาจิตวิทยาการแนะแนว และสาขาวิชาจิตวิทยาการศึกษา
        ทั้งสองสาขาเปิดสอนทั้งภาคปกติและภาคพิเศษ สําหรับ <b> ระดับปริญญาเอก </b>
        เริ่มเปิดสอนสาขาวิชาจิตวิทยาการให้คําปรึกษาเป็นสถาบันแรกแห่งประเทศไทย โดยเปิดรับนิสิตรุ่นแรกเมื่อภาคเรียนที่
        2 ปีการศึกษา 2546 จํานวน 10 คน และเปิดรับนิสิตต่อมาในลักษณะปีเว้นปีนับเป็นเวลา
        50 กว่าปีที่ผ่านมา จะเห็นได้ว่าภาระงานของอาจารย์ในภาควิชาการแนะแนวและจิตวิทยาการศึกษามีการปฏิบัติงานอย่างต่อเนื่องเป็นประจํา
        ทั้งด้านการสอน การนิเทศนิสิตในระดับปริญญาตรี ปริญญาโทและปริญญาเอกตลอดจนการควบคุมปริญญานิพนธ์
        และงานสารนิพนธ์ของนิสิตค่อนข้างมาก
      </p>
      <p class="py-6 indent-8 text-[16px]">
        นอกจากงานหลักด้านการสอนแล้ว อาจารย์ในภาควิชา ฯ
        ปฏิบัติหน้าที่ภาคสนามด้านบริการสังคม ชุมชน การผลิตเอกสารตํารา
        วารสารทางวิชาการ
        ศึกษาข้อมูลงานวิจัยและงานส่งเสริมทํานุบํารุงศิลปวัฒนธรรม
        พร้อมกับภาระงานตามบทบาทของอาจารย์ในสถาบันอุดมศึกษา จึงกล่าวได้ว่าภาควิชา
        ฯ ได้ปฏิบัติหน้าที่ด้านวิชาการอย่างเต็มที่
      </p>
    </div>
    <div
      class="md:ml-10 lg:ml-20 mt-24 max-w-xl md:max-w-md lg:max-w-xl hidden md:block"
    >
      <h2 class="text-3xl font-bold drop-shadow-md">คณาจารย์</h2>
      <img src={Banner} alt="" class="py-6 block md:max-w-md lg:max-w-xl" />
      <h2 class="text-3xl font-bold drop-shadow-md mt-12">
        สัญลักษณ์ประจำภาควิชา
      </h2>
      <img
        src={Logo}
        alt=""
        class="py-6 block md:max-w-md lg:max-w-xl ml-auto mr-auto"
      />
    </div>
  </div>
  <div>
    <img src={Building} alt="" class="w-full" />
  </div>
</div>

<!-- 
  <div class="swap hover:swap-active">
  <img src={Img1} alt="" class="swap-off" />
  <img src={Img2} alt="" class="swap-on" />
</div>
 -->

<script>
  import Banner from "./HistoryBanner.png";
  import Logo from "../../assets/GEPSWU_Logo.png";
  import HeaderTitle from "./HeaderBgTitle.png";
  import Building from "./EDU_building.png";
  import BuildingHover from "./EDU_building_hover.jpg";

  import lang from "../../lib/lang";
</script>

<div class="min-h-full px-8 bg-base-100">
  <div class="md:flex justify-center">
    <!-- Mobile Header -->
    <div class="ml-auto mr-auto py-8 max-w-sm block md:hidden">
      <div
        class="bg-[#2B3440] h-fit py-4 flex items-center rounded-2xl max-w-sm mr-auto ml-auto"
      >
        <p
          class="text-[18px] md:text-3xl font-bold drop-shadow-md text-white ml-7 mr-7"
        >
          {lang() === "th"
            ? "ประวัติภาควิชาการแนะแนวและจิตวิทยาการศึกษา"
            : "History of the Department of Guidance and Educational Psychology"}
        </p>
      </div>
      <h2 class="text-[16px] font-bold drop-shadow-md mt-6">
        {lang() === "th" ? "คณาจารย์" : "Personnel"}
      </h2>
      <img src={Banner} alt="" class="mt-6 block md:max-w-xl" />
      <h2 class="text-[16px] font-bold drop-shadow-md mt-12">
        {lang() === "th" ? "สัญลักษณ์ประจำภาควิชา" : "Department Symbol"}
      </h2>
      <img src={Logo} alt="" class="mt-6 object-fill w-64 block md:max-w-xl ml-auto mr-auto" />
    </div>
    <div
      class="text-left max-w-sm py-8 md:max-w-md lg:max-w-3xl grid ml-auto mr-auto md:ml-0 md:mr-0"
    >
      <!-- PC HEADER -->
      <div
        class="bg-[#2B3440] h-fit py-4 md:flex items-center rounded-2xl hidden max-w-fit"
      >
        <h2
          class="text-[18px] md:text-3xl font-bold drop-shadow-md text-white ml-7 mr-7"
        >
          {lang() === "th"
            ? "ประวัติภาควิชาการแนะแนวและจิตวิทยาการศึกษา"
            : "History of the Department of Guidance and Educational Psychology"}
        </h2>
      </div>
      <!-- Body -->
      <p class="py-6 indent-8 text-[16px]">
        {@html lang() === "th"
          ? `<b> ในอดีตเริ่มจากสถาบันการศึกษาเป็นวิทยาลัยวิชาการศึกษา แผนกการแนะแนว
          </b> ปฏิบัติหน้าที่อยู่ในคณะวิชาการศึกษา ซึ่งเปิดดําเนินการสอนในระดับปริญญาโทสาขาการแนะแนว
          มาตั้งแต่ปีการศึกษา 2497 ต่อมาได้ขยายงานวิชาการเปิดสอนระดับปริญญาตรีและปริญญาโทและให้การบริการแนะแนวแก่นิสิตด้วย
          แต่เมื่อวิทยาลัยได้ยกฐานะเป็นมหาวิทยาลัยศรีนครินทรวิโรฒในปี พ.ศ. 2517 จึงมีการแบ่งส่วนราชการใหม่
          แผนกแนะแนวได้รับการเปลี่ยนเป็นภาควิชาการแนะแนวและจิตวิทยาการ ศึกษาคณะศึกษาศาสตร์
          ซึ่งรับผิดชอบเฉพาะงานด้านการเรียนการสอน ส่วนงานบริการแนะแนวนั้นได้โอนไปสังกัดกองกิจการนิสิต`
          : `<b>In the past, it started as an educational institution under the Department of Educational 
          Guidance</b>, which operated within the Faculty of Education, offering counseling programs at the 
          master's level, starting from the academic year 1954. Subsequently, its 
          academic activities expanded to offer undergraduate and graduate degree programs and provide 
          counseling services to students. However, when the college was elevated to Srinakharinwirot 
          University in the year 1974, there was a restructuring of administrative units. The Department 
          of Guidance was transformed into the Department of Guidance And Educational Psychology Faculty 
          of Education This department was assigned specific responsibilities in the area of teaching 
          and learning, while the counseling services were transferred to the Student Affairs Division.`}
      </p>
      <p class="py-6 indent-8 text-[16px]">
        {@html lang() === "th"
          ? `งานด้านการเรียนการสอนของภาควิชาการแนะแนวและจิตวิทยาการศึกษา
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
          และงานสารนิพนธ์ของนิสิตค่อนข้างมาก`
          : `In the present day, the Department of Guidance And Educational Psychology’s teaching responsibilities 
          encompass various courses in both psychology and counseling for students. This includes <b> undergraduate-level </b> 
          courses, offering both specialized and elective subjects in guidance and educational psychology. Additionally, 
          foundational courses, which are mandatory for students in all majors and teacher professional courses, are also taught.
          At the <b> graduate level </b>, the Department of Guidance And Educational Psychology provides teaching services for 
          foundational courses in educational psychology. The department offers programs in both counseling psychology 
          and educational psychology, and both branches are available in regular and special programs. The department began 
          offering the guidance psychology program for the <b> doctoral level </b> and became the first institution in Thailand to offer 
          this specialization. The first intake consisted of 10 students in the second semester of the academic year 2546. Subsequently, 
          student intake occurs every other year, and this tradition has continued for over 50 years. Throughout these years, the faculty 
          members in the Department of Guidance And Educational Psychology have been continuously dedicated to their duties. This includes 
          teaching, and advising students at the undergraduate, master's, and doctoral levels, as well as overseeing master's theses 
          and a significant number of doctoral dissertations.`}
      </p>
      <p class="py-6 indent-8 text-[16px]">
        {@html lang() === "th"
          ? `นอกจากงานหลักด้านการสอนแล้ว อาจารย์ในภาควิชา ฯ
          ปฏิบัติหน้าที่ภาคสนามด้านบริการสังคม ชุมชน การผลิตเอกสารตํารา
          วารสารทางวิชาการ
          ศึกษาข้อมูลงานวิจัยและงานส่งเสริมทํานุบํารุงศิลปวัฒนธรรม
          พร้อมกับภาระงานตามบทบาทของอาจารย์ในสถาบันอุดมศึกษา จึงกล่าวได้ว่าภาควิชา
          ฯ ได้ปฏิบัติหน้าที่ด้านวิชาการอย่างเต็มที่`
          : `In addition to their primary teaching responsibilities, faculty members in the Department also actively engage 
          in various fieldwork and community service activities. These include producing academic documents, contributing 
          to academic journals, conducting research, and promoting cultural heritage. They also fulfill their duties as 
          educators in higher education institutions.It can be concluded that the Department fully embraces its 
          academic responsibilities while actively engaging in a wide range of professional activities beyond the classroom.`}
        
      </p>
    </div>
    <div
      class="md:ml-10 lg:ml-20 mt-24 max-w-xl md:max-w-md lg:max-w-xl hidden md:block"
    >
      <h2 class="text-3xl font-bold drop-shadow-md">
        {lang() === "th" ? "คณาจารย์" : "Personnel"}
      </h2>
      <img src={Banner} alt="" class="py-6 block md:max-w-md lg:max-w-xl" />
      <h2 class="text-3xl font-bold drop-shadow-md mt-12">
        {lang() === "th" ? "สัญลักษณ์ประจำภาควิชา" : "Department Symbol"}
      </h2>
      <img
        src={Logo}
        alt=""
        class="py-6 block md:max-w-md lg:max-w-xl ml-auto mr-auto"
      />
    </div>
  </div>
  <div class="swap hover:swap-active transition-opacity duration-1000">
    <img src={Building} alt="" class="swap-off w-screen object-cover" />
    <img src={BuildingHover} alt="" class="swap-on w-screen object-cover" />
  </div>
</div>

<!-- 
 
  <div class="swap hover:swap-active transition-opacity duration-1000 ">
    <img src={Building} alt="gep swu building 1" class="swap-off w-screen object-cover" />
    <img src={Banner} alt="gep swu building 2" class="swap-on w-screen object-cover" />
  </div>
 -->

 <svelte:head>
    <title>ประวัติภาควิชา | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="ประวัติภาควิชา | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
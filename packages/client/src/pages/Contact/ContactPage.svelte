<script>
  import Map from "../../components/Map.svelte";
  import lang from "../../lib/lang";
  import metadata from "../metadata.json";

  let marker = {
    lat: 13.745338582850021,
    lng: 100.56419431162508,
    text: metadata.base.description,
    navigate:"https://www.google.com/maps/dir//%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B9%82%E0%B8%A3%E0%B8%92+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B9%82%E0%B8%A3%E0%B8%92+114+%E0%B8%8B.+%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%97+23+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%95%E0%B8%A2%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10110/@13.745205,100.5615699,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x30e29c3329e6aaef:0x4f1a7efa17dcd9df!2m2!1d100.5641448!2d13.7451998!3e0?entry=ttu"
  };
</script>

<div>
  <div class="flex flex-col-reverse md:grid md:grid-cols-2 grid-flow-row-dense h-full pt-0 md:p-16 md:pb-32">
    <div class="hover:shadow-sm hover:shadow-primary">
      <Map {marker} --map-height="30rem" />
    </div>
    <div class="mx-10 flex flex-col gap-4 justify-center py-12">
      <h3 class="text-2xl font-bold">{lang() === "th" ? "ติดต่อเรา" : "Contact us"}</h3>
      <p class="text-xl font-small">{lang() === "th" ? "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา" : "Department of Guidance and Educational Psychology."}</p>
      <p class="text-xl font-small">{lang() === "th" ? "ชั้น 4 คณะศึกษาศาสตร์" : "Floor 4, Faculty of Education"}</p>
      <p class="text-xl font-small">{lang() === "th" ? "มหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร" : "Srinakharinwirot University, Prasarnmit"}</p>
      <p class="text-xl font-small">
        <span />{lang() === "th" ? "เลขที่ 114 ซอยสุขุมวิท 23 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนากรุงเทพมหานคร 10110" 
        : "114 Sukhumvit Soi 23, Sukhumvit Road, Klongtoey Nua Sub-district, Wattana District, Bangkok 10110, Thailand"}
      </p>
      <a
        class="btn btn-primary text-xl"
        href={marker.navigate}
        >{lang() === "th" ? "นำทาง" : "Navigate"}</a
      >
    </div>
  </div>
</div>

<svelte:head>
    <title>ติดต่อเรา | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="ติดต่อเรา | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
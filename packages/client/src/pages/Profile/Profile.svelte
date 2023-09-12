<script>
  export let id = "";
  import PersonnelBannerProfile from "../../components/PersonnelBannerProfile.svelte";
  import Markdown from "../../components/Markdown.svelte";
</script>

<main>
  <PersonnelBannerProfile {id} />
  <div class="w-full flex justify-center">
    <Markdown path={id} sx="pt-12" />
  </div>
</main>


<svelte:head>
    <title>ประวัติบุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="ประวัติบุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
<script>
  import CreateForm from "../../../components/form/admin/Corousels/create.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";
</script>

<AdminProtect>
  <div class="m-24 justify-center">
    <CreateForm />
  </div>
</AdminProtect>

<svelte:head>
    <title>เพิ่มป้ายประกาศ | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="เพิ่มป้ายประกาศ | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
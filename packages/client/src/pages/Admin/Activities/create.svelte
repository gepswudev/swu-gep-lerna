<script>
  import CreateForm from "../../../components/form/admin/Activities/create.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";
</script>

<AdminProtect>
  <div class="m-24 justify-center">
    <CreateForm />
  </div>
</AdminProtect>

<svelte:head>
    <title>เพิ่มกิจกรรมนิสิต | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="เพิ่มกิจกรรมนิสิต | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
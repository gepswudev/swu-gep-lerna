<script>
  import UpdateForm from "../../../components/form/admin/Corousels/update.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";

  export let id;
</script>

<AdminProtect>
  <div class="m-24 justify-center">
    <UpdateForm {id} />
  </div>
</AdminProtect>

<svelte:head>
    <title>แก้ไขป้ายประกาศ | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="แก้ไขป้ายประกาศ | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
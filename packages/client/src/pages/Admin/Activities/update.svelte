<script>
  import UpdateForm from "../../../components/form/admin/Activities/update.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";

  export let id;
</script>

<AdminProtect>
  <div class="m-24 justify-center">
        <UpdateForm {id} />
      </div>
</AdminProtect>

<svelte:head>
    <title>แก้ไขกิจกรรมนิสิต | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="แก้ไขกิจกรรมนิสิต | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
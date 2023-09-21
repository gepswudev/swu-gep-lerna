<script>
    import CreateForm from "../../../components/form/admin/Personnels/create.svelte";
    import AdminProtect from "../../../components/admin/adminProtect.svelte";
  </script>
  
  <AdminProtect>
    <div class="m-24 justify-center">
      <CreateForm />
    </div>
  </AdminProtect>
  
  <svelte:head>
  <title>เพิ่มบุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
  <meta
    property="og:title"
    content="บุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
  />
  <meta
    property="og:description"
    content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
  />
  <meta property="og:url" content={window.location} />
</svelte:head>
<script>
  import metadata from "../pages/metadata.json";
  import logo from "../assets/Srinakharinwirot_University_Logo.png";
  export let basepath = "/";

  const pathDataVerify = (path) => {
    path = path.replace("/", "");
    if(path === "" || path.includes("/")) path = "base";
    if (eval(`metadata?.${path}?.title`) === undefined || eval(`metadata?.${path}?.description`) === undefined) {
      return basepath = "base";
    } else {
      return basepath = path;
    }
  };
  pathDataVerify(basepath);
</script>


<svelte:head>
  <title>{eval(`metadata?.${basepath}?.title`) ?? metadata.base.title}</title>
  <meta
    property="og:title"
    content={eval(`metadata?.${basepath}?.title`) ?? metadata.base.title}
  />
  <meta
    property="og:description"
    content={eval(`metadata?.${basepath}?.description`) ??
      metadata.base.description}
  />
  <meta property="og:url" content={window.location} />
  <meta property="og:image" content={logo} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา" />
  <meta property="og:locale" content="th_TH" />
  <meta property="og:locale:alternate" content="en_US" />
</svelte:head>

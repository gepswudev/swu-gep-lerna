<script>
  import metadata from "../pages/metadata.json";
  import logo from "../assets/GEPSWU_Logo.png";
  export let basepath = "/";

  const pathDataVerify = (path) => {
    basepath = basepath.replace("/", "");
    if(basepath === "") basepath = "base";
    if (eval(`metadata?.${basepath}?.title`) === undefined || eval(`metadata?.${basepath}?.description`) === undefined) {
      return "base";
    } else {
      return path;
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

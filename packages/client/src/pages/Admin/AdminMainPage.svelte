<script>
  import HorizonCard from "../../components/HorizonCard.svelte";
  import AdminProtect from "../../components/admin/adminProtect.svelte";
  import { user } from "../../store/user";
  const data = [
    {
      title: "Activities",
      desc: "Manage Ativities",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/008000/Activities",
      icon: "info",
      href: "/viewactivities",
    },
    {
      title: "Corousel Banners",
      desc: "Manage Banner Corousels",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/008000/Corousels",
      icon: "info",
      href: "/viewcorousels",
    },
    {
      title: "Personnel",
      desc: "Manage Personnel",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/008000/Personnel",
      icon: "info",
      href: "/personnels",
    },
    {
      title: "File System",
      desc: "Manage Files",
      img: "https://placeholder.pics/svg/500x200/DEDEDE/008000/File%20System",
      icon: "info",
      href: "/files",
    },
  ];
</script>

<AdminProtect>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col text-center">
      <div class="max-w-xl">
        <h2 class="text-5xl font-bold">Admin panel</h2>
        <p class="py-6">Welcome to {$user?.username} Admin panel</p>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 align-middle items-center self-auto text-center"
      >
        {#each data as d}
          <HorizonCard data={d} style="" popup={false} disabled={d.disabled} />
        {/each}
      </div>
    </div>
  </div>
</AdminProtect>

<svelte:head>
  <title>Admin | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
  <meta
    property="og:title"
    content="Admin | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
  />
  <meta
    property="og:description"
    content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
  />
  <meta property="og:url" content={window.location} />
</svelte:head>
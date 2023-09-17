<script>
    import { get, getPublic } from "../../lib/API/methods";
    import AdminProtect from "../../components/admin/adminProtect.svelte";
    import Swal from "sweetalert2";
  
    const files = get("pubfiles");
    let searchTerm = "";

    const downloadAllFile = () => {
        //confirm before download
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to download all file?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Download",
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(getPublic("pubfiles/all"), "_blank");
            }
        });
        // window.open(getPublic("pubfiles/all"), "_blank");
    };

    const downloadFile = (filename) => {
        //split and replace / with : to avoid error
        const file = filename.split("public/").pop().replace(/\//g, ":");
        return getPublic(`pubfiles/${file}`);     
    };
    
  </script>
  
  <AdminProtect>
    {#await files}
          <div class="m-24 justify-center">
            <h2 class="my-4 text-4xl font-bold text-center">Server Public File</h2>
            <div class="mockup-window border bg-base-100">
              <div class="flex justify-center px-4 py-16 bg-base-200">
                <table class="table">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th />
                      <th>File</th>
                      <th>Copy</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-base-200">
                      <th>0</th>
                      <td>Loading file...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {:then filedata}
          <div class="m-24 justify-center">
            <div class="flex flex-row justify-between mb-4">
                <h2 class="my-4 text-4xl font-bold text-center">Server Public Files ({filedata.size})</h2>
                <button class="btn btn-primary" title="Download all file as zip." on:click={downloadAllFile}>Download Backup All File</button>
            </div>
            {#if filedata.files.length === 0}
                <div class="flex flex-col justify-center px-4 py-16 pt-8 bg-base-200">
                    <h2 class="my-4 text-4xl font-bold text-center">No file found</h2>
                </div>
            {/if}
            
            
            <div class="mockup-window border border-primary bg-base-100">
              <div
                class="flex flex-col justify-center px-4 py-16 pt-8 bg-base-200"
              >
              <input
                bind:value={searchTerm}
                type="text"
                placeholder="Search file here"
                class="input input-bordered w-full mb-12"
              />
                <table class="table">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th />
                      <th>Folder</th>
                      <th>File</th>
                      <th>Type</th>
                      <!-- <th>Action</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    {#each filedata.files as data, index (index)}
                        {#if data.toLowerCase().includes(searchTerm.toLowerCase())}
                        <tr class="bg-base-200">
                            <th>{index+1}</th>
                            <th>{data.split("/")[data.split("/").length-2]}</th>
                            <td><a href={downloadFile(data)} class="hover:underline hover:text-primary" title="Click to download this file." >{data.split("/").pop()}</a></td>
                            <td>{data.split(".").pop() === "" ? "No extention" : data.split(".").pop().toUpperCase()}</td>
                      </tr>
                      {/if}
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {/await}
  </AdminProtect>
  
  <svelte:head>
    <title>การจัดการไฟล์ | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="การจัดการไฟล์ | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>
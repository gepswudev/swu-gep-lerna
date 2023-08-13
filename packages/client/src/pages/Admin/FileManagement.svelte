<script>
  import FileUpload from "../../components/form/admin/File/create.svelte";
  import File from "../../components//form/admin/File/file.svelte";
  import { get } from "../../lib/API/methods";
  import AdminProtect from "../../components/admin/adminProtect.svelte";

  const files = get("getfile");
  let searchTerm = "";
  function searchData(dataArray, searchTerm) {
    // Filter the dataArray based on the search term
    const filteredData = dataArray.filter((item) => {
      // Convert name and searchTerm to lowercase for case-insensitive search
      const itemName = item.name.toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();

      // Check if the name includes the search term
      return itemName.includes(lowerSearchTerm);
    });

    return filteredData;
  }
</script>

<AdminProtect>
  {#await files}
        <div class="m-24 justify-center">
          <h2 class="my-4 text-4xl font-bold text-center">File Management</h2>
          <FileUpload />

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
          <h2 class="my-4 text-4xl font-bold text-center">File Management</h2>
          <FileUpload />
          <div class="mockup-window border border-primary bg-base-100">
            <div
              class="flex flex-col justify-center px-4 py-16 pt-8 bg-base-200"
            >
              <input
                bind:value={searchTerm}
                type="text"
                placeholder="Search file here (You can search by File Name, File type, Created Date, Modified Date)"
                class="input input-bordered w-full mb-12"
              />
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th />
                    <th>File</th>
                    <th>Type</th>
                    <th>Upload At</th>
                    <th>Usage</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {#each filedata.data as data, index (index)}
                    {#if data.name.includes(searchTerm) || data.ext.includes(searchTerm) || data.modified.includes(searchTerm) || data.created.includes(searchTerm)}
                      <File {data} {index} />
                    {/if}
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      {/await}
</AdminProtect>

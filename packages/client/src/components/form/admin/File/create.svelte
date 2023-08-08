<script>
    import axios from "axios";
    import { post } from "../../../../lib/API/methods";
  
    const authorizedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  
    const handlerSubmit = () => {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      const title = formData.get("title");
      const desc = formData.get("desc");
      const img = formData.get("img");
      const href = formData.get("href");
      const badge = formData.get("badge");
      const data = {
        title,
        desc,
        img,
        href,
        badge,
      };
      post("upload", data, {
        "Content-Type": "multipart/form-data",
      })
        .then((res) => {
          alert(res.message);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  </script>
  
  <form class="form-control mx-32" on:submit|preventDefault={handlerSubmit}>
    <div class="mb-4">
      <label for="title" class="label">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        required
        class="input input-bordered w-full"
      />
    </div>
  
    <div class="mb-4">
      <label for="desc" class="label">Description</label>
      <textarea name="desc" id="desc" class="textarea textarea-bordered w-full" />
    </div>
  
    <div class="mb-4">
      <label for="img" class="label">Image</label>
      <input
        type="file"
        name="img"
        id="img"
        accept={authorizedExtensions.join(",")}
        required
        class="input input-bordered w-full"
      />
    </div>
  
    <div class="mb-4">
      <label for="href" class="label">Link</label>
      <input
        type="text"
        name="href"
        id="href"
        class="input input-bordered w-full"
      />
    </div>
  
    <div class="mb-4">
      <label for="badge" class="label">Badge</label>
      <input
        type="text"
        name="badge"
        id="badge"
        class="input input-bordered w-full"
      />
    </div>
  
    <div class="mt-6">
      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </form>
  
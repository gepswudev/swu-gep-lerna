<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { post } from "../../lib/API/methods";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: "",
      password: "",
      c_password:"",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Username is required")
        .max(16, "Username must be at most 16 characters"),
      password: yup
        .string()
        .required("Password is required")
        .test(
          "has-uppercase",
          "Password must contain at least one uppercase letter",
          (value) => /[A-Z]/.test(value)
        )
        .test(
          "has-number",
          "Password must contain at least one number",
          (value) => /\d/.test(value)
        )
        .test(
          "has-special-char",
          "Password must contain at least one special character (excluding & and |)",
          (value) =>
            /[!@#$%^*()\-_=+{}[\]:;"'<>,.?/\\]/.test(value) &&
            !/[&|]/.test(value)
        )
        .test(
          "length",
          "Password must be 8 to 16 characters long",
          (value) => value.length >= 8 && value.length <= 16
        ),
      c_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords do not match!")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      post("users/register", values)
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            alert(JSON.stringify(res.data));
          } else {
            alert(JSON.stringify(res.message));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
</script>

<form
  class="w-64 my-12 mx-auto p-4 space-y-4 bg-gray-100 border rounded shadow-md"
  on:submit|preventDefault={handleSubmit}
>
  <label for="username" class="font-bold">Username</label>
  <input
    id="username"
    name="username"
    type="text"
    on:change={handleChange}
    bind:value={$form.username}
    class="w-full p-2 border border-gray-300 rounded"
    placeholder="Enter your username"
  />
  {#if $errors.username}
    <p class="text-red-500">{$errors.username}</p>
  {/if}

  <label for="password" class="font-bold">Password</label>
  <input
    id="password"
    name="password"
    type="password"
    on:change={handleChange}
    bind:value={$form.password}
    class="w-full p-2 border border-gray-300 rounded"
    placeholder="Enter your password"
  />
  {#if $errors.password}
    <p class="text-red-500">{$errors.password}</p>
  {/if}

  <label for="password" class="font-bold">Confirm Password</label>
  <input
    id="c_password"
    name="c_password"
    type="password"
    on:change={handleChange}
    bind:value={$form.c_password}
    class="w-full p-2 border border-gray-300 rounded"
    placeholder="Confirm your password"
  />
  {#if $errors.c_password}
    <p class="text-red-500">{$errors.c_password}</p>
  {/if}
  <button
    type="submit"
    class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-red-400"
    disabled
    >Register</button
  ><p class="text-red-500">Register close for now</p>
</form>

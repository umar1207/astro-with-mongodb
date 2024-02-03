<!-- src/components/CreateUserForm.svelte -->

<script>

  import * as bcrypt from 'bcryptjs';

  const onSubmit = async (e) => {
    e.preventDefault();

    //get form data
    const formData = new FormData(e.target);
    const data = {};

    //iterate through form data
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    try {

      // send the hashed password to the server
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });

      // redirect to different page
      window.location.replace("/users");
    } catch (error) {
      alert("Oops. We failed.");
    }
  };

</script>

<form on:submit|preventDefault={onSubmit} style="text-align: center;">
  <br>
  <label for="name">Name</label>
  <input type="text" name="name" required />
  <br><br>

  <label for="email">Email</label>
  <input type="email" name="email" required />
  <br><br>

  <label for="password">Password</label>
  <input type="password" name="password" required />
  <br><br>

  <button type="submit">Submit</button>
</form>










<!-- src/components/CreateUserForm.svelte

<script>
  const onSubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = {};

    // Iterate through form data
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    // Hash the password using SubtleCrypto
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(data.password);
    const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
    const hashedPasswordArray = Array.from(new Uint8Array(hashedPasswordBuffer));
    const hashedPassword = hashedPasswordArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    data.password = hashedPassword;

    try {
      // Send the hashed password to the server
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });

      // Redirect to a different page
      window.location.replace("/users/create");
    } catch (error) {
      alert("Oops. We failed.");
    }
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <label for="name">Name</label>
  <input type="text" name="name" required />
  <br><br>

  <label for="email">Email</label>
  <input type="email" name="email" required />
  <br><br>

  <label for="password">Password</label>
  <input type="password" name="password" required />
  <br><br>

  <button type="submit">Submit</button>
</form>--->

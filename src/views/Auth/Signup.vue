<template>
  <div>
    <Navbar />
    <div class="page" style="display:flex;justify-content:center;align-items:center;padding:40px 0;">
      <div class="card" style="max-width:480px;width:100%;">
        <h2>Create an account</h2>

        <form @submit.prevent="submit">
          <div style="margin-bottom:10px;">
            <label>Full name</label>
            <input v-model="fullName" required />
          </div>

          <div style="margin-bottom:10px;">
            <label>Email</label>
            <input v-model="email" type="email" required />
          </div>

          <div style="margin-bottom:10px;">
            <label>Password</label>
            <input v-model="password" type="password" required minlength="6" />
          </div>

          <div style="margin-top:12px;">
            <button class="btn primary" type="submit">Sign up</button>
          </div>
        </form>

        <p style="margin-top:12px;">Already have an account? <a href="#" @click.prevent="$router.push({ name: 'Login' })">Login</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
export default {
  name: "Signup",
  components: { Navbar },
  data() {
    return { fullName: "", email: "", password: "" }
  },
  methods: {
    submit() {
      // Save user records under 'ticketapp_user' (overwrites previous; multiple users not tracked)
      const user = { fullName: this.fullName.trim(), email: this.email.trim().toLowerCase(), password: this.password };
      localStorage.setItem("ticketapp_user", JSON.stringify(user));
      // create session token
      localStorage.setItem("ticketapp_session", JSON.stringify({ email: user.email, name: user.fullName }));
      // notify other windows/tabs
      window.dispatchEvent(new Event("storage"));
      this.$router.push({ name: "Dashboard" });
    }
  }
}
</script>

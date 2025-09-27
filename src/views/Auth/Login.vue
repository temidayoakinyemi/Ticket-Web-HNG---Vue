<template>
  <div>
    <Navbar />
    <div class="page" style="display:flex;justify-content:center;align-items:center;padding:40px 0;">
      <div class="card" style="max-width:420px;width:100%;">
        <h2>Login</h2>

        <form @submit.prevent="submit">
          <div style="margin-bottom:10px;">
            <label>Email</label>
            <input v-model="email" type="email" required />
            <small v-if="errors.email" style="color:#ff6961">{{ errors.email }}</small>
          </div>

          <div style="margin-bottom:10px;">
            <label>Password</label>
            <input v-model="password" type="password" required />
            <small v-if="errors.password" style="color:#ff6961">{{ errors.password }}</small>
          </div>

          <div style="margin-top:12px;">
            <button class="btn primary" type="submit">Login</button>
          </div>

          <p v-if="error" style="color:#ff6961;margin-top:10px;">{{ error }}</p>
        </form>

        <p style="margin-top:12px;">No account? <a href="#" @click.prevent="$router.push({ name: 'Signup' })">Sign up</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
export default {
  name: "Login",
  components: { Navbar },
  data() {
    return { email: "", password: "", error: "", errors: {} };
  },
  methods: {
    submit() {
      this.errors = {};
      if (!this.email) this.errors.email = "Email is required.";
      if (!this.password) this.errors.password = "Password is required.";
      if (Object.keys(this.errors).length) return;

      const saved = JSON.parse(localStorage.getItem("ticketapp_user"));
      if (saved && saved.email === this.email.trim().toLowerCase() && saved.password === this.password) {
        localStorage.setItem("ticketapp_session", JSON.stringify({ email: saved.email, name: saved.fullName }));
        window.dispatchEvent(new Event("storage"));
        this.$router.push({ name: "Dashboard" });
      } else {
        this.error = "Invalid email or password. Please try again.";
      }
    }
  }
};
</script>

<template>
  <div class="navbar page">
    <div class="nav-left">
      <div class="brand" @click="goHome">
        <div class="logo"></div>
        <div style="font-weight:700;color:#fff">TicketWeb</div>
      </div>
    </div>

    <div class="nav-links">
      <router-link to="/" :class="{ active: isActive('/') }">Home</router-link>
      <router-link to="/dashboard" :class="{ active: isActive('/dashboard') }">Dashboard</router-link>
      <router-link to="/tickets" :class="{ active: isActive('/tickets') }">Tickets</router-link>
      <template v-if="session">
        <a href="#" @click.prevent="logout">Logout</a>
      </template>
      <template v-else>
        <router-link to="/auth/login">Login</router-link>
        <router-link to="/auth/signup">Sign up</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    session() {
      return !!localStorage.getItem("ticketapp_session");
    },
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    logout() {
      localStorage.removeItem("ticketapp_session");
      // make router guards react
      window.dispatchEvent(new Event("storage"));
      this.$router.push({ name: "Landing" });
    },
  },
};
</script>

<style scoped>
/* small tweaks already handled globally */
.navbar { align-items:center }
.nav-links a { color:#cfd6e2; text-decoration:none; padding:6px 10px; border-radius:8px }
</style>

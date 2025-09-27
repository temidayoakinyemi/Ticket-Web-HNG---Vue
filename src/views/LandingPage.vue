<template>
  <div>
    <Navbar />
    <div class="page">
      <section class="hero">
        <div class="inner">
          <h1 class="hero-title">Welcome to TicketWeb</h1>
          <p class="hero-subtitle">Manage your tickets easily — create, track, and resolve support requests with ease.</p>

          <div class="hero-buttons btns">
            <button class="btn primary" @click="goSignup">Get Started</button>
            <button class="btn secondary" @click="goLogin">Login</button>
          </div>
        </div>

        <div class="decor-circle"></div>
        <div class="decor-circle two"></div>

        <svg class="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill="#E3F2FD" d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,181.3C672,203,768,245,864,250.7C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224V320H0Z"></path>
        </svg>
      </section>

      <section class="features">
        <div class="feature">
          <h3>Fast Ticket Creation</h3>
          <p>Open new tickets instantly with our simple, user-friendly form.</p>
        </div>
        <div class="feature">
          <h3>Track Progress</h3>
          <p>Stay updated on the status of your tickets in real time.</p>
        </div>
        <div class="feature">
          <h3>Secure Login</h3>
          <p>Your session is protected and managed safely using localStorage tokens.</p>
        </div>
      </section>

      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "LandingPage",
  components: { Navbar, Footer },
  methods: {
    goSignup() { this.$router.push({ name: "Signup" }) },
    goLogin() { this.$router.push({ name: "Login" }) },
  }
};
</script>

<style scoped>
/* nothing here - global style.css covers layout */
</style>

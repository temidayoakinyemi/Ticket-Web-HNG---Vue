<template>
  <div>
    <Navbar />
    <div class="page" style="padding-top:28px;">
      <div class="card">
        <h2>Welcome, {{ user?.name || 'User' }}</h2>

        <div style="margin-top:16px;" class="row">
          <div class="card" style="flex:1;min-width:160px;">
            <h4>Total tickets</h4>
            <p style="font-size:20px;margin:6px 0">{{ total }}</p>
          </div>
          <div class="card" style="flex:1;min-width:160px;">
            <h4>Open</h4>
            <p style="font-size:20px;margin:6px 0">{{ open }}</p>
          </div>
          <div class="card" style="flex:1;min-width:160px;">
            <h4>In Progress</h4>
            <p style="font-size:20px;margin:6px 0">{{ inProgress }}</p>
          </div>
          <div class="card" style="flex:1;min-width:160px;">
            <h4>Closed</h4>
            <p style="font-size:20px;margin:6px 0">{{ closed }}</p>
          </div>
        </div>

        <div style="margin-top:20px;">
          <button class="btn primary" @click="$router.push({ name: 'Tickets' })">Manage Tickets</button>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Dashboard",
  components: { Navbar, Footer },
  data() { return { tickets: [] } },
  computed: {
    user() { return JSON.parse(localStorage.getItem("ticketapp_session")) },
    total() { return this.tickets.length },
    open() { return this.tickets.filter(t => t.status === "open").length },
    inProgress() { return this.tickets.filter(t => t.status === "in_progress").length },
    closed() { return this.tickets.filter(t => t.status === "closed").length },
  },
  created() {
    this.load();
    window.addEventListener("storage", this.load);
  },
  beforeUnmount() { window.removeEventListener("storage", this.load) },
  methods: {
    load() {
      this.tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    }
  }
};
</script>

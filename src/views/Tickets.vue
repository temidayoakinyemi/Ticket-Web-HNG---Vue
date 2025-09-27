<template>
  <div>
    <Navbar />
    <div class="page" style="padding-top:24px;">
      <div class="card column">
        <h2>Ticket Management</h2>

        <!-- Create / Edit form -->
        <form @submit.prevent="handleSave" style="display:flex;gap:12px;flex-wrap:wrap;">
          <input v-model="form.title" placeholder="Title" style="flex:2;min-width:200px" />
          <select v-model="form.status" style="width:160px">
            <option disabled value="">Select status</option>
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
          <input v-model="form.priority" placeholder="Priority (optional)" style="width:160px" />
          <input v-model="form.date" type="date" style="width:160px" />
          <button class="btn primary" type="submit">{{ editing ? "Update" : "Create" }}</button>
        </form>

        <div style="color:#ff6961;margin-top:8px" v-if="error">{{ error }}</div>
        <div style="color:#2e7d32;margin-top:8px" v-if="success">{{ success }}</div>

        <!-- Tickets list -->
        <div style="margin-top:18px;">
          <div v-if="!tickets.length">No tickets yet.</div>
          <div v-else class="column">
            <div v-for="t in tickets" :key="t.id" class="card" style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div style="font-weight:700">{{ t.title }}</div>
                <div style="font-size:13px;color:#6b7280">{{ t.description || '—' }}</div>
                <div style="margin-top:6px">
                  <span :class="'tag ' + t.status"> {{ t.status }} </span>
                  <small style="margin-left:8px;color:#9aa7b3">#{{ t.id }} • {{ t.date || 'no date' }}</small>
                </div>
              </div>

              <div style="display:flex;gap:8px">
                <button class="btn secondary" @click="startEdit(t)">Edit</button>
                <button class="btn" style="background:#ff6b6b;color:#fff" @click="remove(t.id)">Delete</button>
              </div>
            </div>
          </div>
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
  name: "Tickets",
  components: { Navbar, Footer },
  data() {
    return {
      tickets: [],
      form: { id: null, title: "", status: "", priority: "", date: "", description: "" },
      editing: false,
      error: "",
      success: ""
    };
  },
  created() {
    this.load();
    window.addEventListener("storage", this.load);
  },
  beforeUnmount() { window.removeEventListener("storage", this.load) },
  methods: {
    load() {
      this.tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    },
    saveAll() {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
      window.dispatchEvent(new Event("storage"));
    },
    handleSave() {
      this.error = ""; this.success = "";
      // validation
      if (!this.form.title || !this.form.status) {
        this.error = "Title and status are required. Status must be one of open, in_progress, closed.";
        return;
      }
      if (!["open","in_progress","closed"].includes(this.form.status)) {
        this.error = "Invalid status selected.";
        return;
      }

      if (this.editing) {
        const idx = this.tickets.findIndex(t => t.id === this.form.id);
        if (idx >= 0) { this.tickets.splice(idx, 1, { ...this.form }); this.success = "Ticket updated."; }
      } else {
        const id = Date.now().toString().slice(-6);
        this.tickets.unshift({ ...this.form, id });
        this.success = "Ticket created.";
      }
      this.saveAll();
      this.resetForm();
      setTimeout(()=> this.success = "", 2200);
    },
    startEdit(t) {
      this.form = JSON.parse(JSON.stringify(t));
      this.editing = true;
    },
    resetForm() {
      this.editing = false;
      this.form = { id: null, title: "", status: "", priority: "", date: "", description: "" };
    },
    remove(id) {
      if (!confirm("Delete this ticket?")) return;
      this.tickets = this.tickets.filter(t => t.id !== id);
      this.saveAll();
    }
  }
};
</script>

<style scoped>
.tag { padding:6px 10px; border-radius:10px; font-size:13px; color:#fff }
.tag.open { background:#2e7d32 }         /* green */
.tag.in_progress { background:#ffb300 } /* amber */
.tag.closed { background:#607d8b }      /* gray */
</style>

<template>
  <div class="page">
    <footer class="site-footer">
      <small>© {{ year }} TicketWeb — Built by Akinyemi Samuel Temidayo</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() { return { year: new Date().getFullYear() } }
}
</script>

<style scoped>
.site-footer { margin-top:40px; color:#6b7280 }
</style>

<template>
  <div style="margin-right: auto; margin-left: auto; display: block">
    <div class="spinner-border" role="status" v-if="isStoped === false">
      <span class="sr-only">Sedang memuat...</span>
    </div>
    <h4 class="text-center font-weight-bold" v-if="isStoped">
      Tidak ada data yang ditemukan
    </h4>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      isStoped: false
    }
  },
  async mounted() {
    setTimeout(() => {
      this.isStoped = true
    }, 5000)
  }
}
</script>

<style scoped>

</style>

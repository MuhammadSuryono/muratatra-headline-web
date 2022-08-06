<template>
  <div style="margin-right: auto; margin-left: auto; display: block">
    <div class="d-flex justify-content-center" v-if="isStoped === false">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
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

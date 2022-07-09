<template>
  <div>
    <div class="breadcrumb-wrap">
      <div class="container-fluid">
        <ul class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">News</a></li>
          <li class="breadcrumb-item active">News details</li>
        </ul>
      </div>
    </div>

    <div class="single-news">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8" v-if="content === null">
            Konten tidak tersedia
          </div>
          <div class="col-md-8" v-if="content !== null">
            <div class="sn-img">
              <img :src="content.image" />
            </div>
            <div class="sn-content">
              <a class="sn-title" href="">{{content.title}}</a>
              <a class="sn-date" href=""><i class="far fa-clock"></i>{{content.last_update}}</a>
              <p v-html="content.content"></p>
            </div>
          </div>

          <div class="col-md-4">
            <SidebarRight />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "read-news",
  data() {
    return {
      content: null
    }
  },
  methods: {
    async getContent() {
      try {
        let req = await this.$api.get(`news/${this.$route.params.id}`)
        this.content = req.data.data
        console.log(req.data.data)
      } catch (e) {
        console.warn(e)
      }
    }
  },
  async mounted() {
    await this.getContent()
  }
}
</script>

<style scoped>

</style>

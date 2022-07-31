<template>
  <div class="container">
    <div class="single-news">
      <div class="container-fluid">
        <ul class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item" v-if="content !== null"><NuxtLink :to="{path: `/category/${content.category_slug}`, params: { id: 1 }}">{{content.category_name}}</NuxtLink></li>
          <li class="breadcrumb-item active" v-if="content !== null">{{content.title}}</li>
        </ul>
        <div class="row">
          <div class="col-md-8" v-if="content === null">
            <Loading />
          </div>
          <div class="col-md-8" v-if="content !== null">
            <div class="sn-content">
              <NuxtLink class="sn-title" to="#" style="text-decoration: none">{{content.title}}</NuxtLink>
              <a class="sn-date" href="#" style="text-decoration: none">
                <i class="far fa-clock"></i>{{$convertDate(content.last_update)}} |
                <i class="far fa-user"/> {{content.updated_by}} |
                <i class="fa fa-tag"/> {{content.tags_string}}
              </a>

              <div class="social">
                <a :href="`https://twitter.com/share?text=${content.title}&url=${currentUrl}`" class="btn btn-info"><i class="fab fa-twitter"></i></a>
                <a :href="`https://www.facebook.com/dialog/feed?app_id=1806379142939079&display=popup&link=${currentUrl}`" class="btn btn-primary"><i class="fab fa-facebook"></i></a>
                <a :href="`https://api.whatsapp.com/send?text=${content.title} ${currentUrl}`" class="btn btn-success"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
            <div class="sn-img">
              <img alt="image" :src="content.image" />
            </div>
            <div class="sn-content">
              <p v-html="content.content"></p>
            </div>

            <div class="row">
              <div class="col-lg-8 col-md-8 col-sm-12">
                <NuxtLink :to="{path: `/tags/${tag.tag_id}`, params: { id: tag.tag_id }}" v-for="(tag, iTag) in content.tags" :key="iTag" class="mr-1">
                  <span class="badge badge-secondary">{{tag.tag_name}}</span>
                </NuxtLink>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="social" style="float: right" onclick="get">
                  Bagikan:
                  <a :href="`https://twitter.com/share?text=${content.title}&url=${currentUrl}`" class="btn btn-info"><i class="fab fa-twitter"></i></a>
                  <a :href="`https://www.facebook.com/dialog/feed?app_id=1806379142939079&display=popup&link=${currentUrl}`" class="btn btn-primary"><i class="fab fa-facebook"></i></a>
                  <a :href="`https://api.whatsapp.com/send?text=${content.title} ${currentUrl}`" class="btn btn-success"><i class="fab fa-whatsapp"></i></a>
                </div>
              </div>
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
      content: null,
      currentUrl: null
    }
  },
  methods: {
    async getContent() {
      try {
        this.$
        let req = await this.$api.get(`news/${this.$route.params.id}`)
        this.content = req.data.data
      } catch (e) {
        console.warn(e)
      }
    }
  },
  async mounted() {
    this.currentUrl = window.location.href
    await this.getContent()
  }
}
</script>

<style scoped>

</style>

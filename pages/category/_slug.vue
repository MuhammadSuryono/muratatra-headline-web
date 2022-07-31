<template>
  <div class="container">
    <div class="single-news">
      <div class="container-fluid">
        <ul class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item active" v-if="category !== null">{{category.name}}</li>
        </ul>
        <div class="row">
          <div class="col-md-8">
            <Loading v-if="contents.length === 0" />
            <div v-if="contents.length > 0">
              <div class="media flex-column flex-sm-row mt-0 mb-3 p-1 border-bottom" v-for="(content, iContent) in contents" :key="iContent">
                <div class="mr-sm-3 mb-2 mb-sm-0">
                  <div class="card-img-actions">
                    <NuxtLink :to="{path: `/read/${content.id}`, params: { id: content.id }}" data-abc="true">
                      <img :src="content.image" class="img-fluid img-preview rounded" alt="">
                    </NuxtLink>
                  </div>
                </div>

                <div class="media-body">
                  <h5 class="media-title">
                    <NuxtLink :to="{path: `/read/${content.id}`, params: { id: content.id }}" data-abc="true" class="mn-title">{{content.title}}</NuxtLink>
                  </h5>
                  <ul class="list-inline list-inline-dotted text-muted mb-2">
                    <li class="list-inline-item"><span class="badge badge-primary">{{content.category_name}}</span></li>
                  </ul>
                  <small class="text-muted">
                    <i class="far fa-clock"></i>{{$convertDate(content.last_update)}} |
                    <i class="far fa-user"/> {{content.updated_by}} |
                    <i class="fa fa-tag"/> {{content.tags_string}}
                  </small>
                  <p v-html="content.content" style="font-weight: normal"/>
                </div>
              </div>
              <div class="mr-auto ml-auto">
                <button class="btn btn-primary" style="margin-left: auto; margin-right: auto; display: block">Lihat Lainnya</button>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <SidebarRightCategory />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      contents : [],
      category: null
    }
  },
  methods: {
    getCategoryNews: async function () {
      try {
        let req = await this.$api.get(`news/category/${this.$route.params.slug}?splitContent=true`)
        this.contents = req.data.data
      } catch (e) {

      }

    },
    getCategory: async function () {
      try {
        let req = await this.$api.get(`category/slug/${this.$route.params.slug}`)
        this.category = req.data.data
      } catch (e) {

      }

    }
  },
  async mounted() {
    await this.getCategoryNews()
    await this.getCategory()
  }
}
</script>

<style scoped>
.img-preview {
  height: 12rem;
  max-width: 200px;
}
.mn-title {
  text-decoration: none !important;
  color: red;
}

.border-bottom {
  border-bottom: #3a3a3a solid medium;
}
</style>

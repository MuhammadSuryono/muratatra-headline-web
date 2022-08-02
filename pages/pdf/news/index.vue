<template>
  <div>
    <div class="bg-info-100 py-5">
      <div class="container">
        <p class="font-weight-bold mb-0">{{ dataItemActive.title }}</p>
        <span>
          Langganan paket Digital Premium Rp 50.000/bulan dan dapatkan
          akses ke 30 edisi terbaru ePaper.
        </span>
      </div>
    </div>

    <div class="container mt-2">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-link"
            href="#"
            v-for="(menuList, iMenuList) in tabLists"
            :key="iMenuList"
            :class="{ active: isActive(menuList.id) }"
            @click.prevent="setActiveItem(menuList)"
          >{{ menuList.title }}</a
          >
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane"
          v-for="(menuList, iMenuList) in tabLists"
          :key="iMenuList"
          :class="{ 'active show': isActive(menuList.id) }"
        >
          <div
            class="container my-3 d-flex justify-content-between align-items-center row"
          >
            <div class="col-lg-4 col-md-4 col-sm-12 mb-1">
              <span>Menampilkan {{totalData}} paper</span>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12">
              <div style="float: right">
                <div class="d-flex text-nowrap">
                  <div class="d-flex align-items-center">
                    <span>Tanggal Terbit:&nbsp;</span>
                    <select class="form-control mb-0">
                      <option selected>Hari ini</option>
                      <option value="1">Kemarin</option>
                    </select>
                  </div>
                  &nbsp;&nbsp;
                  <div class="d-flex align-items-center">
                    <span>Urutkan:&nbsp;</span>
                    <select class="form-control mb-0">
                      <option>Terbaru</option>
                      <option>Terlama</option>
                      <option>Terpopuler</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12" v-if="isLoad">
              <Loading />
            </div>
            <div
              class="col-md-3 mb-5"
              v-for="(newsList, iNewsList) in menuList.data"
              :key="iNewsList"
              v-if="!isLoad"
            >
              <NewsCard :title="newsList.title" :edition="newsList.id" :img="newsList.thumbnail" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCard from "@/components/home/NewsCard";
export default {
  name: "pdf-news",
  data() {
    return {
      paginationActive: {},
      isLoad: false,
      tabLists: [
        {
          id: "lastMonth",
          pathRequest : "koran/pdf",
          title: "30 hari Terakhir",
          description: "ePaper 30 Hari Terakhir",
          editionSpecial: null,
          data: []
        },
        {
          id: "archive",
          title: "Arsip ePaper",
          pathRequest : "koran/pdf",
          description: "Arsip ePaper",
          editionSpecial: null,
          data: [],
        },
        {
          id: "specialEdition",
          title: "Edisi Spesial",
          pathRequest : "koran/pdf",
          description: "Edisi Spesial",
          editionSpecial: 1,
          data: []
        },
        {
          id: "myPaper",
          title: "ePaper Saya",
          pathRequest : "koran/pdf",
          description: "ePapr Saya",
          editionSpecial: null,
          data: []
        },
      ],
      activeItem: "lastMonth",
      dataItemActive: {
        title: "",
        description: ""
      },
      totalData: 0
    };
  },
  methods: {
    async setActiveItem(item) {
      this.activeItem = item.id;
      item.data = [];
      await this.getDataPdf(item)
    },
    async getDataPdf(item) {
      this.dataItemActive = item;
      this.totalData = 0;
      this.isLoad = !this.isLoad
      try {
        let resp = await this.$api2.post(item.pathRequest, {
          "page" : "1",
          "limit" : 12,
          "start_date" : "2022-07-17",
          "end_date" : "2022-07-18",
          "sorting" : "desc",
          "is_special": item.editionSpecial
        })
        Array.prototype.push.apply(item.data, resp.data.data.pdf_news);
        this.totalData = item.data.length
        this.isLoad = !this.isLoad
      } catch (e) {
        this.isLoad = !this.isLoad
      }
    },
    isActive(item) {
      return this.activeItem === item;
    },
  },
  components: { NewsCard },
  async mounted() {
    let itemActive = null
    this.tabLists.forEach((item) => {
      if (item.id === this.activeItem) {
        itemActive = item;
      }
    })

    if (itemActive !== null) {
      await this.getDataPdf(itemActive)
    }
  }
};
</script>

<style>
.bg-info-100 {
  background-color: #17a3b870 !important;
}
</style>

<template>
  <div>
    <div class="bg-info-100 py-5">
      <div class="container">
        <p class="font-weight-bold mb-0">ePaper 30 Hari Terakhir</p>
        <span>
          Langganan paket Digital Premium Rp 50.000/bulan dan dapatkan
          akses ke 30 edisi terbaru ePaper.
        </span>
      </div>
    </div>

    <div class="container">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-link"
            href="#"
            v-for="(menuList, iMenuList) in tabLists"
            :key="iMenuList"
            :class="{ active: isActive(menuList.id) }"
            @click.prevent="setActiveItem(menuList.id)"
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
            class="container my-3 d-flex justify-content-between align-items-center"
          >
            <span>Menampilkan 12 paper</span>
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

          <div class="row">
            <div
              class="col-md-3 mb-5"
              v-for="(newsList, iNewsList) in menuList.data"
              :key="iNewsList"
            >
              <NewsCard :title="newsList.title" :img="newsList.image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCard from "../components/home/NewsCard.vue";
export default {
  name: "newsListPage",
  data() {
    return {
      tabLists: [
        {
          id: "archive",
          title: "Arsip ePaper",
          data: [
            {
              image: "https://via.placeholder.com/200x300",
              title: "Edisi tanggal 17 Agustus",
            },
            {
              image: "https://via.placeholder.com/200x300",
              title: "Edisi tanggal 16 Agustus",
            },
            {
              image: "https://via.placeholder.com/200x300",
              title: "Edisi tanggal 15 Agustus",
            },
            {
              image: "https://via.placeholder.com/200x300",
              title: "Edisi tanggal 14 Agustus",
            },
          ],
        },
        {
          id: "specialEdition",
          title: "Edisi Spesial",
        },
        {
          id: "myPaper",
          title: "ePaper Saya",
        },
      ],
      activeItem: "archive",
    };
  },
  methods: {
    setActiveItem(item) {
      this.activeItem = item;
    },
    isActive(item) {
      return this.activeItem === item;
    },
  },
  components: { NewsCard },
};
</script>

<style>
.bg-info-100 {
  background-color: #17a3b870 !important;
}
</style>

<template>
  <div>
    <TopNews />


    <!-- Main News Start-->
    <div class="main-news">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <LatestNews />
              <PopularNews />
            </div>
          </div>

          <div class="col-md-4">
            <SidebarRight />
          </div>
        </div>
      </div>
    </div>
    <!-- Main News End-->
  </div>
</template>

<script>
import TopNews from "~/components/home/TopNews";
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import LatestNews from "@/components/home/LatestNews";
import PopularNews from "@/components/home/PopularNews";

export default {
  name: "Home",
  data() {
    return {
      settingSlick: {
        "dots": false,
        "infinite": true,
        "autoplay": false,
        "arrows": true,
        "speed": 500,
        "slidesToShow": 1,
        "adaptiveHeight": true,
        "centerPadding": "100px",
        "edgeFriction": 0.35,
        "slidesToScroll": 1,
        "initialSlide": 0,
        "responsive": [
          {
            "breakpoint": 1024,
            "settings": {
              "slidesToShow": 3,
              "slidesToScroll": 1,
              "infinite": true,
              "dots": false
            }
          },
          {
            "breakpoint": 600,
            "settings": {
              "slidesToShow": 2,
              "slidesToScroll": 2,
              "initialSlide": 0
            }
          },
          {
            "breakpoint": 480,
            "settings": {
              "slidesToShow": 1,
              "slidesToScroll": 1
            }
          }
        ]
      },
      dataSlick: [
        {
          category_id: 1,
          category_name: 'Sports',
          data: [
            {
              id: 0,
              title: "Default Data",
              image: "http://127.0.0.1:8000/storage/files/1655007069.jpg",
              last_update: "2022-06-06"
            },

            {
              id: 0,
              title: "Default Data",
              image: "http://127.0.0.1:8000/storage/files/1655011501.jpg",
              last_update: "2022-06-06"
            }
          ]
        }
      ]
    }
  },
  components: {
    PopularNews,
    LatestNews,
    TopNews,
    VueSlickCarousel
  },
  methods: {
    loadModal: async function() {
      try {
        $('#modalConfirmation').modal('show')
      }catch (e) {
        console.log("Error", e)
      }
    }
  },
  async mounted() {
    // $('#exampleModal').modal('show')
  }
}
</script>

<style scoped>

</style>

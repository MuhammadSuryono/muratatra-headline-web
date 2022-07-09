<template>
  <div>
    <TopNews />

<!--    <div class="cat-news">-->
<!--      <div class="container-fluid">-->
<!--        <div class="row">-->
<!--          <div class="col-sm-12" :class="{'col-lg-12 col-md-12': dataSlick.length === 1, 'col-lg-6 col-md-6': dataSlick.length > 1}" v-for="(slick, iSlick) in dataSlick" :key="iSlick">-->
<!--            <h2><i class="fas fa-align-justify"></i>{{slick.category_name}}</h2>-->
<!--            <VueSlickCarousel v-bind="settingSlick">-->
<!--              <div class="cn-img mr-2" v-for="(data, iData) in slick.data" :key="iData">-->
<!--                <img :src="data.image" style="height: 510px;width:100%;object-fit: cover" />-->
<!--                <div class="cn-content">-->
<!--                  <div class="cn-content-inner">-->
<!--                    <a class="cn-date" href=""><i class="far fa-clock"></i>{{data.last_update}}</a>-->
<!--                    <a class="cn-title" href="">{{data.title}}</a>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </VueSlickCarousel>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

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
    <div class="modal fade" id="modalConfirmation" tabindex="-1" role="dialog" aria-labelledby="modalConfirmationLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalConfirmationLabel">Delete Confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you delete <span class="font-weight-bold text-danger text-uppercase"></span> data?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-sm" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger btn-sm" >Yes, Delete</button>
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
    await this.loadModal()
  }
}
</script>

<style scoped>

</style>

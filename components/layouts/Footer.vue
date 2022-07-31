<template>
  <div>
    <!-- Footer Start -->
    <div class="footer">
      <div class="container">
        <div class="row">

          <div class="col-lg-4 col-md-6">
            <div class="footer-widget">
              <h3 class="title">
                <img :src="company.logo" alt="logo" width="50%" />
              </h3>
              <div class="contact-info">
                <p><i class="fa fa-map-marker"></i>{{company.address}}</p>
                <p><i class="fa fa-envelope"></i>{{company.email}}</p>
                <p><i class="fa fa-phone"></i>{{company.phone}}</p>
                <div class="social">
                  <a target="_blank" :href="social.url_social_media" v-for="(social, iSocial) in company.social_medias" :key="iSocial"><i :class="social.icon"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="footer-widget">
              <h3 class="title">Profil</h3>
              <div class="newsletter">
                <p>
                  {{company.description}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer End -->

    <!-- Footer Bottom Start -->
    <div class="footer-bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-6 copyright">
            <p>Copyright &copy; {{company.company_name}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Bottom End -->
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    company: {
      default: {}
    }
  }
}
</script>

<style scoped>

</style>

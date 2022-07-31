<template>
  <div class="container">

    <div class="single-news">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8" >
            <h4>Appendix 1- Newspaper article examples</h4>

            <PdfViewer path="/webviewer" url="https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf" />
          </div>

          <div class="col-md-4">
            <SidebarRight  />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PdfViewer from "@/components/pdf/PdfViewer";
export default {
  name: "read",
  components: {PdfViewer},
  data() {
    return {
      publicPath: "http://localhost:3000/"
    }
  }
}
</script>

<style scoped>

</style>

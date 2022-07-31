<template>
  <div>
    <div id='webviewer' ref='viewer'></div>
  </div>
</template>

<script>

export default {
  name: "PdfViewer",
  props: {
    path: String,
    url: String,
    title: String
  },
  mounted() {
    import('@pdftron/webviewer').then(() => {

      WebViewer({
        path: this.path,
        initialDoc: this.url, // replace with your own PDF file
      }, this.$refs.viewer).then((instance) => {

        instance.UI.disableElements(['toolbarGroup-Shapes']);
        instance.UI.disableElements(['toolbarGroup-Edit']);
        instance.UI.disableElements(['toolbarGroup-Insert']);
      });
    })
  }
}
</script>

<style scoped>
#webviewer {
  height: 100vh;
}
</style>

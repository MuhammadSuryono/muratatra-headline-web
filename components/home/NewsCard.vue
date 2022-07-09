<template>
  <div style="width: 15rem">
    <img :src="img" width="100%" />
    <p class="my-4">{{title}}</p>
    <div>
      <button class="btn btn-primary w-100">Langganan</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["img", "title"],
};
</script>

<style scoped></style>

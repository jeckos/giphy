<template>
  <router-link
    :to="{ name: 'gifOne', params: { id: gif.id } }"
    class="gifs_card"
  >
    <v-lazy-image
      :src="
        gif.images.fixed_height.webp
          ? gif.images.fixed_height.webp
          : gif.images.fixed_height.url
      "
      :src-placeholder="gif.images.preview_gif.url"
    ></v-lazy-image>
    <p>{{ gif.title }}</p>
  </router-link>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
  name: "PostGif",
  props: {
    gif: {
      type: Object
    }
  },
  components: {
    VLazyImage
  }
};
</script>

<style scoped></style>

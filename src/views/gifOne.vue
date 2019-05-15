<template>
  <div class="about" v-if="gif.images">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>{{ gif.title }}</h2>
          <img
            :src="
              gif.images.original.webp
                ? gif.images.original.webp
                : gif.images.original.url
            "
            alt=""
          /><br />
          <router-link
            :to="{ name: 'Profile', params: { id: gif.username } }"
            >{{ gif.username }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gifOne",
  data() {
    return {
      gif: {}
    };
  },
  methods: {
    loadGif(id) {
      this.$store.dispatch("LOAD_GIF", id).then(gif => {
        this.gif = gif;
      });
    }
  },
  created() {
    this.loadGif(this.$route.params.id);
  }
};
</script>

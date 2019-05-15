<template>
  <div class="container">
    <div class="row" v-if="notFound.status">
      <img
        :src="notFound.data.images.original.webp"
        alt=""
        width="100%"
        height="100%"
      />
    </div>
    <transition-group name="company" tag="div" class=" row " v-else>
      <div class="col-4" v-for="gif in gifs" :key="gif.id">
          <PostGif :gif="gif"></PostGif>
      </div>
    </transition-group>
      <div class="loading" v-if="loading">
          <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M78.75 16.18V1.56a64.1 64.1 0 0 1 47.7 47.7H111.8a49.98 49.98 0 0 0-33.07-33.08zM16.43 49.25H1.8a64.1 64.1 0 0 1 47.7-47.7V16.2a49.98 49.98 0 0 0-33.07 33.07zm33.07 62.32v14.62A64.1 64.1 0 0 1 1.8 78.5h14.63a49.98 49.98 0 0 0 33.07 33.07zm62.32-33.07h14.62a64.1 64.1 0 0 1-47.7 47.7v-14.63a49.98 49.98 0 0 0 33.08-33.07z" fill="#000"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="-90 64 64" dur="600ms" repeatCount="indefinite"></animateTransform></g></svg>
      </div>
  </div>
</template>

<script>
    import PostGif from '@/components/PostGif'
export default {
  name: "Index",
  computed: {
    gifs() {
      return this.$store.getters.gifs;
    },
    loading() {
      return this.$store.getters.loading;
    },
    isSearch() {
      return this.$store.getters.isSearch;
    },
    notFound() {
      return this.$store.state.notFound;
    }
  },
  methods: {
    loadMore() {
      window.onscroll = event => {
        let wrapper = event.target,
          list = wrapper.firstElementChild || wrapper.firstChild;
        let scrollTop = window.pageYOffset || wrapper.documentElement.scrollTop,
          wrapperHeight = wrapper.documentElement.clientHeight,
          listHeight =
            list.offsetHeight || list.parentNode.documentElement.offsetHeight;
        let diffHeight = listHeight - wrapperHeight;
        if (
          diffHeight <= scrollTop + 100 &&
          !this.loading &&
          !this.notFound.status
        ) {
          this.$store.dispatch("SEARCH_GIFS", { scroll: true });
        }
      };
    }
  },
  components:{
    PostGif
  },
  created() {
    if (!this.isSearch) {
      this.$store.dispatch("LOAD_GIFS");
    }
    this.loadMore();
  }
};
</script>

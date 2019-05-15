<template>
    <div class="container">
        <div class="row" v-if="notFound.status">
            <img :src="notFound.data.images.original.webp" alt="" width="100%" height="100%">
        </div>
            <transition-group name="company" tag="div" class=" row " v-else>
                <div class="col-4" v-for="gif in gifs" :key="gif.id">
                    <router-link :to="{name: 'gifOne', params: { id: gif.id }}" class="gifs_card">
                        <v-lazy-image
                                :src="gif.images.fixed_height.webp? gif.images.fixed_height.webp : gif.images.fixed_height.url"
                                :src-placeholder="gif.images.preview_gif.url"
                        ></v-lazy-image>
                        <p>{{gif.title}}</p>
                    </router-link>
                </div>
            </transition-group>
    </div>
</template>

<script>
  import VLazyImage from "v-lazy-image";
  export default {
    name: 'Index',
    components: {
      VLazyImage
    },
    computed: {
      gifs() {
        return this.$store.getters.gifs
      },
      loading(){
        return this.$store.getters.loading
      },
      isSearch(){
        return this.$store.getters.isSearch
      },
      notFound () {
        return this.$store.state.notFound
      },
    },
    methods: {
      loadMore(){
          window.onscroll = ( event ) => {
            let wrapper = event.target,
              list = wrapper.firstElementChild || wrapper.firstChild;
            let scrollTop = window.pageYOffset || wrapper.documentElement.scrollTop,
              wrapperHeight = wrapper.documentElement.clientHeight,
              listHeight = list.offsetHeight || list.parentNode.documentElement.offsetHeight
            let diffHeight = listHeight - wrapperHeight;
            if ( diffHeight <= scrollTop + 100 && !this.loading && !this.notFound.status) {
              this.$store.dispatch ('SEARCH_GIFS', {scroll :true})
            }
          }
        }

    },
    created() {
      if(!this.isSearch){
        this.$store.dispatch('LOAD_GIFS')
      }
      this.loadMore()
    }
  }
</script>

<template>
    <div class="header">
        <div class="container">
            <div class="row align-items-center">
                <app-logo @click.native="home">Giphy</app-logo>
                <app-input class="header_search" v-model="search" @input="searchGifs($event)"/>
            </div>
        </div>
    </div>
</template>

<script>
  import AppLogo from '@/components/Logo'
  import AppInput from '@/components/Input'

  export default {
    name: 'Header',
    data(){
      return{
        search: '',
      }
    },
    methods:{
      home(){
        this.search = ''
        this.$store.commit('SET_QUERY', this.search)
        this.$store.dispatch("SEARCH_GIFS", {query:this.search})
      },
      searchGifs(event){
        this.$router.push({name: 'home'})
        this.$store.commit('SET_QUERY', event)
        this.$store.dispatch("SEARCH_GIFS", {query:event})
      }
    },
    components: {
      AppLogo,
      AppInput
    }
  }
</script>

<style scoped lang="scss">

</style>

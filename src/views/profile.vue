<template>
<div class="container">
    <div class="row">
        <div>
            <img :src="user.avatar_url" alt="">
            <p>{{user.username}}</p>
            <a :href="user.profile_url" target="_blank">Profile Giphy</a>
        </div>

    </div>
</div>
</template>

<script>
  export default {
    name: "profile",
    computed:{
      user(){
        return this.$store.state.userGif
      }
    }
  }
</script>

<style scoped>

</style>

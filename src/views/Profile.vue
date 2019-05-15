<template>
<div class="container">
    <div class="row justify-content-center" >
        <div class="col-4">
            <div class="user_block">
                <img :src="user.avatar_url" :alt="user.username">
                <p>{{user.username}}</p>
                <a :href="user.profile_url" target="_blank">Profile Giphy</a>
            </div>
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

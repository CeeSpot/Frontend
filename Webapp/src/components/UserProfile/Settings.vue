<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <user-menu v-bind:active="active"></user-menu>
        </b-row>
    </b-container>
</template>

<script>
  import UserMenu from '@/components/UserProfile/UserMenu';

  export default {
    name: "user-settings",
    components: {
      UserMenu
    },
    data() {
      return {
        active: "Settings"
      }
    }
  }
</script>

<style scoped>

</style>
<template>
    <b-container style="margin-top: 150px;">
    
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import CommunityApi from '@/services/api/community.js'
  //import AdminEventApi from '@/services/api/admin/events.js'
  import moment from 'moment'
  import ActionButton from '@/components/Core/Other/ActionButton'

  export default {
    name: "user",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
          user: {}
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      }
    },
    mounted() {
      console.log(this.$route.params.id);
    }
  }
</script>

<style scoped>
    .user-list-item {
        margin-top: 15px;
        cursor: pointer;
    }

    .user-list-item:first-of-type {
        margin-top: 0;
    }

    .user-card {
        border-radius: 4px;
        padding: 20px;
        background-color: white;
    }

    .user-card:hover {
        background-color: #E60000;
        color: white;
    }
    .fab {
    border: none;
    font-size: 22px;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;
    -webkit-box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, .3);
    box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, .3);
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    cursor: pointer;
}

.red{
    background: #E60000;
}

.red:hover{
    background: #FF2C2C;
}
</style>

<template>
    <b-col md="12" class="user-card shadow" v-on:click="navigateTo(target)">
        <b-row>
            <b-col md="4">{{firstcol}}</b-col>
            <b-col md="4">{{secondcol}}</b-col>
        </b-row>
    </b-col>
</template>

<script>
  export default {
    name: "admincard",
    props: ['firstcol', 'secondcol', 'target'],
    methods: {
        navigateTo(target){
            this.$router.push(target)
        }
    },
  }
</script>

<style scoped>
    .user-card {
        border-radius: 4px;
        padding: 20px;
        background-color: white;
        cursor: pointer;
    }

    .user-card:hover {
        background-color: #E60000;
        color: white;
    }
</style>
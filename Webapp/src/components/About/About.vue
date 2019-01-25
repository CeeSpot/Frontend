<template>
    <b-container style="margin-top: 150px;">
        <div style="width: 100%; height: 100%; font-size: 1.125em;" class="card shadow no-scale">
            <b-row>
                <b-col class="p-5">
                    <h1>About the cee spot</h1>
                    <div v-html="text"></div>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
  import websiteApi from '@/services/api/website.js'
  export default {
    name: "about",
    data() {
        return {
            text: ''
        }
    },
    mounted() {
        websiteApi.getOneText(1).then(response => {
          if(this.language === "en") {
            this.text = response.data.data[0].value_en;
          } else {
            this.text = response.data.data[0].value_nl;
          }
         })
    }
  }
</script>

<style scoped>

</style>
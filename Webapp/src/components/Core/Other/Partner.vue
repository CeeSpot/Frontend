<template>
  <b-col lg="3" md="4" sm="6" cols="12" class="partner">
    <img :src="img" class="img-responsive">
    <b-row>
      <b-col class="partner-bigger">
        <b>{{nameDutch}}</b>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="partner-smaller">
        {{nameEn}}
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "Partner",
  props: ['img', 'nameEn', 'nameDutch']
}
</script>

<style scoped>
  .partner{
    margin-top: 40px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .img-responsive{
    width: 100%;
    height: auto;
    /*-webkit-filter: grayscale(100%); !* Safari 6.0 - 9.0 *!*/
    /*filter: grayscale(100%);*/
  }
  .partner-bigger{
    font-size: 18px;
    line-height: 45px;
  }
  .partner-smaller{
    font-size: 15px;
  }
</style>

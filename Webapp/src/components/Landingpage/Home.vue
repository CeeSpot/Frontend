<template>
  <div>
    <div id="pizza" class="pizza">hai</div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>CeeSpot</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Landingpage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    axios.post('http://localhost:3000/example', 'data').then(res => {
      document.getElementById('pizza').innerText = JSON.stringify(res.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col{
    background: #000;
    border:1px solid green;
    color: #fff;
  }
</style>

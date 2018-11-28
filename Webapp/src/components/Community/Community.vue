<template>
<div class="padding-div">

    <div class="container-search-toggle">
        <div class="search-bar float-left">
            <b-input-group>
                <b-form-input placeholder="Search..."></b-form-input>
                <b-input-group-append>
                    <b-btn class="search-button-color"><font-awesome-icon icon="search"/></b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>

        <div class="toggle float-right">
         <div class="switch">
            <input type="radio" class="switch-input" name="view" value="week" id="week" checked>
            <label for="week" class="switch-label switch-label-off">&nbsp;Members </label>
            <input type="radio" class="switch-input" name="view" value="month" id="month">
            <label for="month" class="switch-label switch-label-on">&nbsp;Companies</label>
            <span class="switch-selection"></span>
         </div>
        </div>
    </div>

    <div class="tags">
    </div>

    <div class="cards">
        <b-card v-for="companie in companies"
            :key="companie.id"
            :title="companie.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
        <p class="card-text">
            {{companie.description}}
        </p>
        </b-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Community',
  data () {
    return {
      companies: []
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/companies', 'data').then(res => {
      this.companies = res.data
    })
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.padding-div{
    padding: 100px;
}

.search-button-color{
    background-color: #E60000;
}

.search-bar{
    width: 15%;
}

.container-search-toggle{
    overflow: hidden;
}

.switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
}

.switch input {
    display:none;
}

.toggle{
    position: relative
}

.toggle .switch {
  position: absolute;
  margin: 20px auto;
  height: 30px;
  border-radius:5px;
  width: 130px;
  top:-20px;
  right:0;
  background-color:white;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.15) !important;
}

.switch-label {
  position: relative;
  z-index: 2;
  float: left;
  width: 58px;
  line-height: 26px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
  cursor: pointer;
  font-size:12px;
  padding-top:2px;
}
.switch-label:active {
  font-weight: bold;
}

.switch-label-off {
  padding-left: 1px;
}

.switch-label-on {
  padding-right: 4px;
}

.switch-input {
  display: none;
}
.switch-input:checked + .switch-label {
  font-weight: bold;
  color:white;
  text-shadow: 0 1px rgba(255, 255, 255, 0.25);
  -webkit-transition: 0.15s ease-out;
  -moz-transition: 0.15s ease-out;
  -o-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
}
.switch-input:checked + .switch-label-off ~ .switch-selection{
  width: 54px;
  left: 5px;
}
.switch-input:checked + .switch-label-on ~ .switch-selection {
  left: 57px;
  width: 70px;
  /* Note: left: 50% doesn't transition in WebKit */
}
.switch-input:checked + .switch-label-3~ .switch-selection{
  width: 80px;
  left: 114px;
}

.switch-selection {
  display: block;
  position: absolute;
  z-index: 1;
  top: 4px;
  left: 4px;
  width: 58px;
  height: 22px;
  background: #E60000;
  border-radius: 5px;
  -webkit-transition: left 0.15s ease-out;
  -moz-transition: left 0.15s ease-out;
  -o-transition: left 0.15s ease-out;
  transition: left 0.15s ease-out;
}
</style>

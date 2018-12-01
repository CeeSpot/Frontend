<template>
<b-container>
   <b-row class="search-toggle-container">
        <b-col md="4">
          <div>
              <b-input-group>
                  <b-form-input v-model="search" placeholder="Search..." ></b-form-input>
                  <b-input-group-append>
                      <b-btn class="search-button-color"><font-awesome-icon icon="search"/></b-btn>
                  </b-input-group-append>
              </b-input-group>
          </div>
        </b-col>
        <b-col md="3" offset-md="5">
          <div class="toggle">
            <div class="switch">
                <input type="radio" class="switch-input" v-on:change="toggle('members')" name="view" value="week" id="week" checked>
                <label for="week" class="switch-label switch-label-off">&nbsp;Members </label>
                <input type="radio" class="switch-input" v-on:change="toggle('companies')" name="view" value="month" id="month">
                <label for="month" class="switch-label switch-label-on">&nbsp;Companies</label>
                <span class="switch-selection"></span>
            </div>
          </div>
        </b-col>
    </b-row>

    <b-row>
    <!-- Tagrow -->
    </b-row>
    <b-row v-if="showMembers">
          <b-col md="4" v-for="user in userList" :key="user.id">
            <b-card
                :key="user.id"
                :title="fullName(user.first_name, user.insertions, user.last_name)"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article">
              <p class="card-text">
                  {{descriptionLimited(user.description)}}
              </p>
            </b-card>
          </b-col>
      </b-row>
    <b-row v-if="!showMembers">
          <b-col md="4" v-for="company in companyList" :key="company.id">
            <b-card
                :key="company.id"
                :title="company.name"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article">
              <p class="card-text">
                  {{descriptionLimited(company.description)}}
              </p>
            </b-card>
          </b-col>
      </b-row>
</b-container>
</template>

<script>
import CommunityApi from '@/services/api/community.js'
export default {
  name: 'Community',
  data () {
    return {
      companies: [],
      users: [],
      showMembers: true,
      search: ''
    }
  },
  mounted () {
    CommunityApi.getUsers().then(response => {
        console.log("hi");
        this.users = response.data.message
    })
    CommunityApi.getCompanies().then(response => this.companies = response.data)
  },
  methods: {
    toggle : function(value) {
      if(value === 'members') { this.showMembers = true }
      else { this.showMembers = false }
    },
    fullName: function(first_name, insertion, last_name) {
      let full_name;
      if(insertion){
          full_name = first_name + ' ' + insertion + ' ' + last_name;
      } else {
          full_name = first_name + ' ' + last_name;
      }
      return full_name;
    },
    descriptionLimited: function(description){
        return description.length > 100 ? description.substring(0,100) + '...' : description;
    }
  },
  components: {
  },
  computed: {
    userList() {
      return this.users.filter(user => {
        return this.fullName(user.first_name, user.insertions, user.last_name).toLowerCase().includes(this.search.toLowerCase())
      })
    },
    companyList() {
      return this.companies.filter(company => {
        return company.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-div{
    margin-top: 56px;
}

.search-button-color{
    background-color: #E60000;
}

.card-img-top{
    display:block;
    margin:auto;
    margin-top: 25px;
    border-radius: 50%;
    height: 145px;
    width: 145px;
}

.card-title{
  text-align: center;
}

.card-text{
  text-align: center;
}

.search-toggle-container{
  margin-top: 130px;
  margin-bottom: 30px;
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
  width: 150px;
  top:-20px;
  right:0;
  background-color:white;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.15) !important;
}

.switch-label {
  position: relative;
  z-index: 2;
  float: left;
  width: 72px;
  line-height: 26px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  cursor: pointer;
  font-size:12px;
  padding-top:2px;
}
.switch-label:active {
  /*font-weight: bold;*/
}

.switch-label-off {
  padding-left: 2px;
}

.switch-label-on {
  padding-right: 4px;
}

.switch-input {
  display: none;
}
.switch-input:checked + .switch-label {
  /*font-weight: bold;*/
  color:white;
  -webkit-transition: 0.15s ease-out;
  -moz-transition: 0.15s ease-out;
  -o-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
}
.switch-input:checked + .switch-label-off ~ .switch-selection{
  width: 65px;
  left: 5px;
}
.switch-input:checked + .switch-label-on ~ .switch-selection {
  left: 70px;
  width: 75px;
  /* Note: left: 50% doesn't transition in WebKit */
}
.switch-input:checked + .switch-label-3~ .switch-selection{
  width: 100px;
  left: 114px;
}

.switch-selection {
  display: block;
  position: absolute;
  z-index: 1;
  top: 4px;
  left: 4px;
    padding-left: 10px;
    padding-right: 10px;
  width: 78px;
  height: 22px;
  background: #E60000;
  border-radius: 5px;
  -webkit-transition: left 0.15s ease-out;
  -moz-transition: left 0.15s ease-out;
  -o-transition: left 0.15s ease-out;
  transition: left 0.15s ease-out;
}
</style>

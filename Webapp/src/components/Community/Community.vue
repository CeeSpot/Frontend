<template>
<b-container>
   <b-row class="search-toggle-container">
        <b-col md="4">
          <div>
              <b-input-group class="form-group-search">
                  <b-form-input v-model="search" placeholder="Search..." class="form-control"></b-form-input>
                  <span class="form-control-icon">
                      <font-awesome-icon icon="search" class="search-color"/>
                  </span>
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
    <b-col style="margin-bottom: 30px;">
                                <ul>
                                    <li v-for="tag in tags">
                                        <div v-bind:id="tag.id" v-on:click="updateSelectedTag(tag.id)" class="btn-ceecee-oval-red">{{tag.description}}</div>
                                    </li>
                                </ul>
                            </b-col>
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
import TagApi from '@/services/api/tags.js'
import Tag from '@/components/Core/Other/Tag' // Import the navigation into the base app

export default {
  name: 'Community',
  data () {
    return {
      companies: [],
      users: [],
      tags: [],
      showMembers: true,
      selectedTag: 0,
      search: ''
    }
  },
  mounted () {
    CommunityApi.getUsers().then(response => this.users = response.data.message)
    CommunityApi.getCompanies().then(response => this.companies = response.data)
    TagApi.getTags().then(response => this.tags = response.data)
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
      if(description){
        if (description.length > 100) {
          return description.substring(0,100) + '...'
        } else {
          return description
        }
        return '';
      }
    },
    containsTag: function(user){
      return false;
    },
    updateSelectedTag: function(id){
      this.selectedTag = id
    }
  },
  components: {
  },
  computed: {
    userList() {
      return this.users.filter(user => {
        return (this.fullName(user.first_name, user.insertions, user.last_name).toLowerCase().includes(this.search.toLowerCase()) ||
        this.containsTag(user)
        )
      })
    },
    companyList() {
      return this.companies.filter(company => {
        return company.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    selectedTagId(){
      return this.selectedTag;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-div{
    margin-top: 56px;
}

.search-color{
    color: #E60000;
    font-size: 25px;
}

.form-group-search .form-control {
    padding-left: 0rem;
}

.form-group-search .form-control-icon {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    right: 5px;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    padding-top: 5px;
    pointer-events: none;
    color: #aaa;
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

ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    li {
        float: left;
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
  padding-left: 2px;
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

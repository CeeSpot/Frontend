<template>
    <div>
        <b-container id="userContainer">
            <b-row>
                <b-col md="8" id="userDesc">
                    <div class="bg-white box-shadow">
                        <b-row>
                            <b-col id="userProfileCol">
                                <b-row>
                                    <div id="image-container">
                                        <b-img style="width: 150px;" rounded="circle"
                                               v-bind:src="'/static/images/users/' + user.user.id + '.png'"
                                               class="box-shadow"></b-img>
                                    </div>
                                </b-row>
                                <b-row>
                                    <b-col class="text-justify" id="userInformation">
                                        <h1 class="text-center">{{ user.user.first_name + ' ' + user.user.last_name }}</h1>
                                        <p>{{ user.user.description }}</p>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col style="min-height: 50px; padding: 25px;">
                                <ul>
                                    <li v-for="tag in tags">
                                        <tag v-bind:id="tag.id" v-bind:name='tag.name'></tag>
                                    </li>
                                </ul>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col cols="4" style="padding: 25px;" class="company-images">
                    <div class="bg-white box-shadow" style="padding: 20px;">
                        <b-row v-for="company in user.user.companies">
                            <b-col>
                                <b-img fluid v-bind:src="'/static/images/companies/' + company.id + '.png'"></b-img>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import CommunityApi from '@/services/api/community.js'
  import Tag from '@/components/Core/Other/Tag' // Import the navigation into the base app

  export default {
    name: 'User',
    data() {
      return {
        user: {
          success: false,
          user : {
            first_name: '',
            last_name: '',
            description: '',
            companies: []
          }
        },
        tags: [
          {
            id: 0,
            name: 'PHP'
          },
          {
            id: 1,
            name: 'MySQL'
          }
        ]
      }
    },
    mounted() {
      CommunityApi.getUser(this.id).then(response => this.user = response.data);
    },
    created() {
      this.id = this.$route.params.id;
    },
    components: {
      Tag
    }
  }
</script>

<style>
    body {
        background-color: #ededed;
    }

    .box-shadow {
        box-shadow: 0 3px 5px #d2d2d2;
    }

    #image-container {
        width: 100%;
        text-align: center;
        margin-top: -100px;
        padding-bottom: 20px;
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

    #userInformation {
        padding-left: 25px;
        padding-right: 25px;
    }

    #userContainer {
        margin-top: 200px;
    }

    #userDesc {
        padding: 25px;
    }

    #userProfileCol {
        margin-top: 20px;
    }
</style>

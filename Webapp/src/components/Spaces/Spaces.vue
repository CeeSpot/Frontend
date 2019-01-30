<template>
  <b-container style="margin-top: 140px;">
    <b-row>
      <b-col md="12">
        <h1>{{$t('spaces.spaces')}}</h1>
        <div v-html="text"></div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col v-for="space in spaces" lg="4" md="6" sm="6" cols="12">
        <b-card v-on:click="routeToSpace(space.id, space.title)">
          <img :id="'spacepic' + space.id"
               class="card-img-top"
               :alt="'Image ' + space.title"
               :src="getImage(space.id, 'space' , 'spaces')">
          <div class="pl-3 pr-3">
            <h4 class="card-title">{{space.title}}</h4>
            <b-row>
              <b-col md="12">
                <p class="card-text">
                  {{space.short_description}}
                </p>
              </b-col>
            </b-row>
            <hr>
            <b-row class="text-center">
              <b-col md="4">
                <font-awesome-icon icon="users"/>
                {{space.capacity}}
              </b-col>
              <b-col md="8">
                &euro; {{space.costs}}
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SpaceApi from '@/services/api/spaces.js'
import websiteApi from '@/services/api/website.js'
import uploadFile from '@/services/api/uploadFile.js'

export default {
  name: 'Spaces',
  data() {
    return {
      search: '',
      spaces: [],
      text: ''
    }
  },
  methods: {
    getImage(id, kind, type) {
      uploadFile.checkIfFileExists(this.imageBaseURL + '/' + type + '/' + id + '.jpg')
        .then((res) => {
          document.getElementById(kind + 'pic' + id).src = this.imageBaseURL + '/' + type + '/' + id + '.jpg'
          console.log(document.getElementById(kind + 'pic' + id).src)
        })
        .catch((err) => {
          document.getElementById(kind + 'pic' + id).src = '/static/images/header.jpg'
        });
    },
    routeToSpace(id, title) {
      title = title.replace(/\s+/g, '-').toLowerCase();
      this.$router.push({path: '/spaces/' + id + '/' + title})
    }
  },
  mounted() {
    SpaceApi.getSpaces().then(response => {
      if (!response.data.success) {
        this.$toasted.show('Failed load spaces try again later',
          {
            position: 'top-center',
            duration: 3000
          }
        )
      }
      this.spaces = response.data.data
    }).catch((err) => {
          this.$toasted.show('Something went wrong, please try again',
              {
                position: 'top-center',
                duration: 3000
              }
          )
      });
    websiteApi.getOneText(8).then(response => {
      if (this.language === "en") {
        this.text = response.data.data[0].value_en;
      } else {
        this.text = response.data.data[0].value_nl;
      }
    })
  },
  computed: {
    spaceList() {
      return this.spaces.filter(space => {
        return space.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col {
    background: #000;
    border: 1px solid green;
    color: #fff;
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

  .search-color {
    color: #E60000;
    font-size: 25px;
  }

  p{
      min-height: 120px;
  }

  .card-body {
    padding: 0 !important;
  }

  .card-img-top {
    display: block;
    margin: 0 auto 10px;
    height: 205px;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
    /*width: 145px;*/
  }
</style>

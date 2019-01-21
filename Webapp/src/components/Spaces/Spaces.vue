<template>
    <b-container style="margin-top: 140px;">
        <b-row>
            <b-col md="12">
                <h1>Spaces</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum distinctio doloremque doloribus
                    excepturi fugiat iusto nobis nostrum odit quaerat quidem quo recusandae saepe, tempora. Animi
                    delectus deleniti enim error provident!</p>
            </b-col>
        </b-row>
        <!--<b-row class="search-toggle-container">
            <b-col md="4">
                <div>
                    <b-input-group class="form-group-search">
                        <b-form-input v-model="search" placeholder="Zoeken..."
                                      class="form-control"></b-form-input>
                        <span class="form-control-icon">
                      <font-awesome-icon icon="search" class="search-color"/>
                  </span>
                    </b-input-group>
                </div>
            </b-col>
            </b-row> -->

        <b-row class="mt-3">
            <b-col v-for="space in spaces" md="4">
                <b-card
                        v-on:click="routeToSpace(space.id)"
                        :title="space.title"
                        img-src="https://picsum.photos/600/300/?image=1"
                        img-top
                >
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
                            <font-awesome-icon icon="users"/> {{space.capacity}}
                        </b-col>
                        <b-col md="8">
                            &euro; {{space.costs}}
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import SpaceApi from '@/services/api/spaces.js'

export default {
  name: 'Spaces',
  data() {
    return {
        search: '',
        spaces: []
    }
  },
  methods: {
    routeToSpace(id) {
        this.$router.push({ path: '/spaces/' + id })
    }
  },
  mounted() {
      SpaceApi.getSpaces().then(response => this.spaces = response.data.data);
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
</style>

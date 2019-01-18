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

        <b-row class="mt-3">
            <b-col v-for="space in spaces" md="4">
                <b-card
                        v-on:click="routeToSpace(space.id)"
                        :title="space.title"
                        img-src="https://picsum.photos/600/300/?image=1"
                        img-top
                        tag="event"
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
                            {{space.capacity}} personen
                        </b-col>
                        <b-col md="4">
                            
                        </b-col>
                        <b-col md="4">
                            {{space.costs}}
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
</style>

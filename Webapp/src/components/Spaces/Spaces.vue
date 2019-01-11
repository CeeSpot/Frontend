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
            <b-col md="4">
                <b-card
                        v-on:click="routeToSpace(1)"
                        title="Nice room"
                        img-src="https://picsum.photos/600/300/?image=1"
                        img-top
                        tag="event"
                >
                    <b-row>
                        <b-col md="12">
                            <p class="card-text">
                                This room is Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut dolores
                                est.
                            </p>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row class="text-center">
                        <b-col md="4">
                            12 seats
                        </b-col>
                        <b-col md="4">
                            1 projector
                        </b-col>
                        <b-col md="4">
                            free wifi
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card
                        v-on:click="routeToSpace(1)"
                        title="Nice room"
                        img-src="https://picsum.photos/600/300/?image=2"
                        img-top
                        tag="event"
                >
                    <b-row>
                        <b-col md="12">
                            <p class="card-text">
                                This room is Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut dolores
                                est.
                            </p>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row class="text-center">
                        <b-col md="4">
                            12 seats
                        </b-col>
                        <b-col md="4">
                            1 projector
                        </b-col>
                        <b-col md="4">
                            free wifi
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card
                        v-on:click="routeToSpace(1)"
                        title="Nice room"
                        img-src="https://picsum.photos/600/300/?image=3"
                        img-top
                        tag="event"
                >
                    <b-row>
                        <b-col md="12">
                            <p class="card-text">
                                This room is Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut dolores
                                est.
                            </p>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row class="text-center">
                        <b-col md="4">
                            12 seats
                        </b-col>
                        <b-col md="4">
                            1 projector
                        </b-col>
                        <b-col md="4">
                            free wifi
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card
                        v-on:click="routeToSpace(1)"
                        title="Nice room"
                        img-src="https://picsum.photos/600/300/?image=4"
                        img-top
                        tag="event"
                >
                    <b-row>
                        <b-col md="12">
                            <p class="card-text">
                                This room is Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut dolores
                                est.
                            </p>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row class="text-center">
                        <b-col md="4">
                            12 seats
                        </b-col>
                        <b-col md="4">
                            1 projector
                        </b-col>
                        <b-col md="4">
                            free wifi
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card
                        v-on:click="routeToSpace(1)"
                        title="Nice room"
                        img-src="https://picsum.photos/600/300/?image=5"
                        img-top
                        tag="event"
                >
                    <b-row>
                        <b-col md="12">
                            <p class="card-text">
                                This room is Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut dolores
                                est.
                            </p>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row class="text-center">
                        <b-col md="4">
                            12 seats
                        </b-col>
                        <b-col md="4">
                            1 projector
                        </b-col>
                        <b-col md="4">
                            free wifi
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'Spaces',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      routeToSpace(id) {
        location.href = '/spaces/' + id;
      }
    },
    mounted() {
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

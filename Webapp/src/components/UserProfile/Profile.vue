<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <user-menu v-bind:active="active"></user-menu>
            <b-col md="8" class="card no-scale pt-3">
                <h2>Profile settings</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, nesciunt, quidem. Ab autem
                    consectetur, cumque cupiditate doloribus dolorum ea est, ipsa iste praesentium quaerat quos ratione
                    saepe suscipit ullam. Ullam.
                </p>
                <h4>Picture</h4>
                <b-form-file
                        v-model="file"
                        ref="fileinput"
                ></b-form-file>
                <small>Pictures with the jpg or png extension</small>
                <hr/>
                <h4>Description</h4>
                <b-form-group
                    id="desc"
                    label="Enter a description about yourself"
                    label-for="desc"
                    >
                    <b-form-textarea id="desc" :rows="6"></b-form-textarea>
                    <hr/>

                </b-form-group>
                <h4>Tags</h4>
                <b-row>
                    <b-col class="text-center">
                        <tag id="0" name="PHP"></tag>
                        <tag id="1" name="MySQL"></tag>
                        <tag id="2" name="Front-end"></tag>
                        <tag id="3" name="Vue.js"></tag>
                        <tag id="4" name="Angular"></tag>
                        <tag id="5" name="Laravel"></tag>
                        <tag id="6" name="UX"></tag>
                        <tag id="7" name="UI"></tag>
                        <tag id="8" name="Graphic design"></tag>
                        <tag id="9" name="React"></tag>
                    </b-col>
                </b-row>
                <hr/>

                <h4>Name</h4>
                <small>Your name will be publicly shown.</small>
                <b-form-group
                    id="firstname"
                    label="First name"
                    label-for="firstname"
                    >
                    <b-form-input id="firstname"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="insertion"
                    label="Insertion"
                    label-for="insertion"
                    >
                <b-form-input id="insertion"></b-form-input>
                </b-form-group>
                <b-form-group
                    id="lastname"
                    label="Last name"
                    label-for="lastname"
                    >
                    <b-form-input id="lastname"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import UserMenu from '@/components/UserProfile/UserMenu';
  import Tag from '@/components/Core/Other/Tag'

  export default {
    name: "user-profile",
    components: {
      UserMenu,
      Tag
    },
    data() {
      return {
        active: "Profile"
      }
    }
  }
</script>

<style scoped>

</style>
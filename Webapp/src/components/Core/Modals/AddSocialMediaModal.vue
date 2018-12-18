<template>
  <!-- Modal Component -->
  <b-modal id="AddSocialMediaModal" ref="AddSocialMediaModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3>Social media</h3>
        </b-col>
        <b-col class="text-right" xs="6">
          <button v-on:click="closeModal"
                  style="border-radius: 20px; width: 40px; height: 40px; border: none; background-color: white; cursor: pointer;">
            <font-awesome-icon icon="times"/>
          </button>
        </b-col>
      </b-row>
    </div>

    <b-form @submit="onSubmit">

      <b-form-group v-for="smr in smrs" v-bind:id="smr.site + 'fg'"
                    v-bind:label="smr.site | capitalize"
                    v-bind:label-for="smr.site + 'fi'">
        <b-form-input v-bind:id="smr.site + 'fi'"
                      type="text"
                      v-model="smr.url">
        </b-form-input>
      </b-form-group>

      <b-form-group v-for="site in sites" v-bind:id="site.site + 'fg'"
                    v-bind:label="site.site | capitalize"
                    v-bind:label-for="site.site + 'fi'">
        <b-form-input v-bind:id="site.site + 'fi'"
                      type="text"
                      v-model="site.url">
        </b-form-input>
      </b-form-group>
    </b-form>

    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="primary" v-on:click="saveSocialMedia">Save</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
  import socialMediaApi from '@/services/api/SocialMedia.js';

  export default {
    name: 'AddSocialMediaModal',
    data() {
      return {
        name: 'SocialMediaModal',
        url: '',
        selected: -1
      }
    },
    methods: {
      closeModal() {

        this.$refs.AddSocialMediaModal.hide()
      },
      onSubmit(evt) {
        evt.preventDefault();
      },
      saveSocialMedia(evt) {
        evt.preventDefault();

//        console.log("Sites: " + JSON.stringify(this.sites))
//        console.log("SMRS: " + JSON.stringify(this.smrs))
//        console.log("Userid: " +this.userId)
        let post = {
          resource_id: this.resourceId,
          social_media_resource_sites: this.smrs,
          sites: this.sites,
          type: this.type
        };
        socialMediaApi.addResourceSite(post).then((data) => {
          console.log(data);
          if (type === 1) {
            Emitter.$emit('updatedSocialMediaSiteForUser')
          }
          this.$refs.AddSocialMediaModal.hide()
        }).catch((err) => {
          console.log(err);
          this.$refs.AddSocialMediaModal.hide()
        });
        console.log(post);

      }
    },
    props: ['sites', 'smrs', 'resourceId', 'type']
  }
</script>

<style>
  label {
    font-weight: bold;
  }
</style>

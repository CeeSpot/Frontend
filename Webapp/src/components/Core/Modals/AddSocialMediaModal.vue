<template>
  <!-- Modal Component -->
  <b-modal id="AddSocialMediaModal" ref="AddSocialMediaModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3 class="text-white">Social media</h3>
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
                    v-bind:label-for="smr.site + 'fi'" :key="smr.site">
        <b-input-group>
          <b-input-group-prepend>
            <b-btn variant="outline-info" v-bind:class="smr.site">{{smr.site}}.com/</b-btn>
          </b-input-group-prepend>
          <b-form-input v-bind:id="smr.site + 'fi'"
                        type="text"
                        v-model="smr.url"></b-form-input>
        </b-input-group>
      </b-form-group>

      <!--<b-form-group v-for="smr in smrs" v-bind:id="smr.site + 'fg'"-->
                    <!--v-bind:label="smr.site | capitalize"-->
                    <!--v-bind:label-for="smr.site + 'fi'" :key="smr.site">-->
        <!--<b-input-group-prepend>-->
          <!--<b-btn variant="outline-info" v-bind:class="smr.site">{{smr.site}}.com/</b-btn>-->
        <!--</b-input-group-prepend>-->
        <!--<b-form-input v-bind:id="smr.site + 'fi'"-->
                      <!--type="text"-->
                      <!--v-model="smr.url"></b-form-input>-->
      <!--</b-form-group>-->


      <b-form-group v-for="smr in sites" v-bind:id="smr.site + 'fg'"
                    v-bind:label="smr.site | capitalize"
                    v-bind:label-for="smr.site + 'fi'" :key="smr.site">
        <b-input-group>
          <b-input-group-prepend>
            <b-btn variant="outline-info" v-bind:class="smr.site">{{smr.site}}.com/</b-btn>
          </b-input-group-prepend>
          <b-form-input v-bind:id="smr.site + 'fi'"
                        type="text"
                        v-model="smr.url"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Your website"
                    label-for="website">
        <b-input-group>
          <b-input-group-prepend>
            <b-btn variant="outline-info" class="website">website</b-btn>
          </b-input-group-prepend>
          <b-form-input id="website"
                        type="text"
                        v-model="website"></b-form-input>
        </b-input-group>
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

      let post = {
        resource_id: this.resourceId,
        social_media_resource_sites: this.smrs,
        sites: this.sites,
        type: this.type,
        website: this.website
      }
      socialMediaApi.addResourceSite(post).then((resp) => {
        console.log(resp)
        console.log(this.resp)
        if (this.type === 1) {
          Emitter.$emit('updatedSocialMediaSiteForUser', resp.data.token)
        } else if (this.type === 2) {
          Emitter.$emit('updatedSocialMediaSiteForCompany', resp.data.token)
        }
        this.$refs.AddSocialMediaModal.hide()
      }).catch((err) => {
        console.log(err);
        this.$refs.AddSocialMediaModal.hide()
      });
      console.log(post);

    }
  },
  props: ['sites', 'smrs', 'resourceId', 'type', 'website']
}
</script>

<style>
  label {
    font-weight: bold;
  }
  .twitter,.twitter:hover {
    color: #1da1f2;
    border-color:#1da1f2;
  }
  .facebook,.facebook:hover {
    color: #3b5998;
    border-color:#3b5998;
  }
  .instagram,.instagram:hover {
    color: #e1306c;
    border-color:#e1306c;
  }
  .linkedin,.linkedin:hover {
    color: #0077b5;
    border-color:#0077b5;
  }
  .medium,.medium:hover {
    color: #00ab6c;
    border-color:#00ab6c;
  }
  .github,.github:hover,.website,.website:hover {
    color: #4078c0;
    border-color:#4078c0;
  }
  .btn-outline-info:hover {
    background:none;
  }
</style>

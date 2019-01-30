<template>

  <b-modal ref="newEventModal" id="newevent" title="Nieuw evenement">

    <b-row>
      <b-col>
        <b-alert show variant="danger" v-if="failedMessage.length > 0">{{failedMessage}}</b-alert>
      </b-col>
    </b-row>

    <b-form-group id="eventTitleGroup"
                  label="Title"
                  label-for="title">
      <b-form-input id="title" class="mb15"
                    v-model="form.title"
                    :state="!$v.form.title.$invalid"
                    type="text">
      </b-form-input>
    </b-form-group>
    <b-row>
      <b-col>
        <label for="file">Upload file: </label>
        <b-form-file @change="onFileChanged" v-model="file" :state="Boolean(file)"
                     placeholder="Choose a file..."></b-form-file>
        <div class="mt-3" v-if="file !== null && file.name.length > 0">Selected file: {{file && file.name}}</div>

      </b-col>
    </b-row>
    <b-form-group class="mt-3" id="eventDescriptionGroup"
                  label="Description"
                  label-for="description">
      <b-form-textarea id="Description" class="mb15"
                       rows="3"
                       v-model="form.description"
                       :state="!$v.form.description.$invalid"
                       type="text">
      </b-form-textarea>
    </b-form-group>
    <b-form-group id="eventSmallDescGroup"
                  label="Small description"
                  label-for="smalldescription">
      <b-form-textarea id="smalldescription"
                       class="mb15"
                       rows="2"
                       v-model="form.small_description"
                       type="text"></b-form-textarea>
    </b-form-group>
    <b-form-select class="mb15" :options="event_categories" v-model="form.category"></b-form-select>

    <b-form-group id="eventStartTimeGroup"
                  label="Start time"
                  label-for="starttime">
      <datetime id="starttime" class="mb15"
                type="datetime"
                input-class="form-control"
                format="dd-MM-yyyy HH:mm:ss"
                v-model="form.start"></datetime>
    </b-form-group>
    <b-form-group id="eventEndTimeGroup"
                  label="End time"
                  label-for="endtime">
      <datetime id="endtime"
                class="mb15"
                type="datetime"
                input-class="form-control"
                format="dd-MM-yyyy HH:mm:ss"
                v-model="form.end"></datetime>

      <small id="website__BV_description_" class="form-text">
            <span v-if="!startAfterEnd && startAfterEnd != null"
                  class="text-danger">Start must be before event</span>
      </small>
    </b-form-group>
    <b-form-group id="eventLocationNameGroup"
                  label="Location name"
                  label-for="locationname">
      <b-form-input id="locationname"
                    class="mb15"
                    v-model="form.location_name"
                    :state="!$v.form.location_name.$invalid"
                    type="text"></b-form-input>
    </b-form-group>
    <b-form-group id="eventAddressGroup"
                  label="Address"
                  label-for="address">
      <b-form-input id="address"
                    class="mb15"
                    v-model="form.location_address"
                    :state="!$v.form.location_address.$invalid"
                    type="text">
      </b-form-input>
    </b-form-group>
    <b-form-group id="eventPostalCodeGroup"
                  label="Postal code"
                  label-for="postalcode">
      <b-form-input id="postalcode"
                    class="mb15"
                    v-model="form.location_postalcode"
                    :state="!$v.form.location_postalcode.$invalid"
                    type="text">
      </b-form-input>
    </b-form-group>
    <b-form-group id="eventCityGroup"
                  label="City"
                  label-for="city">
      <b-form-input id="city"
                    class="mb15"
                    v-model="form.location_city"
                    :state="!$v.form.location_city.$invalid"
                    type="text">
      </b-form-input>
    </b-form-group>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="primary" v-on:click="addEvent"
                 :disabled="$v.form.$invalid">Opslaan</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import AdminEventApi from '@/services/api/admin/events.js'
import moment from 'moment'
import uploadFile from '@/services/api/uploadFile.js'
import { validationMixin } from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'AddEventModal',
  data() {
    return {
      form: {},
      file: null,
      startAfterEnd: null,
      failedMessage: ''
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      title: {
        required
      },
      description: {
        required
      },
      location_name: {
        required
      },
      location_address: {
        required
      },
      location_postalcode: {
        required
      },
      location_city: {
        required
      }
    }
  },
  methods: {
    onFileChanged(event) {
      this.file = event.target.files[0]
    },
    addEvent() {
      this.form.start = moment(this.form.start).format('YYYY-MM-DD HH:mm:ss');
      this.form.end = moment(this.form.end).format('YYYY-MM-DD HH:mm:ss');
      this.startAfterEnd = moment(this.form.start).isBefore(moment(this.form.end))

      if (this.startAfterEnd) {
        AdminEventApi.addEvent({event: this.form}).then(response => {
          if (response.data.success && response.data.authorised) {
            uploadFile.uploadFile(response.data.insertId, 'event', this.file)
            this.$refs.formModal.hide()
            this.form = {}
            this.startAfterEnd = false
            this.failedMessage = ''
            Emitter.$emit('newAdminEventAdded')
            this.$toasted.show('Successfully added event!',
              {
                position: 'top-center',
                duration: 3000
              }
            )
          } else {
            if (!response.data.authorised) {
              location.href = '/'
            } else {
              this.failedMessage = 'Something went wrong, please try again'
            }
          }
        }).catch((err) => {
          this.failedMessage = 'Something went wrong, please try again'
        });
      } else {
        this.failedMessage = 'Start must be before end'
      }
    }
  },
  props: ['event_categories']
}
</script>

<style scoped>

</style>

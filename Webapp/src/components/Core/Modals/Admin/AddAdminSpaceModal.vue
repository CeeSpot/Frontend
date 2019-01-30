<template>
  <b-modal ref="newSpace" id="newspace" title="Nieuwe ruimte">

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
                       v-model="form.short_description"
                       :state="!$v.form.short_description.$invalid"
                       type="text"></b-form-textarea>
    </b-form-group>


    <b-form-group id="amountGroup"
                  label="Capacity (amount of people):"
                  label-for="amount">
      <b-form-input id="amount"
                    class="mb15"
                    rows="2"
                    v-model="form.capacity"
                    :state="!$v.form.capacity.$invalid"
                    type="number"></b-form-input>
    </b-form-group>
    <b-form-group id="useForGroup"
                  label="Use for: "
                  label-for="useFor">
      <b-form-input id="useFor"
                    class="mb15"
                    rows="2"
                    v-model="form.targets"
                    :state="!$v.form.targets.$invalid"
                    type="text"></b-form-input>
    </b-form-group>
    <b-form-group id="facilitiesGroup"
                  label="Facilities: "
                  label-for="facilities">
      <b-form-input id="facilities"
                    class="mb15"
                    rows="2"
                    v-model="form.facilities"
                    :state="!$v.form.facilities.$invalid"
                    type="text"></b-form-input>
    </b-form-group>
    <b-form-group id="costsGroup"
                  label="Costs: "
                  label-for="facilities">
      <b-form-input id="facilities"
                    class="mb15"
                    rows="2"
                    v-model="form.costs"
                    :state="!$v.form.costs.$invalid"
                    type="text"></b-form-input>
    </b-form-group>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn class="float-right" variant="primary" v-on:click="addSpace"
                 :disabled="$v.form.$invalid">Opslaan
          </b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import SpaceApi from '@/services/api/spaces.js'
import uploadFile from '@/services/api/uploadFile.js'
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'AddAdminSpaceModal',
  data() {
    return {
      form: {},
      file: null
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
      short_description: {
        required
      },
      capacity: {
        required
      },
      targets: {
        required
      },
      facilities: {
        required
      },
      costs: {
        required
      }
    }
  },
  methods: {
    onFileChanged(event) {
      this.file = event.target.files[0]
    },
    addSpace() {
      SpaceApi.addSpace(this.form).then(response => {
        if (response.data.success) {
          uploadFile.uploadFile(response.data.insertId, 'spaces', this.file)
          this.$toasted.show('Successfully added space!',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
        this.form = {}
        Emitter.$emit('addSpace')
        this.$refs.newSpace.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>

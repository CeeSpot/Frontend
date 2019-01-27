<template>

  <!-- Modal Component -->
  <b-modal id="CompanyRoleModal" ref="CompanyRoleModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3 class="text-white">Change company role</h3>
        </b-col>
        <b-col class="text-right" xs="6">
          <button v-on:click="closeModal"
                  style="border-radius: 20px; width: 40px; height: 40px; border: none; background-color: white; cursor: pointer;">
            <font-awesome-icon icon="times"/>
          </button>
        </b-col>
      </b-row>
    </div>

    <b-row>
      <b-col>
        <b-alert show variant="danger" v-if="failedMessage.length > 0">{{failedMessage}}</b-alert>
      </b-col>
    </b-row>
    <b-form @submit="onSubmit">
      <b-row v-for="(company, index) in user_companies" :key="company.id">
        <b-col>
          <b-form-group label="Role" v-bind:label-for="company.id + 'role'">
            <b-form-input v-bind:id="company.id + 'role'"
                          type="text"
                          v-model="company.role"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="company" v-bind:label-for="company.id + 'company'">
            <b-form-select v-bind:id="company.id + 'company'"
                           v-model="company.company_id">
              <option v-for="option in company.companies"
                      v-bind:value="option.value" :selected="option.value === company.company_id ? 'selected' : ''">
                {{option.text}}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="2" class="text-right">
          <font-awesome-icon class="text-danger" :icon="{ prefix: 'fas', iconName: 'times'}" v-on:click="deleteRole(index)"></font-awesome-icon>
        </b-col>
      </b-row>
      <b-button variant="link" v-on:click="addCompany">+ Add</b-button>
    </b-form>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="primary" v-on:click="onSubmit">Save</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import CommunityApi from '@/services/api/community.js'

export default {
  name: 'CompanyRoleModal',
  data () {
    return {
      failedMessage: '',
      options: [],
      deleted: []
    }
  },
  methods: {
    closeModal () {
      this.$refs.CompanyRoleModal.hide()
    },
    onSubmit (evt) {
      evt.preventDefault()
      CommunityApi.addCompanies(this.user_companies, this.deleted).then((data) => {
        this.$refs.CompanyRoleModal.hide()
        if(data.data.success){
         this.$toasted.show('Successfully added companies!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        Emitter.$emit('companyRolesChanged')
      }).catch((err) => {
        this.failedMessage = 'Something went wrong, please try again'
      })
    },
    deleteRole (id) {
      delete this.user_companies[id].companies
      this.deleted.push(this.user_companies[id])
      this.user_companies.splice(id, 1)
    },
    addCompany () {
      this.user_companies.push({
        id: -1,
        company_id: -1,
        role: '',
        companies: this.options
      })
    }
  },
  created () {
    for (let i = 0; i < this.companies.length; i++) {
      this.options.push({
        value: this.companies[i].id,
        text: this.companies[i].name
      })
    }
    for (let i = 0; i < this.user_companies.length; i++) {
      this.user_companies[i].companies = this.options
    }
  },
  props: ['companies', 'user_companies']
}
</script>

<style scoped>
  .text-danger:hover{
    color:#ff3a4e !important;
    cursor:pointer;
  }
</style>

<template>
    <b-form @submit="onSubmit">
        <b-row>
            <b-col md="10" offset-md="1">
                <b-alert show variant="danger" v-if="registerFailedMessage.length > 0">{{registerFailedMessage}}</b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="4" offset-md="1">
                <b-form-group id="firstNameGroup"
                              label="First name"
                              label-for="firstName">
                    <b-form-input id="firstName"
                                  type="text"
                                  v-model="form.firstname"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="2">
                <b-form-group id="insertionsGroup"
                              label="Insertions"
                              label-for="insertions">
                    <b-form-input id="insertions"
                                  type="text"
                                  v-model="form.insertions"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group id="lastNameGroup"
                              label="Lastname"
                              label-for="lastName">
                    <b-form-input id="lastName"
                                  type="text"
                                  v-model="form.lastname"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="emailGroup"
                              label="Email"
                              label-for="email">
                    <b-form-input id="email"
                                  type="email"
                                  v-model="form.email"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="usernameGroup"
                              label="Username"
                              label-for="userName">
                    <b-form-input id="userName"
                                  type="text"
                                  v-model="form.username"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="passwordGroup"
                              label="Password"
                              label-for="password">
                    <b-form-input id="password"
                                  type="password"
                                  v-model="form.password"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-link class="ml-2" v-on:click="goToLogin()">Already a member?</b-link>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
    import auth from '@/services/api/Authentication.js'
    export default {
        name: 'register-form',
        data () {
            return {
                msg: 'Register form',
                form: {
                    username: '',
                    password: '',
                    firstname: '',
                    insertions: '',
                    lastname: '',
                    email: '',
                },
                registerFailedMessage: ''
//                token : ''
            }
        },
        methods: {
            goToLogin () {
                Emitter.$emit('goToLoginFromRegister')
            },
            onSubmit (evt) {
                evt.preventDefault();
                console.log("asdsa");
                auth.register(this.form).then((resp) => {
                    console.log(resp.data);
                    if (resp.data.success) {
                       Emitter.$emit('registerred', resp.data.token);
                    } else {
                        this.registerFailedMessage = resp.data.message;
                        console.log(this.registerFailedMessage);
                    }
                }).catch((resp) => {
                    console.log(resp);
                    this.registerFailedMessage = resp.data.message;
                });
            }
        }
    }
</script>

<style>
    .col-form-label{
        font-weight: bold;
    }
</style>

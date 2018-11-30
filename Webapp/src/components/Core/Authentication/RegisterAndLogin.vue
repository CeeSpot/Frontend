<template>
    <b-container class="mt-12">
        <b-row v-if="registerActive">
            <b-col md="8" offset-md="2">
                <b-card class="no-scale" tag="article" style="background-image: url('/static/loginForm.svg')">
                    <h4>Register</h4>
                    <b-link v-on:click="switchLoginRegister()">Already a member</b-link>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="loginActive">
            <b-col sm="10" offset-sm="1" md="8" offset-md="2" >
                <b-card class="no-scale"
                        tag="article"
                        style="background-image: url('/static/loginForm.svg');background-position: center left;min-height: 400px;">
                    <b-row class="pt-4">
                        <b-col class="text-center"  md="6" offset-md="3">
                            <b-img src="/static/ceecee-logo-black.svg" style="height: 100px;"></b-img>
                        </b-col>
                    </b-row>
                    <!--<b-row>-->
                        <!--<b-col md="10" offset-md="1">-->
                            <!--<h4>Login</h4>-->
                        <!--</b-col>-->
                    <!--</b-row>-->
                    <loginform class="mt-5 pb-4"></loginform>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import loginform from '@/components/Core/Forms/LoginForm'
    export default {
        name: 'Register',
        data () {
            return {
                msg: 'Welcome to register',
                registerActive: true,
                loginActive: false,
            }
        },
        methods: {
            switchLoginRegister (){
                this.registerActive = !this.registerActive;
                this.loginActive = !this.loginActive;
            }
        },
        mounted () {
            Emitter.$on('goToRegisterFromLogin', () => this.switchLoginRegister())
        },
        components: {
            loginform
        }
    }
</script>

<style scoped="">
    .mt-12 {
        margin-top: 120px;
    }

    .np-l-r .card-body {
        padding-left: 0;
        padding-right: 0;
    }

    .card {
        /*margin-top: 80px;*/
    }
</style>
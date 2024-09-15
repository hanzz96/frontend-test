<!-- components/LoginPage.vue -->
<template>
    <v-app :theme="this.$store.state.theme ? this.$store.state.theme : 'light'">
        <v-row>
            <v-col cols="12" lg="12" class="d-flex align-center">
                <v-container>
                    <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
                        <v-row justify="center">
                            <v-col cols="12" md="12">
                                <v-card elevation="0" class="loginBox">
                                    <LoginForm />
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </v-col>
        </v-row></v-app>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
    components: {
        LoginForm
    },
    mounted() {
        /**
         * reset the data
         */
        this.$store.dispatch('starterData');
        const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            this.username = storedUser.username;
            this.rememberMe = !!localStorage.getItem('user');  // Pre-check "Remember Me" if the user was remembered
        }
    },
};
</script>
<style lang="scss">
.loginBox {
    max-width: 475px;
    margin: 0 auto;
}
</style>
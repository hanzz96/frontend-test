<!-- components/LoginPage.vue -->
<template>
    <v-card elevation="24" :variant="'outlined'">
        <v-card-text class="pa-sm-10 pa-6">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form ref="loginForm" v-model="valid">
                    <v-text-field label="Username" v-model="username" :rules="[rules.required]" required></v-text-field>
                    <v-text-field v-on:keyup.enter="submit" label="Password" v-model="password" :rules="[rules.required]" type="password"
                        required></v-text-field>
                    <v-checkbox v-model="rememberMe" label="Remember Me"></v-checkbox>
                    <v-alert v-if="error" type="error">{{ error }}</v-alert>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="!valid" color="primary" @click="submit">Login</v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,  // Added Remember Me checkbox state
            valid: false,
            error: '',
            rules: {
                required: (value) => !!value || 'Required.'
            },
        };
    },
    methods: {
        submit() {
            
            if(this.password.length <= 0){
                return;
            }

            this.$store.dispatch('login', {
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe,  // Pass the rememberMe state to Vuex
            }).then((success) => {
                if (success) {
                    this.$router.push({ name: 'home' });
                } else {
                    this.error = 'Invalid login credentials';
                }
            });
        },
    },
    mounted() {
    },
};
</script>
<style lang="scss">
.loginBox {
    max-width: 475px;
    margin: 0 auto;
}
</style>
<template>
    <h1>Login</h1>
    <v-form>
        <v-text-field
            v-model="username"
            label="Username"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
        ></v-text-field>
        <v-btn
            color="primary"
            @click="login"
        >Login</v-btn>
    </v-form>
</template>
<script lang="ts">
import FirebaseServicesProvider from '@/backend/FirebaseServicesProvider'
import {signInWithEmailAndPassword} from 'firebase/auth'
const firebaseAuthInstance = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getAuthInstance()
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            signInWithEmailAndPassword(firebaseAuthInstance, this.username, this.password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user)
            })
        }
    }
}
</script>
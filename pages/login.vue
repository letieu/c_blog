<template>
	<div id="auth-page">
		<div v-if="errorMessage" class="notification is-danger is-light mb-5">
			{{ errorMessage }}
		</div>
		<div class="field" v-if="isSignUp">
			<p class="control has-icons-left has-icons-right">
				<input v-model="form.displayName" class="input" type="text" placeholder="Display name">
				<span class="icon is-small is-left">
					<i class="fas fa-user-ninja"></i>
        </span>
			</p>
		</div>
		<div class="field">
			<p class="control has-icons-left has-icons-right">
				<input v-model="form.email" class="input" type="email" placeholder="Email">
				<span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
			</p>
		</div>
		<div class="field">
			<p class="control has-icons-left">
				<input v-model="form.password" class="input" type="password" placeholder="Password">
				<span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
			</p>
		</div>
		<div class="field" v-if="isSignUp">
			<p class="control has-icons-left">
				<input v-model="passwordConfirm" class="input" type="password" placeholder="Password confirm">
				<span class="icon is-small is-left">
          <i class="fas fa-check"></i>
        </span>
			</p>
		</div>
		<div class="field is-flex is-justify-content-space-between is-align-items-flex-end">
			<div>
				<button v-if="isSignUp" @click="createUserByPassword" class="button is-success">
					Sign up
				</button>
				<button v-else @click="passwordLogin" class="button is-success">
					Login
				</button>
				<button @click="googleLogin" class="button ml-3">
					<span class="icon is-small">
						<i class="fab fa-google"></i>
					</span>
					<span>Google</span>
				</button>
			</div>
			<a class="has-text-primary" @click="isSignUp = !isSignUp">
				{{ isSignUp ? 'Sign in' : 'Sign up' }}
			</a>
		</div>
	</div>
</template>

<script setup>
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
	signInWithPopup
} from "firebase/auth";
import { watch } from 'vue';
import {useUserStore} from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const router = useRouter();

const form = reactive({
	displayName: '',
	email: '',
	password: '',
})
const passwordConfirm = ref('');
const isSignUp = ref(false);
const errorMessage = ref('');

watch(isSignUp, () => {
	errorMessage.value = '';
})

function setError({ code }) {
	console.log(code);
	switch (code) {
		case 'auth/user-not-found':
			errorMessage.value = 'User not found';
			break;
		case 'auth/invalid-email':
			errorMessage.value = 'Invalid email address';
			break;
	}
}

function googleLogin() {
	signInWithPopup(auth, googleProvider)
		.then(result => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
			setUser(user);
		}).catch(setError)
}

function passwordLogin() {
	signInWithEmailAndPassword(auth, form.email, form.password)
		.then((userCredential) => {
			const user = userCredential.user;
			setUser(user);
		})
		.catch(setError);
}

function createUserByPassword() {
	if (form.password !== passwordConfirm.value) {
		errorMessage.value = 'Password confirm not match';
		return;
	}
	createUserWithEmailAndPassword(auth, form.email, form.password)
		.then((userCredential) => {
			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: form.displayName, photoURL: ""
			}).then(() => {
				setUser(user);
			}).catch((error) => {
			});
		})
		.catch(setError);
}

function setUser(user) {
	userStore.setUser(user);
	router.push('/');
}
</script>

<style>
#auth-page {
	max-width: 400px;
	margin: auto;
	padding: 50px;
}
</style>

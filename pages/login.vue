<template>
	<div id="auth-page">
		<div v-if="errorMessage" class="notification is-danger is-light mb-5">{{ errorMessage }}</div>
		<div class="field" v-if="isSignUp">
			<p class="control has-icons-left has-icons-right">
				<input v-model="form.displayName" class="input" type="text" placeholder="Display name" />
				<span class="icon is-small is-left">
					<i class="fas fa-user-ninja"></i>
				</span>
			</p>
		</div>
		<div class="field">
			<p class="control has-icons-left has-icons-right">
				<input v-model="form.email" class="input" type="email" placeholder="Email" />
				<span class="icon is-small is-left">
					<i class="fas fa-envelope"></i>
				</span>
			</p>
		</div>
		<div class="field">
			<p class="control has-icons-left">
				<input v-model="form.password" class="input" type="password" placeholder="Password" />
				<span class="icon is-small is-left">
					<i class="fas fa-lock"></i>
				</span>
			</p>
		</div>
		<div class="field" v-if="isSignUp">
			<p class="control has-icons-left">
				<input v-model="passwordConfirm" class="input" type="password" placeholder="Password confirm" />
				<span class="icon is-small is-left">
					<i class="fas fa-check"></i>
				</span>
			</p>
		</div>
		<div class="field">
			<button v-if="isSignUp" @click="createUserByPassword" class="button is-fullwidth is-success">Sign up</button>
			<button v-else @click="passwordLogin" class="button is-fullwidth is-success">Login</button>
		</div>

		<div class="has-text-centered has-text-grey is-size-6 field">
			Or login with
		</div>

		<div class="field is-flex is-justify-content-center">
			<button @click.prevent="googleLogin" class="button ml-3">
					<span class="icon is-small">
						<i class="fab fa-google has-text-danger"></i>
					</span>
				<span>Google</span>
			</button>
			<button @click.prevent="facebookLogin" class="button ml-3">
					<span class="icon is-small">
						<i class="fab fa-facebook has-text-info"></i>
					</span>
				<span>facebook</span>
			</button>
		</div>

		<div class="mt-6 has-text-centered has-text-grey is-size-6 field">
			<span> {{ isSignUp ? 'Already have an account? ' : 'Not have an account? ' }} </span>
			<a class="has-text-primary" @click="isSignUp = !isSignUp">{{ isSignUp ? 'Sign in' : 'Sign up' }}</a>
			<span> now. </span>
		</div>
	</div>
</template>

<script setup>
import { watch } from 'vue';
import { useNuxtApp } from '#app';

const { $supaAuth } = useNuxtApp();
console.log($supaAuth);

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

function setError({ message }) {
	errorMessage.value = message;
}

async function googleLogin() {
	const { user, session, error } = await $supaAuth.signIn({
		provider: 'google'
	})
}

async function facebookLogin() {
	const { user, session, error } = await $supaAuth.signIn({
		provider: 'facebook'
	})
}

async function passwordLogin() {
	const { user, session, error } = await $supaAuth.signIn({
		email: form.email,
		password: form.password,
	})
	if (error) {
		setError(error);
	}
}

function createUserByPassword() {
}
</script>

<style>
#auth-page {
	max-width: 400px;
	margin: auto;
	padding: 50px;
}
</style>

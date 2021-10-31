<template>
	<header class="header main-header">
		<nav class="navbar container" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<nuxt-link class="navbar-item" to="/">
					<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
				</nuxt-link>

				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<nuxt-link to="/" class="navbar-item">
						Home
					</nuxt-link>

					<a class="navbar-item">
						Documentation
					</a>
				</div>
				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">
							<nuxt-link to="/write" class="button is-primary">
								<strong>Write</strong>
							</nuxt-link>
							<nuxt-link v-if="!userStore.email" to="/login" class="button is-light">
								Log in
							</nuxt-link>
							<div class="dropdown is-hoverable" v-else>
								<div class="dropdown-trigger">
									<div class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
										<img :src="userStore.photoURL" v-if="userStore.photoURL">
										<div v-else> {{ userStore.displayName }} </div>
									</div>
								</div>
								<div class="dropdown-menu" id="dropdown-menu4" role="menu">
									<div class="dropdown-content">
										<a href="#" class="dropdown-item">
											Overview
										</a>
										<a href="#" class="dropdown-item">
											Modifiers
										</a>
										<a @click="logout" href="#" class="dropdown-item">
											Logout
										</a>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import {useUserStore} from "../stores/user";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

const auth = getAuth();
const userStore = useUserStore()
const router = useRouter();

const logout = async () => {
	try {
		await auth.signOut();
		userStore.logout();
		router.push({ name: 'login' })
	} catch (e){
		console.log(e);
	}
}
</script>

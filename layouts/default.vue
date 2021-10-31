<template>
	<div>
		<the-header/>
		<slot/>
	</div>
</template>
<script setup>
import {getAuth} from 'firebase/auth';
import {useUserStore} from "../stores/user";

const auth = getAuth();
const userStore = useUserStore()

auth.onAuthStateChanged((auth) => {
		if (auth?.currentUser) {
			userStore.setUser(auth?.currentUser)
		} else {
			userStore.logout();
		}
	}
);

</script>

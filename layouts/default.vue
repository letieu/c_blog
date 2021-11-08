<template>
	<div>
		<the-header/>
		<slot/>
	</div>
</template>
<script setup>
import { useNuxtApp } from '#app';
import { useUserStore } from '../stores/user';

const { $supaAuth } = useNuxtApp();
const userStore = useUserStore();
const setUser = () => {
	const user = $supaAuth.user();
	if (user) {
		userStore.setUser({ email: user.email, full_name: user.user_metadata?.full_name, avatar_url: user.user_metadata?.avatar_url});
	}
	console.log(user);
}

setUser();
$supaAuth.onAuthStateChange((event, seesion) => {
	setUser();
});

</script>

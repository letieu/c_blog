<template>
	<div class="container">
		<div id="article_content">
			<nav class="is-flex is-justify-content-space-between mb-5">
				<div>
					<button class="button is-warning" v-show="step > 0" @click="back">Back</button>
				</div>
				<div>
					<button class="button is-primary" v-show="step < 2" @click="next">
						{{ (step === 1) ? 'Post' : 'Next' }}
					</button>
				</div>
			</nav>

			<div v-show="step == 0">
				<input v-model="article.title" class="input mb-5" type="text" placeholder="Title...">
				<article-editor v-model="article.content"/>
			</div>

			<div v-show="step == 1">
				<div class="select" v-show="step == 1">
					<select v-model="article.category" class="">
						<option hidden value="">Category</option>
						<option value="c1">With options 1</option>
						<option value="c2">With options 2</option>
						<option value="c3">With options 3</option>
					</select>
				</div>
				<div>
					<label class="checkbox mt-5" v-show="step == 1">
						<input v-model="article.pined" type="checkbox">
						Pin to sidebar
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import {useUserStore} from "../stores/user";

const step = ref(0);
const userStore = useUserStore();
const db = getFirestore();
const next = () => {
	if (step.value === 1) {
		save();
	}
	step.value ++;
};
const back = () => step.value --;
const save = async () => {
	article.modifiedAt = new Date();
	const docRef = await addDoc(collection(db, "articles"), {
		...article,
	});
	console.log("Document written with ID: ", docRef.id);
}
const article = reactive({
	content: {},
	title: '',
	category: '',
	pined: false,
	modifiedAt: null,
	author: userStore.email,
})
</script>

<style>
#article_content {
	max-width: 700px;
	margin: auto;
}
</style>

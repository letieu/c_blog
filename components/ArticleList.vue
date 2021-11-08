<template>
	<div class="articles">
		<nav>
			<div class="tabs is-right is-boxed">
				<h2 class="is-size-5 has-text-black has-text-weight-bold is-uppercase">New list</h2>
				<ul>
					<li class="is-active"><a>Pictures</a></li>
					<li><a>Music</a></li>
					<li><a>Videos</a></li>
					<li><a>Documents</a></li>
				</ul>
			</div>
		</nav>
		<article-item/>
		<article-item/>
		<article-item/>
		<article-item/>
	</div>
</template>

<script setup>
import { useNuxtApp } from '#app';

const { $supabase } = useNuxtApp();

async function fetchArticles() {
	const { data, error } = await $supabase
		.from('articles')
		.select();

	console.log(data, error);
}

fetchArticles();
</script>

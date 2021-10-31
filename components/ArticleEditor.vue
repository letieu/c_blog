<template>
	<div id="editor"></div>
</template>

<script setup>
import {computed, watchEffect} from 'vue';

const props = defineProps({
	modelValue: Object,
});
const emit = defineEmits(['update:modelValue']);

const isClient = computed(() => {
    if (typeof process == 'undefined') {
      return true;
    } else {
      return process?.client;
    }
  });
let editor = ref();

watchEffect(async () => {
	if (isClient.value) {
		const {default: EditorJS} = await import("@editorjs/editorjs");
		const {default: Header} = await import("@editorjs/header");
		const {default: List} = await import("@editorjs/list");
		setTimeout(() => {
			editor.value = new EditorJS({
				holderId: 'editor',
				placeholder: 'Let`s write an awesome story....',
				tools: {
					header: Header,
					list: List,
				},
				onChange(api, block) {
					api.saver.save().then(data => {
						emit('update:modelValue', data);
					});
				}
			})
		}, 300)
	}
})

</script>

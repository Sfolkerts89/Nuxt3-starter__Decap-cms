<script setup>

const props = defineProps({
	markdownString: {
		type: String,
		required: true,
	}
});

const mdtoHtmlString = await mdToHtml(props.markdownString);

</script>

<template>
	<div id="markdown-to-html" v-html="mdtoHtmlString"></div>
</template>
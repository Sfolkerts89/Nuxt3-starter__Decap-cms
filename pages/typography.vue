<template>
	<main
		id="main"
		class="typography"
	>	
		<span>{{ typography.title }}</span>
		<PagesMarkdownRenderMarkdown :markdownString="typography.content" />
	</main>
</template>


<script setup>

const setLocale = useState("setLocale");

const { data: typographyData } = reactive(await useAsyncData("typography", () =>
	queryContent("/pages/typography").findOne())
);

const typography = computed(() => {
	// itterates through the locale
	return typographyData[setLocale.value]
})

</script>

<style lang="scss" scoped>
	main {
		@media screen and (orientation: landscape) {
			display: grid;
			justify-items: center;
			align-items: center;
		}
		div {
			max-width: 500px;
		}
	}
</style>

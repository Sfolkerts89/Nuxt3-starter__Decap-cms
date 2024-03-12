<template>
	<main id="main" class="home">
		<div class="links">
			<NuxtLink to="https://nuxt.com" target="_blank">
				<img src="/images/header/nuxt-logo.svg" alt="logo" width="200" height="100" />
			</NuxtLink>
			<NuxtLink to="https://decapcms.org" target="_blank">
				<img src="/images/header/decap-logo.svg" alt="logo" width="200" height="100" />
			</NuxtLink>
		</div>
		<PagesMarkdownRenderMarkdown :markdownString="home.content" />
	</main>

</template>

<script setup>
const setLocale = useState("setLocale");

const { data: homeData } = reactive(await useAsyncData("home", () =>
	queryContent("/pages/home").findOne())
);

const home = computed(() => {
	return homeData[setLocale.value]
})

setSeoHead(home.value.SEOmetaData);
</script>

<style lang="scss" scoped>
main {
	@media screen and (orientation: landscape) {
		display: grid;
		justify-items: center;
		align-items: start;
	}
}
</style>

<template>
	<main id="main" class="dynamic-fields-showcase">
		<PagesDynamicFields v-for="(zone, i) in dynamicFields.sections" :zone="zone"
            :sid="'section-' + i" :key="[i, setLocale]" />
	</main>
</template>

<script setup>

const setLocale = useState("setLocale");

const { data: dynamicFieldsData } = reactive(await useAsyncData("dynamic-fields", () =>
	queryContent("/pages/dynamic-fields").findOne())
);

const dynamicFields = computed(() => {
	return dynamicFieldsData[setLocale.value]
})

setSeoHead(dynamicFields.value.SEOmetaData);

</script>

<style lang="scss" scoped></style>

<template>
	<main id="main" class="dynamic-fields-showcase">
		<MiscDynamicFields v-for="(zone, i) in dynamicFields.sections" :zone="zone"
            :sid="'section-' + i" :key="i" />
	</main>
</template>

<script setup>

const { data: dynamicFields } = reactive(await useAsyncData("dynamic-fields", () =>
	queryContent("/pages/dynamic-fields").findOne())
);

setSeoHead(dynamicFields.SEOmetaData);
</script>

<style lang="scss" scoped></style>

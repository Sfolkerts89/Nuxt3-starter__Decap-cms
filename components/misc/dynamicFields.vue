<template>
	<section :id="props.sid" :class="[
		'__' + props.zone.dfSettings.size,
		'__' + props.zone.dfSettings.background
	]" class="dynamic-fields">
		<div class="__dynamic-field" :class="['df__' + field.type]" v-for="field in zone.dynamicField">
			<MDC v-if="field.type == 'text'" :value="field.dfText"
				:key="[field.type, setLocale]" />
			<MediaRespImage v-if="field.type == 'image'" :url="field.image" :key="setLocale" />
			<MediaCarousel v-if="field.type == 'images' && field.displayType == 'carousel'" :imageOnly="true"
				:slides="field.images" :hasEnlarge="true" :key="setLocale" />
			<MediaLightbox v-if="field.type == 'images' && field.displayType == 'lightbox'" :images="field.images"
				:ligtbox="true" :key="setLocale" />
			<MediaRespVideo v-if="field.type == 'video'" :url="field.video" :muted="field.muted"
				:autoplay="field.autoplay" :loop="field.loop" :id="props.sid" :key="setLocale" />
		</div>
	</section>
</template>

<script setup>

// README
// This component renders one of various fields per instance:
// - field.type == 'text'
// - field.type == 'image'
// - field.type == 'images'
// - field.type == 'video'

// It is designed to work in conjunction with boilerplate__extras/nuxt__pages/dynamic-fields.vue and boilerplate__extras/decap__config/extra--config.yml > dynamic fields (anchors, aliased and page template)
// This component is used in v-for="(zone, i) in dynamicFields.sections" in the dynamic-fields.vue page. The data structure comes from the page template in extra--config.yaml

// This thus renders different types of fields which can be chosen in the CMS when creating a new collection entry (or if you adapt it to a single page instance), creating a simple page building experience with full styling control in your hands.

const props = defineProps([
    "zone",
    "sid",
])

</script>

<style lang="scss">
section.dynamic-fields {
	position: relative;
	margin: $spacing4;
	padding: $spacing4;
	&.__large {
		width: 100%;
	}
	&.__small {
		width: 50%;
		margin-inline: auto;
	}

	&.__light {
		background: $light-grey;
	}

	&.__dark {
		background: $dark-grey;
		color: $white;
	}
}
</style>

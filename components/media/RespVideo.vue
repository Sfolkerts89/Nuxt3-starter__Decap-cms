<template>
	<video loading="lazy" :muted="!hasSound" :loop="loop" :autoplay="props.autoplay" :controls="props.hasSound" :id="vidId" width="800" height="600">
		<source :src="videoUrl" />
	</video>
</template>

<script setup>

const props = defineProps({
	url: String,
	hasSound: Boolean,
	autoplay: Boolean,
	loop: Boolean,
	id: String
});

import cldDelivery from '~/composables/cldDelivery';

const respSize = ref("w_1920")

onMounted(() => {
	if(process.client) {
		window.innerWidth < 1024 ? respSize.value = "w_1024" : respSize.value = "w_1920"
	}
})

const videoUrl = computed(() => {
	return cldDelivery(props.url, respSize.value, 'video')
})


const extraId = props.url.slice(-10);
const vidId = ref('video--' + props.id + extraId);

onMounted(() => {
	if (process.client && props.autoplay) {
		// Intersection Observer for Autoplay attr
		const target = document.getElementById(vidId.value);

		const options = {
			rootMargin: "0px",
			threshold: 0.5,
		};

		function doShit(entries, observer) {
			entries.forEach((entry) => {
				entry.isIntersecting ? entry.target.play() : entry.target.pause();
			})
		}

		let observer = new IntersectionObserver(doShit, options);

		observer.observe(target);
	}
})

</script>

<style lang="scss" scoped>
video {
	position: relative;
	width: 100%;
	height: auto;
}
</style>

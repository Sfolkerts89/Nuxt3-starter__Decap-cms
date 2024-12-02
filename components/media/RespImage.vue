<template>
	<div class="responsive-image" @[clickEvent]="openLightbox">
		<img :key="props.url" :src="imageUrl" :class="{ '__has-lightbox': props.lightbox }" width="800" height="600"
			:alt="imageUrl" />

		<div v-if="lightbox" class="lightbox-hint">
			<span class="__enlarge" v-if="diagOpen === false">&#10063;</span>
			<span class="__minimize" v-if="diagOpen === true">&#10064;</span>
		</div>
	</div>
	<dialog v-if="lightbox" :class="{ __lightbox: diagOpen }">
		<button class="button" @click="closeLightbox">close</button>
		<img :key="props.url" :src="imageUrl" />
	</dialog>
</template>

<script setup>

import cldDelivery from '~/composables/cldDelivery';

// NOTES
// This is a respsonvive image component via changing cloudinary transform parameters. And includes a single image instance lightbox function when enabled in props 

const props = defineProps({ 
	url: String, 
	lightbox: Boolean, 
	objectFit: String, 
	color: String 
});


// Preset Cloudinary imaga size transformation
const respSize = ref("w_1920")

// Change image transformation to 1920 or 1024
// NOTE: adding more variables will lead to more transformations! Keep your transformations per month in check ;)
onMounted(() => {
	if (process.client) {
		window.innerWidth < 1024 ? respSize.value = "w_1024" : respSize.value = "w_1920"
	}
})

// Build absolute url
const imageUrl = computed(() => {
	return cldDelivery(props.url, respSize.value)
})

// set object fit in css
const objectFit = props.objectFit ? props.objectFit : "contain";

// dialog (lightbox container) open?
const diagOpen = ref(false);

const clickEvent = computed(() => {
	// checks if lightbox is true => returns 'click' as an eventHandler
	return props.lightbox ? "click" : null;
});

const tipEnlarge = "click to enlarge"

const tipMinimize = "click to minimize"

function openLightbox() {
	diagOpen.value = true;
	let body = document.body;
	setTimeout(() => {
		body.classList.add("lightbox-active");
	}, 1000);
}
function closeLightbox() {
	diagOpen.value = false;
	let body = document.body;
	body.classList.remove("lightbox-active");
}


// colors from SCSS!
import variables from '~/assets/scss/variables.module.scss';

// use baseColor from assets/scss/variables unless provided otherwise via props
const baseColor = variables.baseColor;
const accentColor = computed(() => {
	let r = props.color ? props.color : baseColor;
	return r
})
</script>


<style lang="scss" scoped>
.responsive-image {
	position: relative;
	width: 100%;
	height: 100%;

	img {
		width: 100%;
		height: 100%;
		object-fit: v-bind('objectFit');
	}
}

img.__has-lightbox {
	@include hover {
		outline: 0.2em solid v-bind('accentColor');
	}
}

dialog.__lightbox {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	display: grid;
	grid-template-rows: 1fr auto auto 1fr;
	background: $black;

	button {
		grid-row: 2;
	}

	img {
		position: relative;
		grid-row: 3;
		width: 100%;
		max-height: 200%;
		margin-bottom: $spacing6;
		object-fit: contain;
	}
}

.lightbox-hint {
	@include media(xsm) {
		display: none;
	}

	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba($color: $dark-grey, $alpha: 0.8);
	border: 0.2em solid $base-color;
	z-index: 1;
	opacity: 0;
	transition: $transition2;
	display: grid;
	justify-content: center;
	align-content: center;

	span {
		font-size: $font-size1;
		color: $base-color;
		text-align: center;

		&::after {
			font-size: $font-size6;
			display: block;
		}
	}

	span.__enlarge {
		&::after {
			content: v-bind(tipEnlarge);
		}
	}

	span.__minimize {
		&::after {
			content: v-bind(tipMinimize);
		}
	}

	@include hover {
		opacity: 1;
	}
}
</style>

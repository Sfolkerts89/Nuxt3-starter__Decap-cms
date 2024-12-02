<template>
	<div class="lightbox">
		<div v-for="(image, i) in images" :key="i" class="__image--wrapper" :class="{ active: i === activeItem }"
			@click="selectItem(i)">
			<img v-if="image" class="__image--thumbnail" :src="cldDelivery(image, 'w_300,f_auto')" awidth="300" height="300"
				:alt="image" />
			<div loading="lazy" v-if="image" class="__image--full">
				<img :src="cldDelivery(image, 'w_1920,f_auto')" width="1920" height="1080" :alt="image"/>
			</div>
		</div>
		<div class="__box--overlay" :class="{ active: overlayActive }">
			<span class="close" @click="closeItem()">&cross; {{ btnClose }}</span>
			<button class="__overlay--nav __overlay--next" @click="nextItem()">&#8594;</button>
			<button class="__overlay--nav __overlay--prev" @click="prevItem()">&#8592;</button>
		</div>
	</div>
</template>

<script setup>

// NOTES
// This is a multi image lightbox component used to render mutliple images in a grid, usefull for simple portfolio displays

import cldDelivery from '~/composables/cldDelivery';
const props = defineProps(["images", "color"]);


// colors from SCSS
import variables from '~/assets/scss/variables.module.scss';

const baseColor = variables.baseColor;
const accentColor = computed(() => {
	let color = props.color ? props.color : baseColor;
	return color
})

const btnClose = useBtnData('close')


// Lightbox vars and functions

const activeItem = ref(null); 
const overlayActive = ref(false);
const arrayLength = props.images.length;

function selectItem(i) {
	let body = document.body;
	activeItem.value = i;
	overlayActive.value = true;
	body.classList.add("lightbox-active", "no-nav");
}
function closeItem() {
	let body = document.body;
	overlayActive.value = false;
	activeItem.value = null;
	body.classList.remove("lightbox-active", "no-nav");
}
function nextItem() {
	let arrayCount = arrayLength;
	if (activeItem.value === --arrayCount) {
		activeItem.value = 0;
	} else {
		activeItem.value++;
	}
}
function prevItem() {
	let arrayCount = arrayLength;
	if (activeItem.value === 0) {
		activeItem.value = --arrayCount;
	} else {
		activeItem.value--;
	}
}
</script>

<style lang="scss">
body.lightbox-active {
	overflow: hidden;
}
</style>

<style lang="scss" scoped>
.lightbox {
	position: relative;
	display: flex;
	flex-wrap: wrap;
}

.__image--wrapper {
	width: 30em;
	flex: 1 2 30em;
	max-width: 60vw;
	margin: auto;
	scroll-snap-align: none;

	.__image--thumbnail {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	@include hover {
		.__image--thumbnail {
			filter: drop-shadow(0 0 1em v-bind(accentColor));
			transition: $transition1;
			opacity: 1;
		}
	}

	.__image--full {
		display: none;
		position: fixed;
		z-index: 3;
		inset: 0 0;
		width: 100vw;
		height: auto;
		height: 100vh;
		margin: auto;
		backdrop-filter: blur(0.3em);
		background: rgba($color: $black, $alpha: 0.7);

		img {
			position: absolute;
			object-fit: contain;
			width: 90vw;
			height: 90vh;
			left: 5vw;
			top: 5vh;
		}
	}

	&.active {
		.__image--full {
			display: block;
		}

		.__image--thumbnail {
			filter: blur(0.3em);
		}
	}
}

.__box--overlay {
	position: fixed;
	inset: 0;
	z-index: 3;
	display: none;
	opacity: 0;
	width: 100vw;
	// interpolate scss variable into css custom property for repeated use
	--btn-positions: #{$spacing3};

	.__overlay--nav {
		position: absolute;
		z-index: 3;
		top: 50vh;
		transition: $transition1;
		background: none;
		color: $white;
		font-size: $font-size3;
		padding-inline: $spacing1; // addtional clickable area
		cursor: pointer;
		@include media(xsm, sm) {
			top: auto;
			bottom: var(--btn-positions);
		}
	}

	span.close {
		position: absolute;
		top: var(--btn-positions);
		right: var(--btn-positions);
		font-family: $font-accent;
		text-transform: uppercase;
		color: $white;
		padding: $spacing2;
		cursor: pointer;

		@include hover {
			color: v-bind(accentColor);
			opacity: 0.8;
			transition: $transition1;
		}

		@include media(xsm, sm) {
			inset: auto;
			bottom: var(--btn-positions);
			left: 50%;
			transform: translateX(-50%);
			font-size: $font-size6;
			border: 1px solid v-bind(accentColor);
			border-radius: 0.4em;
		}
	}

	.__overlay--next {
		right: var(--btn-positions);
	}

	.__overlay--prev {
		left: var(--btn-positions);
	}
}

.__box--overlay.active {
	display: block;
	opacity: 1;
}
</style>

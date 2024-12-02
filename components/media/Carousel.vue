<template>
	<div class="carousel" :class="[{ enlargeActive: enlargeActive }, { enlarge: props.hasEnlarge }]">
		<div class="carousel__inner" id="carousel__inner" ref="inner" :style="innerStyles" @click="toggleEnlarge">
			<div v-if="props.hasEnlarge" class="enlarge-hint">
				<span class="__enlarge" v-if="enlargeActive === false">&#10063;</span>
				<span class="__minimize" v-if="enlargeActive === true">&#10064;</span>
			</div>
			<div class="slide" v-for="slide in slides" :key="[slide, enlargeActive]">
				<img v-if="imageOnly" class="slide__image" :src="cldDelivery(slide, 'w_1920')" width="300" height="300" :alt="slide"/>
				<img v-if="slide.image" class="slide__image" :src="cldDelivery(slide, 'w_1920')" width="300" height="300" :alt="slide" />
				<div v-if="!imageOnly" class="slide__content">
					<h5>{{ slide.caption }}</h5>
					<p>{{ slide.slide }}</p>
				</div>
			</div>
		</div>
		<div class="carousel__navigation">
			<button class="carousel__navigation-button" id="carousel__navigation--prev" @click="goPrev()" @mouseover="pauseInterval()">
				&#8592;
			</button>
			<ul class="__index-list">
				<li v-for="(slide, i) in slides" :class="{ '--active-index': i == activeSlide }">
				</li>
			</ul>
			<button class="carousel__navigation-button" id="carousel__navigation--prev" @click="goNext()" @mouseover="pauseInterval()">
				&#8594;
			</button>
		</div>
	</div>
</template>

<script setup>

// README
// Your all well known carousel/ slider 

const props = defineProps(["imageOnly", "slides", "timed", "hasEnlarge", "color"]);

import cldDelivery from '~/composables/cldDelivery';

// build url base
const rtc = useRuntimeConfig();
const cEnv = rtc.public.cloudinaryEnvUrl;
const imageUrlBase = cEnv + "/image/upload/f_auto,c_scale,w_1920,q_auto:best/";

// colors from SCSS
import variables from '~/assets/scss/variables.module.scss';

const baseColor = variables.baseColor;
// sets color from props if provided, otherwise has fallback
const accentColor = computed(() => {
	let r = props.color ? props.color : baseColor;
	return r
})


// Carousel:
// base code thanks to: https://github.com/luvejo/vue-3-carousel-tutorial/blob/composition-api/src/components/Carousel.vue
// This code has been altered to display using grid


const inner = ref(null);
const slides = props.slides;
const innerStyles = ref({});
const step = ref("");
const slidesCount = computed(() => {
	return props.slides.length
})
const activeSlide = ref(0)
const transitioning = ref(false);

const interval = 8000;


function setStep() {
	// first slide position
	step.value = "0%";
	activeSlide.value = 0;
}

function timedSlides() {
	setInterval(() => {
		if (paused.value == false) {
			doNext();
		}
	}, interval);
}

const paused = ref(false)

function goNext() {
	doNext();
	pauseInterval();
}

function doNext() {
	if (transitioning.value) return;
	transitioning.value = true;
	moveLeft();
	afterTransition(() => {
		const slide = slides.shift();
		slides.push(slide);
		resetTranslate();
		transitioning.value = false;
	});
}

function goPrev() {
	doPrev();
	pauseInterval();
}

function doPrev() {
	if (transitioning.value) return;
	transitioning.value = true;
	moveRight();
	afterTransition(() => {
		const slide = slides.pop();
		slides.unshift(slide);
		resetTranslate();
		transitioning.value = false;
	});
	if (activeSlide.value == 0) {
		activeSlide.value = slidesCount.value - 1
	} else {
		activeSlide.value = --activeSlide.value
	}
}

function pauseInterval() {
	paused.value = true;
	setTimeout(() => {
		paused.value = false
	}, interval);
}

function moveLeft() {
	innerStyles.value = {
		transform: `translateX(-${step.value}) 
						translateX(-${step.value})`,
	};
	if (activeSlide.value == slidesCount.value - 1) {
		activeSlide.value = 0
	} else {
		activeSlide.value = ++activeSlide.value
	}
}

function moveRight() {
	innerStyles.value = {
		transform: `translateX(${step.value}) 
						translateX(-${step.value})`,
	};
}

function afterTransition(callback) {
	const listener = () => {
		callback();
		inner.value.removeEventListener("transitionend", listener);
	};
	inner.value.addEventListener("transitionend", listener);
}

function resetTranslate() {
	innerStyles.value = {
		transition: "none",
		transform: `translateX(-${step.value})`,
	};
}


// 'fullscreen' mode (not an actual lightbox)
// enlarge:
const enlargeActive = ref(false);

function toggleEnlarge() {
	props.hasEnlarge ? enlargeActive.value = !enlargeActive.value : '';
	setStep();

	setTimeout(() => {
		inner.value.scrollIntoView({ behavior: "smooth", block: "center" });
	}, 500);
	settings.value = enlargeActive ? settingsLarge : settingsSmall; // changing params blocks request
}


onMounted(() => {
	setStep();
	timedSlides();
	resetTranslate();
});
</script>

<style lang="scss" scoped>
$car_width: 40vw;

.carousel {
	position: relative;
	// needs hidden cause = container
	overflow: hidden;
	margin-inline: auto;
	display: grid;
	grid-template-rows: 1fr auto;
	grid-template-columns: 100%;
	transition: $transition3;

	@include media(xsm) {
		width: 100%;
	}

	&.enlarge {
		width: $car_width;
		max-width: 100%;
	}
}

.carousel__inner {
	grid-row: 1;
	grid-column: 1;
	transition: transform 0.2s;
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 100%;

	@include media(xsm) {
		height: auto;
	}
}


.carousel__navigation {
	grid-row: 2;
	grid-column: 1;
	z-index: 2;
	display: flex;
	justify-content: space-between;

	ul.__index-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 20em;

		li {
			flex-basis: 0.4em;
			list-style: none;
			aspect-ratio: 1 /1;
			border-radius: 0.2em;
			background: rgba($color: $white, $alpha: 0.5);
			margin: $spacing1;
			transition: $transition2;

			&.--active-index {
				background: v-bind(accentColor);
			}
		}
	}
}

.slide {
	position: relative;
	width: 100%;
	height: 100%;

	.slide__image {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.slide__content {
		h5 {
			margin-top: 0;
		}

		p {
			display: block;
			white-space: normal;
		}
	}
}

.carousel__navigation-button {
	background: none;
	color: $white;
	font-size: $font-size3;
	padding-inline: $spacing1; // addtional clickable area
	cursor: pointer;
}

.enlarge-hint {
	@include media(xsm) {
		display: none;
	}

	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	grid-row: 1;
	grid-column: 1;
	border: 3px solid v-bind(accentColor);
	opacity: 0;
	transition: $transition3;
	display: grid;
	justify-content: center;
	align-content: center;

	span {
		font-size: $font-size1;
		color: v-bind(accentColor);
		text-align: center;

		&::after {
			font-size: $font-size6;
			content: "click to enlarge";
			display: block;
		}
	}

	span.__enlarge {
		&::after {
			content: "click to enlarge";
		}
	}

	span.__minimize {
		&::after {
			content: "click to minimize";
		}
	}

	@include hover {
		opacity: 1;
	}
}

@include media(sm, md, lg, xlg) {
	.carousel.enlargeActive {
		position: relative;
		width: 100%;

		.carousel__inner {
			height: 100vh;
		}

		.slide__image {
			position: relative;
			height: 100%;
			width: 100%;

			@include media(xsm) {
				aspect-ratio: 1 / 1;
			}

			object-fit: contain;
		}

		.carousel__navigation {
			width: 100%;
			align-self: end;
			background: $black;
			height: max-content;
			grid-row: 1;
			grid-column: 1;
			pointer-events: none;
		}

		.carousel__navigation-button {
			margin: 0 2em;
			pointer-events: auto;
		}

		#carousel__navigation--prev {
			// set something
		}

		#carousel__navigation--next {
			// set something
		}
	}
}
</style>

<template>
	<main>
		<h1>Products</h1>
		<div class="cards--container">
			<div class="product-card __card" v-for="product in productsList">
				<NuxtLink :to="'product/' + returnSlug(product.title)">
					<img :src="assetUrlBase + product.image" />
					<h3>
						{{ product.title }}
					</h3>
					<span class="description">{{ product.description }}</span>
					<button>{{ moreBtn }}</button>
				</NuxtLink>
			</div> 		
		</div>
	</main>
</template>


<script setup>

const { data: productsList } = reactive(await useAsyncData("products", () =>
	queryContent("/products/").find())
);

function returnSlug(s) {
	let result = s.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
	return result;
}

const rtc = useRuntimeConfig();
const cEnv = rtc.public.cloudinaryEnvUrl;
const assetUrlBase = cEnv + "/image/upload" + '/c_scale/w_600/q_auto:best'

const moreBtn = useBtnData('article');
</script>

<style lang="scss" scoped>
.product-card {
	color: $white;
	text-shadow: 0 0 0.2em $black;
	.description {
		opacity: 0;
	}

	@include hover {
		.description {
			opacity: 1;
		}
	}
}
</style>

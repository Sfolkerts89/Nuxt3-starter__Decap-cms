<template>
	<main>
		<h1>Products</h1>
		<div class="cards--container">
			<div class="product-card __card" v-for="product in productsList">
				<NuxtLink :to="'product/' + slugify(product.title)">
					<img :src="cldDelivery(product.image, 'w_300')" />
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

import cldDelivery from '~/composables/cldDelivery';
import slugify from '~/composables/slufigy';
const { data: productsList } = reactive(await useAsyncData("products", () =>
	queryContent("/products/").find())
);

const moreBtn = useBtnData('article');
</script>

<style lang="scss" scoped>

main {
	display: grid;
	justify-items: center;
	align-items: center;

	div {
		max-width: 500px;
	}
}

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

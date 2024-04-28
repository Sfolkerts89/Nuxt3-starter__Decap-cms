<template>
	<div id="main-menu">
		<div id="mobile-menu__toggle-button" @click="toggleMobileMenu()" :class="{ mobileMenuOpen: mobileMenuActive }">
			<span>&#x2630;</span>
			MENU 
		</div>

		<nav :class="{ mobileMenuOpen: mobileMenuActive }">

			<menu class="main-menu__basic">
				<span class="menu-type">Basic boilerplate menu: </span>
				<NuxtLink to="/" class="menu-item item--home" prefetch>
					<span>home</span>
				</NuxtLink>
				<NuxtLink to="/typography" class="menu-item" prefetch>
					<span>typography</span>
				</NuxtLink>
			</menu>

			<menu class="main-menu__boilerplate-extras">
				<span class="menu-type">Boilerplate Extras menu: </span>
				<NuxtLink v-for="link in links" :to="'/' + link" :class="['menu-item', 'item--' + link]"
					@click="menuItemSelected">
					<span>{{ link }}</span>
				</NuxtLink>
			</menu>
		</nav>
	</div>
</template>

<script setup>

const links = ["products", "dynamic-fields", "contact"];
const mobileMenuActive = ref(false);
const route = useRoute();
watch(route, () => {
	mobileMenuActive.value = false;
});

function toggleMobileMenu() {
	mobileMenuActive.value = !mobileMenuActive.value;
}

function menuItemSelected() {
	mobileMenuActive.value = false;
}

watch(
	// closes menu on route change
	() => route.path,
	() => {
		mobileMenuActive.value = false
	}
)

</script>

<style lang="scss" scoped>
nav {
	display: grid;
	@include media(xsm) {
		padding-top: 8em; // pushes item below 'header' (toggle-button span:before)
	}
}

.main-menu__basic {
	--hover-background-color: #{$secondary-color};
}

.main-menu__boilerplate-extras {
	--hover-background-color: #{$base-color};
}

.main-menu__basic,
.main-menu__boilerplate-extras {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	margin: 0;
	padding: 0;

	@include media(xsm) {
		position: relative;
		display: block;
		height: 100%;
		margin: 0;
		padding-left: 0;
	}

	span {
		padding: $spacing2;
		width: 8em;
		@include media(xsm) {
			width: auto;
		}
	}

	.menu-type {
		font-family: $font-accent;
		margin-block: auto;
		display: block;
		width: 12em;
		@include media(xsm) {
			width: auto;
		}
	}

	.menu-item {
		cursor: pointer;
		span {
			display: block;
			text-align: center;
			list-style: none;
			transition: $transition1;
			@include hover {
				background: var(--hover-background-color);
				color: $white;
			}
		}

		@include media(xsm) {
			&.router-link-active {
				outline: 0.3em solid var(--hover-background-color);
			}
		}
	}
}

.main-menu__basic {
	.menu-type {
		background: $secondary-color;
		color: $white;
	}
}

.main-menu__boilerplate-extras {
	color: $white;
	background: $dark-grey;

	.menu-type {
		background: $base-color;
	}
}


// toggle states/ mobile

nav {
	@include media(xsm) {
		display: none;
		menu {
			display: block !important;
		}
	}
}

nav.mobileMenuOpen {
	position: fixed;
	display: grid;
	grid-template-rows: auto max-content 1fr;
	height: 100vh;
	width: max-content;
	top: 0;
	right: 0;
	background: $white;
	&::before {
		position: fixed;
		content: "";
		width: 100%;
		height: 100vh;
		backdrop-filter: blur(0.3em);
		inset: 0;
	}
}

#mobile-menu__toggle-button {
	display: none;
	cursor: pointer;
	@include media(xsm) {
		position: absolute;
		z-index: 99;
		display: block;
		font-size: 0.8em;
		text-align: center;
		width: max-content;
		margin-inline: auto;
		justify-self: center;
		padding: $spacing1;
		margin-top: $spacing0;
		right: 0;
	}
	span {
		font-size: $font-size2;
		display: block;
	}
}

#mobile-menu__toggle-button.mobileMenuOpen {
	position: fixed;

	span::after {
		display: block;
	}
}

#main-menu {
	@include media(xsm) {
		position: absolute;
		z-index: 99;
		top: 0;
		right: 0;
	}
}
</style>

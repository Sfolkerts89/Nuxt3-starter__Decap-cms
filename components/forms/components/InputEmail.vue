<template>
	<div class="input-wrapper input-type-email">
		<input
			type="email"
			:id="inputID"
			:placeholder="label"
			:name="label"
			v-model="inputValue"
			:required="required"
			@input="emitData(inputID)"
		/>
		<label
			:for="inputID"
			class="animate-label"
			>{{ label }}</label
		>
	</div>
</template>

<script setup>
	const props = defineProps({
		name: String,
		inputID: String,
		label: String,
		required: Boolean
	});

	const emit = defineEmits(['payload']);
	const inputValue = "";


	function emitData(label) {
		// if required = true
		if (props.required) {
			let input = document.getElementById(label);
			// then check input validity
			let isValid = input.checkValidity() === true ? true : false;
			// and emit all data
			emit('payload', { fieldLabel: label, fieldValue: inputValue, fieldValidity: isValid });
		} else {
			// or emit only the inputID and inputValue
			emit('payload', { fieldLabel: label, fieldValue: inputValue });
		}
	}
</script>

<style scoped>
	p.valid {
		color: green !important;
	}
	p.invalid {
		color: red !important;
	}
</style>

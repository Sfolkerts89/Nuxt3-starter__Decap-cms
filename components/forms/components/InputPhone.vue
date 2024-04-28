<template>
	<div class="input-wrapper">
		<input
			type="text"
			:id="inputID"
			:placeholder="label"
			:name="name"
			pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
			minlength="10"
			v-model="inputValue"
			:required="required"
			@input="emitData(inputID)"
		/>
		<label
			:for="inputID"
			required
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

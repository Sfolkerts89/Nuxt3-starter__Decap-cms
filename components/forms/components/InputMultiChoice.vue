<template>
	<div class="input-type-select">
		<label
			:for="inputID"
			class="animate-label"
			>{{ label }}</label
		>
		<select
			:id="inputID"
			:name="name"
			v-model="inputValue"
			:required="required"
			@change="emitData(inputID)"
		>
			<option default>-</option>
			<option
				v-for="choice in choices"
				:value="choice"
			>
				{{ choice }}
			</option>
		</select>
		{{ inputValue }}
	</div>
</template>


<script setup>
	const props = defineProps({
		name: String,
		inputID: String,
		label: String,
		required: Boolean,
	});

	const emit = defineEmits(['payload']);

	const choices = ["een afspraak maken", "een vraag stellen", "terug gebeld worden"];
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

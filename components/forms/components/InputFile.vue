<template>
	<div class="input-wrapper input-type-file">
		<legend>{{ legend }}</legend>
		<input
			type="file"
			:id="inputID"
			multiple
			:required="required"
			@change="emitData(inputID)"
		/>
		<!-- TODO: add v-model (<-- v-model="inputValue" doesnt work)-->
		<label
			:for="inputID"
			class="file-label"
			>upload file</label
		>
		<ul
			class="upload-value"
			:key="files.value"
		>
			<li
				v-for="file in files"
				:key="file"
			>
				{{ file.name }}
			</li>
		</ul>
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

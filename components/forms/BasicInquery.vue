<template>
	<form name="contact-form" class="form" method="POST" netlify netlify-honeypot="gotcha" action="/success">
		<input type="hidden" name="form-name" value="contact-form" />
		<fieldset>
			<div class="gotcha--protectron">
				<label>&#x26A0;<input name="gotcha" /> </label>
			</div>
			<FormsComponentsInputName @payload="validateInput" name="name" inputID="name" label="your name:"
				class="input-name" required></FormsComponentsInputName>
			<FormsComponentsInputEmail @payload="validateInput" name="email" inputID="email" label="email:"
				class="input-email" required>
			</FormsComponentsInputEmail>
			<FormsComponentsInputTextarea @payload="validateInput" :rows="5" name="message" inputID="message"
				label="your message:" required></FormsComponentsInputTextarea>
		</fieldset>
		<button type="submit" :class="submitActive ? 'enabled' : 'disabled'">{{ btnSend }}</button>
	</form>
</template>

<script setup>

const submitActive = ref(false);
const formData = reactive([]);

const btnSend = useBtnData('send');

function validateInput(payload) {
	// form validation
	let fdObject = formData.find((Object) => Object.entry.fieldLabel === payload.fieldLabel);
	if (fdObject) {
		fdObject.entry.fieldValue = payload.fieldValue;
		fdObject.entry.fieldValidity = payload.fieldValidity;
		// Check required fields's validity: set submitActive to true if array.every returns true
		submitActive.value = formData.every((Object) => Object.entry.fieldValidity === true);
	} else {
		// Array is empty, push object into:
		formData.push({ entry: payload });
	}
}
</script>

<style lang="scss" scoped>
.gotcha--protectron {
	opacity: 0;
	height: 0;
	max-height: 0;
	z-index: -10;
	position: absolute;
}

fieldset {
	display: grid;
	column-gap: $spacing2;

	.input-name,
	.input-email {
		grid-row: 2;
	}

	.input-name {
		grid-column: 1;
	}

	.input-name {
		grid-column: 2;
	}

	.input-type-textarea {
		grid-column: 1 / 3;
		grid-row: 4;
	}
	@include media(xsm) {
		display: block;
		padding-inline: $spacing4;
	}

}

button {
	display: block;
	margin-inline: auto;
	margin-block: $spacing3;
	background: $base-color;
}

</style>

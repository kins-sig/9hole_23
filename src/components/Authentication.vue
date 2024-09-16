<template>
	<v-container class="fill-height">
	<v-responsive class="align-center text-center fill-height">
		<v-img height='300px' src="../assets/9holelogo.png"></v-img>
		<div class="py-4" />
		<v-text-field
			:rules="[rules.required]"
			label="Email"
			type="text"
			variant="outlined"
			v-model="email">
		</v-text-field>
		<v-text-field   
			:rules="[rules.required]"
			label="Password"
			type="password"
			variant="outlined"
			v-model="password">
		</v-text-field>

		<v-alert v-if="authError" type="error" :text="authErrorMessage"></v-alert>

		<div class="py-2" />

		<v-row class="d-flex align-center justify-center">
			<v-col cols="auto">
				<v-btn
					@click="login"
					color="primary"
					min-width="228"
					rel="noopener noreferrer"
					size="x-large"
					variant="flat"
				>
					Sign In
				</v-btn>
				<div class="py-2" />
				<v-btn
					@click="register"
					color="secondary"
					min-width="228"
					rel="noopener noreferrer"
					size="x-large"
					variant="flat"
				>
					Sign up
				</v-btn>
				
				<div class="py-2" />

				<v-btn variant="plain" @click="navigateToSetup">
					Continue as Guest
				</v-btn>
			</v-col>

			</v-row>
		</v-responsive>
	</v-container>
	</template>

	<script setup>
	import router from '@/router';
	import { ref } from 'vue';
	import { firebaseApp } from '@/firebaseInit'; 
	import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'; 

	let email = ref('');
	let password = ref('');
	let authError = ref(false);

	let authErrorMessage = ref(''); 

	const rules = {
		required: value => !!value || 'Field is required', 
	}

	function register(){
		clearError(); 
		const auth = getAuth(firebaseApp);
		createUserWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {
				const user = userCredential.user;
				navigateToSetup(); 
			})
			.catch(error => {
				handleAuthError(error.message); 
				console.log(error); 
			});
	}

	function login() {
		clearError(); 
		const auth = getAuth(firebaseApp);
		signInWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {   
				const user = userCredential.user;
				navigateToSetup(); 
			})
			.catch(error => {
				handleAuthError(error.message); 
				console.log(error);
			});
	}

	function navigateToSetup() {
		router.push('/setup');
	}

	function handleAuthError(error) {
		authError.value = true; 
		if (error.includes('invalid-credential')) {
			authErrorMessage.value = "Your password is invalid."; 
			return;
		}
		if (error.includes('invalid-email')) {
			authErrorMessage.value = "Your email is invalid."
			return; 
		}
		authErrorMessage.value = "There was an authentication error. Please try again."
	}

	function clearError() {
		authError.value = false; 
		authErrorMessage.value = ''; 
	}
</script>
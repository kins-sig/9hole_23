<template>
	<default-bar />
	<div class="games"> 
		<v-btn color="secondary" variant="outlined" @click="startNewGame"> Start New Game! </v-btn>

		<v-card color="#E6E6FA" variant="elevated" width="75%"
			v-for="game in retrievedGames" :key="game.id">
			<div class="test">
				<v-col>
					<v-card-title>{{ getTitle(game.created) }}</v-card-title>
					<v-card-text>
						<div><b>Players:</b> {{ getPlayers(game.gameData) }}</div>
						<div v-if="game.updated"><b>Last Updated:</b> {{ game.updated.toDate() }}</div>
					</v-card-text>
				</v-col>
				<v-img width="64px" height="64px" src="@/assets/9holelogo.png"></v-img>

			</div>

			<template v-slot:actions>
					<v-btn @click="openGame(game.id)" text="Continue playing"></v-btn>
			</template>
		</v-card>
	</div>

</template>

<script setup>
 	import router from '@/router';
	import { ref, onMounted } from "vue";
	import DefaultBar from '@/layouts/default/AppBar.vue';
	import { firestore } from "@/firebaseInit";
	import { query, doc, collection, getDocs, where } from "firebase/firestore"

	const props = defineProps({
		user: String
	})

	let retrievedGames = ref([]); 

	onMounted(async () => {
		const q = query(collection(firestore, "games"), where("userId", "==", props.user));
		const querySnapshot = await getDocs(q);
		retrievedGames.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	});

	function startNewGame() {
		router.push({name: 'NewGame', params: { user: props.user }});
	}

	function openGame(gameId) {
		router.push({name: 'Overview', params: { game: gameId }});
	}

	function getPlayers(gameData) {
		const playerNames = [];
		if (!(Object.keys(gameData).length === 0 && gameData.constructor === Object)) {
			for (const each of gameData.values()) {
			playerNames.push(each.name)
		}
		return playerNames.join(', '); 
		}
	}

	function getTitle(created) {
		return `Game from ${created.toDate().toDateString()}`; 
	}
</script>

<style scoped>
	.games{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem; 
		margin: 1rem;
	}

	.test {
		display: flex; 
		flex-direction: row;
		align-items: center;
		justify-content: start;
		flex-wrap: wrap;
	}

</style>
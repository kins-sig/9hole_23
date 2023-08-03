<template>
	<default-bar />

	<v-table fixed-header>
		<thead>
			<tr @click="editPlayers">
				<th class="text-left">
					Hole
				</th>
				<th class="text-left"
					v-for="player in playersAndScores"
					:key="player.name">
					{{player.name}}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="hole in playersAndScores[0].scores.length-1"
				:key="hole"
				@click="handleRowClick(hole)">
				<td>
					{{ hole }} 
					<!-- <v-icon icon="mdi-pencil" size="x-small" class="pl-3"></v-icon> -->
				</td>
				<td v-for="player in playersAndScores"
					:key="player">{{ player.scores[hole] }}</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td>Total: </td>
				<td v-for="player in playersAndScores"
					:key="player">
					{{ getPlayerTotal(player.scores) }}
				</td>
			</tr>
		</tfoot>
	</v-table>

	<!-- Add Menu -->
	<v-btn variant="flat"
		class="position-absolute"
		style="bottom: 5px; right:5px"
		color="secondary" 
		icon="mdi-plus">
		<v-menu activator="parent" location="top">
			<v-list>
				<v-list-item @click="showAddPlayersModal = true">
					<v-list-item-title>Add players</v-list-item-title>
				</v-list-item>
				<v-list-item @click="showAddHolesModal = true">
					<v-list-item-title>Add holes</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-btn>

	<!-- Edit Hole Modal -->
	<v-dialog v-model="showEditHoleModal" width="auto">
		<v-card>
        <v-card-text class="mx-auto">
			<v-btn  @click="previousHole"
				class="mr-4"
				v-bind:disabled="selectedHole == 1"
				color="secondary" variant="flat"
				icon="mdi-arrow-left">
			</v-btn>
			Edit Hole {{ selectedHole }}
			<v-btn @click="nextHole"
				class="ml-4"
				v-bind:disabled="selectedHole == numberOfHoles"
				color="secondary" variant="flat" icon="mdi-arrow-right"></v-btn>
			<v-text-field
				class='pt-10'
				v-for="player in playersAndScores" :key="player"
				v-bind:label="player.name"
				variant="outlined"
				v-model="player.scores[selectedHole]">
			</v-text-field>
		</v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="showEditHoleModal = false">Done</v-btn>
        </v-card-actions>
      </v-card>
	</v-dialog>

	<!-- Edit Player Names Modal -->
	<v-dialog v-model="showEditPlayerModal">
		<v-card>
        <v-card-text>
			Edit Player Names
			<v-text-field
				class='pt-10'
				v-for="player in playersAndScores" :key="player"
				v-bind:label="player.name"
				variant="outlined"
				v-model="player.name">
			</v-text-field>
		</v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="showEditPlayerModal = false">Done</v-btn>
        </v-card-actions>
      </v-card>
	</v-dialog>

	<!-- Add Player Modal -->
	<v-dialog v-model="showAddPlayersModal">
		<v-card>
        <v-card-text>
			Add Players
			<v-text-field
				class='pt-10'
				label="How many players do you wish to add?"
				type="number"
				variant="outlined"
				v-model="playersToAdd">
			</v-text-field>
		</v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="addPlayers(playersToAdd)">Add</v-btn>
        </v-card-actions>
      </v-card>
	</v-dialog>

		<!-- Add Holes Modal -->
		<v-dialog v-model="showAddHolesModal">
		<v-card>
        <v-card-text>
			Add Holes
			<v-text-field
				class='pt-10'
				label="How many holes do you wish to add?"
				variant="outlined"
				type="number"
				v-model="holesToAdd">
			</v-text-field>
		</v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="flat" block @click="addHoles(holesToAdd)">Add</v-btn>
        </v-card-actions>
      </v-card>
	</v-dialog>


</template>



<script setup>
	import {useRoute} from "vue-router";
	import { ref } from "vue"
	import DefaultBar from '@/layouts/default/AppBar.vue'


	const route = useRoute();
	let numberOfHoles = parseInt(route.params.holes);
	let numberOfPlayers = parseInt(route.params.players);
	let playersAndScores = ref([]);

	let showEditPlayerModal = ref(false);

	let showEditHoleModal = ref(false);
	let selectedHole = ref('');

	let showAddPlayersModal = ref(false);
	let showAddHolesModal = ref(false);

	for (let i = 1; i < numberOfPlayers+1; i++) {
		playersAndScores.value.push({name: 'Player' + i, scores: generateNewScores()});
	}

	function generateNewScores() {
		let scores = [];
		if (playersAndScores.value[0]) {
			for (let i = 0; i < playersAndScores.value[0].scores.length; i++) {
				scores.push(0);
			}
		}
		else {
			for (let i = 0; i < numberOfHoles+1; i++) {
				scores.push(0);
			}
		}
		return scores;
	}

	function handleRowClick(row) {
		selectedHole.value = row;
		showEditHoleModal.value = true; 
	}

	function editPlayers() {
		showEditPlayerModal.value = true;
	}

	function getPlayerTotal (scores) {
		let sum = 0;
		scores.forEach( num => {
			sum += parseInt(num)
		})
		return sum;
	}

	function previousHole () {
		if (selectedHole.value !== 1) {
			selectedHole.value -= 1; 
		}
	}

	function nextHole() {
		if (selectedHole.value !== numberOfHoles) {
			selectedHole.value += 1; 
		}
	}

	function addPlayers(playersToAdd) {
		showAddPlayersModal.value = false; 
		for (let i=1; i < parseInt(playersToAdd)+1; i++) {
			playersAndScores.value.push({name: 'Added Player ' + i, scores: generateNewScores()})
		}
	}

	function addHoles(holesToAdd) {
		showAddHolesModal.value = false; 
		console.log(playersAndScores); 
		const scoresToAdd = []; 
		for (let i=0; i < parseInt(holesToAdd); i++) {
			scoresToAdd.push(0); 
		}
		playersAndScores.value.forEach((player) => {
			console.log(player.scores); 
			console.log(scoresToAdd); 
			player.scores = player.scores.concat(scoresToAdd); 
		}); 
		console.log(playersAndScores); 
		
	}

</script>
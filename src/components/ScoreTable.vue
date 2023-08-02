<template>
	<v-table fixed-header>
		<thead>
			<tr>
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
			<tr v-for="hole in numberOfHoles"
				:key="hole"
				@click="handleRowClick(hole)">
				<td>{{ hole }}</td>
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
	<v-dialog v-model="dialog">
		<v-card>
        <v-card-text>
			Edit Hole {{ selectedHole }}
			<v-text-field
				v-for="player in playersAndScores" :key="player"
				v-bind:label="player.name"
				v-model="player.scores[selectedHole]">
			</v-text-field>
		</v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
	</v-dialog>
</template>

<script setup>
	import {useRoute} from "vue-router";
	import { ref } from "vue"

	const route = useRoute();
	let numberOfHoles = parseInt(route.params.holes);
	let numberOfPlayers = parseInt(route.params.players);
	let playersAndScores = ref([]);
	let dialog = ref(false);
	let selectedHole = ref('');

	for (let i = 1; i < numberOfPlayers+1; i++) {
		playersAndScores.value.push({name: 'Player' + i, scores: generateNewScores()});
	}

	function generateNewScores() {
		let scores = [];
		for (let i = 0; i < numberOfHoles+1; i++) {
			scores.push(0);
		}
		return scores;
	}

	function handleRowClick(row) {
		console.log(row);
		dialog.value = true;
		selectedHole.value = row;
	}

	function getPlayerTotal (scores) {
		let sum = 0;
		scores.forEach( num => {
			sum += parseInt(num)
		})
		return sum;
	}
</script>
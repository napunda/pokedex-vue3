<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import axios from 'axios'

const state = reactive({
  items: [],
  itemsFiltered: []
})

const loading = ref(false)

const toProperCase = str => str.replace(/\b\w/g, c => c.toUpperCase())
const TYPES_COLORS = {
  grass: "#5B9A4C",
  fire: "#ff5a00",
  water: "#1ca3ec",
  bug: "#c0f7b3",
  normal: "#aa9",
  poison: "#a59",
  electric: "#fc3",
  ground: "#db5",
  fairy: "#e9e",
  fighting: "#b54",
  psychic: "#f59",
  rock: "#ba6",
  ghost: "#66b",
  ice: "#6cf",
  dragon: "#754"
}
function getPokemonColor(type) {
  return TYPES_COLORS[type] || "#000";
}

onMounted(async () => {
  loading.value = true;
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
  const promises = response.data.results.map(async ({ url }) => {
    const { data } = await axios.get(url)
    return {
      name: toProperCase(data.name.replaceAll('-', ' ')),
      sprite: data.sprites.other['official-artwork'].front_default,
      weight: data.weight / 10,
      type: data.types[0].type.name,
      color: getPokemonColor(data.types[0].type.name)
    }
  })
  state.items = await Promise.all(promises)
  loading.value = false
})

let inputSearch = ref('');
state.itemsFiltered = computed(() => {
  if (inputSearch.value) {
    return state.items.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(inputSearch.value.toLocaleLowerCase()));

  }
  return state.items;
})

const categoriesType = reactive(['grass',
  'fire',
  'water',
  'bug',
  'normal',
  'poison',
  'electric',
  'ground',
  'fairy',
  'fighting',
  'psychic',
  'rock',
  'ghost',
  'ice',
  'dragon'])

</script>
<template>
  <v-sheet color="blue-grey" class="d-flex justify-center">
    <v-container>
      <label for="searchPokemon" class="text-h5">
        Pesquise seu Pokemon tchola:
      </label>
      <v-text-field class="mt-3" prepend-inner-icon="mdi mdi-magnify" flat variant="outlined" id="searchPokemon"
        label="Buscar" v-model="inputSearch"></v-text-field>
      <div class="categoryFilter py-4">
        <v-btn flat class="mr-2 my-1" v-for="(item, i) in categoriesType" :key="i">{{ item }}</v-btn>
      </div>
      <v-sheet v-if="loading" class="loading-widget d-flex justify-center align-center py-16" height="100%" width="100%"
        color="transparent">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </v-sheet>
      <v-row v-else>
        <v-col v-for="({ name, sprite, weight, type, color }, i) in state.itemsFiltered" :key="i" cols="12" sm="6" md="4"
          lg="3">
          <v-card height="100%" class="pa-4" flat :color="color">
            <div class="text-start">
              <span class="text-white">
                {{ type }}
              </span>
            </div>
            <v-img width="100%" :src="sprite"></v-img>
            <div class="d-flex justify-center align-center flex-column">
              <span class="font-weight-bold text-h6 text-white">{{ name }}</span>
              <span class="text-white">Peso: {{ weight }} kg</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { searchLocations, type LocationResult } from '@/weather/WeatherService'
import { useWeatherStore } from '@/weather/useWeatherStore'

const store = useWeatherStore()
const q = ref<string>('')
const results = ref<LocationResult[]>([])
const open = ref<boolean>(false)
const searching = ref<boolean>(false)
const error = ref<string | null>(null)

async function runSearch() {
  if (!q.value || q.value.trim().length < 2) {
    results.value = []
    open.value = false
    return
  }
  searching.value = true
  error.value = null
  try {
    results.value = await searchLocations(q.value.trim())
    open.value = true
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Search failed'
    error.value = msg
  } finally {
    searching.value = false
  }
}

let debounce: ReturnType<typeof setTimeout> | undefined
watch(q, () => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(runSearch, 300)
})

function choose(loc: LocationResult) {
  open.value = false
  q.value = `${loc.name}${loc.admin1 ? ', ' + loc.admin1 : ''}${loc.country ? ', ' + loc.country : ''}`
  store.selectLocation(loc)
}

onMounted(() => {
  // If there is already a location selected, show its name
  if (store.location) {
    const l = store.location
    q.value = `${l.name}${l.admin1 ? ', ' + l.admin1 : ''}${l.country ? ', ' + l.country : ''}`
  }
})
</script>

<template>
  <div style="position: relative;">
    <div class="surface" style="padding:.3rem; border-radius:12px;">
      <div style="display:flex; align-items:center; gap:.5rem;">
        <span class="badge" aria-hidden="true">Search</span>
        <input
          class="input"
          :aria-busy="searching ? 'true' : 'false'"
          type="text"
          placeholder="Search city or location"
          v-model="q"
          style="flex:1; border:none; box-shadow:none;"
        />
        <button class="btn ghost" type="button" @click="runSearch">Go</button>
      </div>
    </div>

    <div
      v-if="open && (results.length || error)"
      class="surface"
      style="position:absolute; top:110%; left:0; right:0; z-index: 10; padding:.25rem;"
    >
      <div v-if="error" class="text-muted small" style="padding:.5rem; color: var(--op-error);"> {{ error }} </div>
      <div v-else>
        <button
          v-for="r in results"
          :key="`${r.latitude}-${r.longitude}-${r.name}`"
          class="btn ghost"
          style="width:100%; justify-content:flex-start; margin:.25rem 0;"
          @click="choose(r)"
        >
          <span style="font-weight:600; color:#0f172a;">{{ r.name }}</span>
          <span class="text-muted small" style="margin-left:.35rem;">
            {{ r.admin1 ? r.admin1 + ', ' : '' }}{{ r.country }}
          </span>
        </button>
        <div v-if="!results.length" class="text-muted small" style="padding:.5rem;">No results</div>
      </div>
    </div>
  </div>
</template>

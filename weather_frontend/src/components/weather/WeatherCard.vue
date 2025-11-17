<script setup lang="ts">
import WeatherIcon from './WeatherIcon.vue'
import { computed } from 'vue'
import { tempUnitSymbol, windUnit, type Units } from '@/weather/config'
import type { CurrentBlock, HourlyBlock } from '@/weather/WeatherService'

const props = defineProps<{
  location: { name: string; country?: string; admin1?: string }
  current: CurrentBlock
  hourly?: HourlyBlock
  timezone?: string
  units: Units
}>()

const title = computed(() => {
  const parts = [props.location.name]
  if (props.location.admin1) parts.push(props.location.admin1)
  if (props.location.country) parts.push(props.location.country)
  return parts.join(', ')
})

const temp = computed(() => Math.round(props.current.temperature_2m))
const feels = computed(() => Math.round(props.current.apparent_temperature))
const humidity = computed(() => props.current.relative_humidity_2m ?? 0)
const wind = computed(() => Math.round(props.current.wind_speed_10m))
const code = computed(() => props.current.weather_code ?? props.current.weathercode)

const updated = computed(() => {
  try {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch { return '' }
})
</script>

<template>
  <div class="card" style="padding: 1rem;">
    <div style="display:flex; gap:1rem; align-items:center; justify-content:space-between; flex-wrap:wrap;">
      <div style="display:flex; gap:.9rem; align-items:center;">
        <WeatherIcon :code="code" :size="42" />
        <div>
          <div style="font-size: 1.25rem; font-weight: 800; color:#0f172a;">{{ title }}</div>
          <div class="text-muted small">Updated {{ updated }}</div>
        </div>
      </div>

      <div style="display:flex; align-items:baseline; gap:.5rem;">
        <div style="font-size:2.2rem; font-weight:800; color:#0f172a;">
          {{ temp }}{{ tempUnitSymbol(units) }}
        </div>
        <div class="badge">Feels like {{ feels }}{{ tempUnitSymbol(units) }}</div>
      </div>
    </div>

    <div class="divider" style="margin:.75rem 0;"></div>

    <div style="display:flex; gap: .75rem; flex-wrap: wrap;">
      <div class="surface" style="padding:.6rem .8rem;">
        <span class="text-muted small">Wind</span>
        <div class="text-strong">{{ wind }} {{ windUnit(units) }}</div>
      </div>
      <div class="surface" style="padding:.6rem .8rem;">
        <span class="text-muted small">Humidity</span>
        <div class="text-strong">{{ humidity }}%</div>
      </div>
      <div v-if="timezone" class="surface" style="padding:.6rem .8rem;">
        <span class="text-muted small">Timezone</span>
        <div class="text-strong">{{ timezone }}</div>
      </div>
    </div>
  </div>
</template>

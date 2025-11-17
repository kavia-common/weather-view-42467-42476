<script setup lang="ts">
import { useWeatherStore } from '@/weather/useWeatherStore'
import type { Units } from '@/weather/config'

const store = useWeatherStore()

function set(u: Units) {
  store.setUnits(u)
}
</script>

<template>
  <div class="surface" style="padding:.35rem; display:flex; gap:.35rem; align-items:center;">
    <button
      class="btn"
      :class="store.units==='metric' ? '' : 'ghost'"
      type="button"
      @click="set('metric')"
      aria-label="Use Celsius"
      title="Celsius"
    >
      °C
    </button>
    <button
      class="btn"
      :class="store.units==='imperial' ? '' : 'ghost'"
      type="button"
      @click="set('imperial')"
      aria-label="Use Fahrenheit"
      title="Fahrenheit"
    >
      °F
    </button>
  </div>
</template>

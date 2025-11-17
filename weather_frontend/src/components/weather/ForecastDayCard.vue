<script setup lang="ts">
import { computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'
import { tempUnitSymbol, type Units } from '@/weather/config'

const props = defineProps<{
  date: string
  code: number | null | undefined
  min?: number
  max?: number
  pop?: number
  units: Units
}>()

const dayLabel = computed(() => {
  const d = new Date(props.date)
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
})
</script>

<template>
  <div class="surface" style="padding:.8rem; text-align:center;">
    <div class="text-muted small">{{ dayLabel }}</div>
    <div style="margin:.35rem 0;">
      <WeatherIcon :code="code" :size="26" />
    </div>
    <div style="display:flex; justify-content:center; gap:.5rem; align-items:baseline;">
      <span class="text-strong">{{ Math.round(max ?? 0) }}{{ tempUnitSymbol(units) }}</span>
      <span class="text-muted">{{ Math.round(min ?? 0) }}{{ tempUnitSymbol(units) }}</span>
    </div>
    <div class="small text-muted" style="margin-top:.25rem;">POP {{ Math.round(pop ?? 0) }}%</div>
  </div>
</template>

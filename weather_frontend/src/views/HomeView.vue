<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/weather/useWeatherStore'
import WeatherCard from '@/components/weather/WeatherCard.vue'
import ForecastDayCard from '@/components/weather/ForecastDayCard.vue'
import LoadingSkeleton from '@/components/weather/LoadingSkeleton.vue'
import ErrorAlert from '@/components/weather/ErrorAlert.vue'
import type { DailyBlock } from '@/weather/WeatherService'

const store = useWeatherStore()

type DayItem = {
  date: string
  min?: number
  max?: number
  code?: number
  pop?: number
}

const forecastDays = computed<DayItem[]>(() => {
  const d: DailyBlock | undefined = store.weather?.daily
  if (!d) return []
  const days: DayItem[] = []
  for (let i = 0; i < Math.min(d.time.length, 7); i++) {
    days.push({
      date: d.time[i],
      min: d.temperature_2m_min?.[i],
      max: d.temperature_2m_max?.[i],
      code: d.weather_code?.[i] ?? d.weathercode?.[i],
      pop: d.precipitation_probability_max?.[i] ?? d.precipitation_probability_mean?.[i],
    })
  }
  return days
})
</script>

<template>
  <section style="display:flex; flex-direction: column; gap: 1rem;">
    <ErrorAlert v-if="store.error" :message="store.error" @close="store.clearError" />

    <LoadingSkeleton v-if="store.loading" />

    <template v-else>
      <WeatherCard
        v-if="store.location && store.weather?.current"
        :location="store.location"
        :current="store.weather.current"
        :units="store.units"
        :timezone="store.weather.timezone"
        :hourly="store.weather.hourly"
      />

      <div v-if="forecastDays.length" class="card" style="padding: 1rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:.5rem;">
          <h3 style="font-size:1.05rem; font-weight:700; color:#0f172a;">Next Days</h3>
          <div class="text-muted small">5-7 day forecast</div>
        </div>
        <div class="grid cols-5" style="grid-template-columns: repeat( auto-fit, minmax(130px, 1fr) );">
          <ForecastDayCard
            v-for="(d, idx) in forecastDays"
            :key="idx"
            :date="d.date"
            :code="d.code"
            :min="d.min"
            :max="d.max"
            :pop="d.pop"
            :units="store.units"
          />
        </div>
      </div>

      <div v-if="!store.location && !store.loading" class="surface" style="padding:1rem; text-align:center;">
        <div style="font-weight:700; color:#0f172a;">Search a city to see the weather</div>
        <div class="text-muted small">Try: London, New York, Tokyo</div>
      </div>
    </template>
  </section>
</template>

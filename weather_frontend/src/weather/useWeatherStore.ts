import { ref, computed, reactive } from 'vue'
import type { Units } from './config'
import { getCurrentAndForecast, type WeatherResponse, type LocationResult } from './WeatherService'

type UnitPref = Units

const UNIT_KEY = 'weather.units'

declare global {
  interface Window {
    __weatherStore?: unknown
  }
}

/**
 * PUBLIC_INTERFACE
 */
export function useWeatherStore() {
  /** Simple singleton-like composable store */
  if (typeof window !== 'undefined' && window.__weatherStore) {
    return window.__weatherStore as ReturnType<typeof buildStore>
  }
  const store = buildStore()
  if (typeof window !== 'undefined') {
    window.__weatherStore = store
  }
  return store
}

function buildStore() {
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const location = ref<LocationResult | null>(null)

  const initialUnits = (localStorage.getItem(UNIT_KEY) as UnitPref | null) ?? 'metric'
  const units = ref<UnitPref>(initialUnits)

  const weather = ref<WeatherResponse | null>(null)
  const lastUpdated = ref<Date | null>(null)

  async function selectLocation(loc: LocationResult) {
    location.value = loc
    await refresh()
  }

  async function refresh() {
    if (!location.value) return
    loading.value = true
    error.value = null
    try {
      weather.value = await getCurrentAndForecast(location.value.latitude, location.value.longitude, units.value)
      lastUpdated.value = new Date()
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load weather'
      error.value = msg
    } finally {
      loading.value = false
    }
  }

  function setUnits(next: UnitPref) {
    units.value = next
    localStorage.setItem(UNIT_KEY, next)
    // Refetch using new units if a location is selected
    if (location.value) void refresh()
  }

  function clearError() { error.value = null }

  const hasData = computed(() => !!weather.value && !!location.value)

  const state = reactive({
    loading, error, location, weather, units, lastUpdated, hasData,
    selectLocation, refresh, setUnits, clearError
  })
  return state
}

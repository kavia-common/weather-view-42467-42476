import { getApiBase, getGeocodeBase, type Units } from './config'

export interface LocationResult {
  id?: string | number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
  timezone?: string
}

/** Shapes based on Open-Meteo API */
export interface CurrentBlock {
  time?: string
  temperature_2m: number
  apparent_temperature: number
  relative_humidity_2m?: number
  wind_speed_10m: number
  weather_code?: number
  weathercode?: number
}
export interface HourlyBlock {
  time: string[]
  temperature_2m?: number[]
  apparent_temperature?: number[]
  relative_humidity_2m?: number[]
  precipitation_probability?: number[]
  weather_code?: number[]
  wind_speed_10m?: number[]
}
export interface DailyBlock {
  time: string[]
  weather_code?: number[]
  weathercode?: number[]
  temperature_2m_max?: number[]
  temperature_2m_min?: number[]
  precipitation_probability_max?: number[]
  precipitation_probability_mean?: number[]
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  current?: CurrentBlock
  hourly?: HourlyBlock
  daily?: DailyBlock
}

// Map unit system to open-meteo params
function mapUnits(units: Units) {
  return {
    temperature_unit: units === 'imperial' ? 'fahrenheit' : 'celsius',
    wind_speed_unit: units === 'imperial' ? 'mph' : 'kmh',
    precipitation_unit: 'mm'
  }
}

// PUBLIC_INTERFACE
export async function searchLocations(name: string): Promise<LocationResult[]> {
  /** Search locations using Open-Meteo geocoding */
  const u = new URL('/v1/search', getGeocodeBase())
  u.searchParams.set('name', name)
  u.searchParams.set('count', '8')
  u.searchParams.set('language', 'en')
  u.searchParams.set('format', 'json')
  const res = await fetch(u.toString())
  if (!res.ok) throw new Error('Failed to search locations')
  const data: { results?: Array<Record<string, unknown>> } = await res.json()
  const results = (data?.results ?? [])
  return results.map((r) => ({
    id: r['id'] as string | number | undefined,
    name: r['name'] as string,
    country: r['country'] as string | undefined,
    admin1: r['admin1'] as string | undefined,
    latitude: r['latitude'] as number,
    longitude: r['longitude'] as number,
    timezone: r['timezone'] as string | undefined
  }))
}

// PUBLIC_INTERFACE
export async function getCurrentAndForecast(lat: number, lon: number, units: Units): Promise<WeatherResponse> {
  /**
   * Fetch current and 7-day forecast using Open-Meteo forecast API.
   * We request current and daily metrics.
   */
  const u = new URL('/v1/forecast', getApiBase())
  u.searchParams.set('latitude', String(lat))
  u.searchParams.set('longitude', String(lon))
  // Current conditions
  u.searchParams.set('current', [
    'temperature_2m','apparent_temperature','relative_humidity_2m','wind_speed_10m',
    'weather_code'
  ].join(','))
  // Hourly for optional details
  u.searchParams.set('hourly', [
    'temperature_2m','apparent_temperature','relative_humidity_2m','precipitation_probability',
    'weather_code','wind_speed_10m'
  ].join(','))
  // Daily forecast
  u.searchParams.set('daily', [
    'weather_code','temperature_2m_max','temperature_2m_min','precipitation_probability_max'
  ].join(','))
  const m = mapUnits(units)
  u.searchParams.set('temperature_unit', m.temperature_unit)
  u.searchParams.set('wind_speed_unit', m.wind_speed_unit)
  u.searchParams.set('precipitation_unit', m.precipitation_unit)
  u.searchParams.set('timezone', 'auto')

  const res = await fetch(u.toString())
  if (!res.ok) throw new Error('Failed to fetch weather')
  const data = await res.json() as WeatherResponse
  return data
}

export type Units = 'metric' | 'imperial'

/**
 * PUBLIC_INTERFACE
 */
export function getApiBase(): string {
  /** Get API base from VITE_API_BASE or default to Open-Meteo public endpoint */
  const base = import.meta.env.VITE_API_BASE as string | undefined
  return (base && base.trim().length > 0) ? base : 'https://api.open-meteo.com'
}

/**
 * PUBLIC_INTERFACE
 */
export function getGeocodeBase(): string {
  /** Open-Meteo geocoding base */
  return 'https://geocoding-api.open-meteo.com'
}

/**
 * PUBLIC_INTERFACE
 */
export function tempUnitSymbol(units: Units): string {
  return units === 'imperial' ? '°F' : '°C'
}

/**
 * PUBLIC_INTERFACE
 */
export function windUnit(units: Units): string {
  return units === 'imperial' ? 'mph' : 'km/h'
}

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: number | null | undefined
  size?: number
}>()

const size = computed(() => props.size ?? 28)

function iconFor(code?: number | null) {
  const c = code ?? 0
  // Simplified mapping
  if (c === 0) return 'sun'
  if ([1,2,3].includes(c)) return 'cloud-sun'
  if ([45,48].includes(c)) return 'fog'
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(c)) return 'rain'
  if ([71,73,75,77,85,86].includes(c)) return 'snow'
  if ([95,96,99].includes(c)) return 'storm'
  return 'cloud'
}
</script>

<template>
  <span :title="String(code ?? '')" :style="{display:'inline-flex',alignItems:'center',justifyContent:'center'}">
    <svg v-if="iconFor(code)==='sun'" :width="size" :height="size" viewBox="0 0 24 24" fill="#F59E0B"><circle cx="12" cy="12" r="5"/><g stroke="#F59E0B" stroke-width="2"><path d="M12 1v3"/><path d="M12 20v3"/><path d="M4.22 4.22l2.12 2.12"/><path d="M17.66 17.66l2.12 2.12"/><path d="M1 12h3"/><path d="M20 12h3"/><path d="M4.22 19.78l2.12-2.12"/><path d="M17.66 6.34l2.12-2.12"/></g></svg>
    <svg v-else-if="iconFor(code)==='cloud-sun'" :width="size" :height="size" viewBox="0 0 24 24"><circle cx="7" cy="10" r="3" fill="#F59E0B"/><path d="M8 18h8a4 4 0 0 0 0-8 5 5 0 0 0-9.7 1.3" fill="#e5e7eb" stroke="#9ca3af"/></svg>
    <svg v-else-if="iconFor(code)==='rain'" :width="size" :height="size" viewBox="0 0 24 24"><path d="M6 16h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.6" fill="#e5e7eb" stroke="#9ca3af"/><g fill="#2563EB"><circle cx="8" cy="20" r="1.5"/><circle cx="12" cy="21" r="1.3"/><circle cx="16" cy="20" r="1.4"/></g></svg>
    <svg v-else-if="iconFor(code)==='snow'" :width="size" :height="size" viewBox="0 0 24 24"><path d="M6 16h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.6" fill="#e5e7eb" stroke="#9ca3af"/><g fill="#93c5fd"><circle cx="9" cy="20" r="1.2"/><circle cx="12" cy="21" r="1.2"/><circle cx="15" cy="20" r="1.2"/></g></svg>
    <svg v-else-if="iconFor(code)==='storm'" :width="size" :height="size" viewBox="0 0 24 24"><path d="M6 16h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.6" fill="#e5e7eb" stroke="#9ca3af"/><path d="M10 18l2-4H9l2-4" stroke="#EF4444" stroke-width="2" fill="none"/></svg>
    <svg v-else-if="iconFor(code)==='fog'" :width="size" :height="size" viewBox="0 0 24 24"><path d="M4 10h12" stroke="#9ca3af" stroke-width="2"/><path d="M3 14h14" stroke="#9ca3af" stroke-width="2"/><path d="M5 18h12" stroke="#9ca3af" stroke-width="2"/></svg>
    <svg v-else :width="size" :height="size" viewBox="0 0 24 24"><path d="M6 16h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.6" fill="#e5e7eb" stroke="#9ca3af"/></svg>
  </span>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LocationSearch from '@/components/weather/LocationSearch.vue'
import UnitToggle from '@/components/weather/UnitToggle.vue'
</script>

<template>
  <div class="app-shell">
    <header class="header-gradient surface" style="padding: 1rem 1.25rem; margin-bottom: 1rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap: 1rem; flex-wrap: wrap;">
        <div style="display:flex; align-items:center; gap:.75rem;">
          <div style="width:40px;height:40px;border-radius:10px;background:#1e40af;display:flex;align-items:center;justify-content:center;color:white;box-shadow: var(--op-shadow);">
            <span style="font-weight:700;">W</span>
          </div>
          <div>
            <div style="font-size:1.15rem;font-weight:700;color:#0f172a;">WeatherView</div>
            <div class="text-muted small">Ocean Professional</div>
          </div>
        </div>
        <div style="flex:1; min-width: 260px;">
          <LocationSearch />
        </div>
        <div style="display:flex; align-items:center; gap:.5rem;">
          <UnitToggle />
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer style="margin-top: 1.25rem;">
      <div class="surface" style="padding:.85rem 1rem; display:flex; align-items:center; justify-content:space-between; gap:.75rem;">
        <div class="text-muted small">Tip: Toggle units between °C and °F anytime.</div>
        <div class="badge">Built with Vue 3 + Vite</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell { display: flex; flex-direction: column; gap: .5rem; }
main { min-height: 55vh; }
</style>

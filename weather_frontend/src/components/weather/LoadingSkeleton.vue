<script setup lang="ts">
</script>

<template>
  <div class="card" style="padding:1rem;">
    <div style="display:flex; justify-content:space-between; gap:1rem; align-items:center; flex-wrap:wrap;">
      <div style="display:flex; gap:.9rem; align-items:center;">
        <div style="width:42px;height:42px;border-radius:50%;background:#e5e7eb; animation:pulse 1.2s infinite;"></div>
        <div>
          <div style="width:180px;height:18px;background:#e5e7eb;border-radius:6px; animation:pulse 1.2s infinite;"></div>
          <div style="width:120px;height:12px;background:#e5e7eb;border-radius:6px; margin-top:.4rem; animation:pulse 1.2s infinite;"></div>
        </div>
      </div>
      <div style="width:140px;height:28px;background:#e5e7eb;border-radius:6px; animation:pulse 1.2s infinite;"></div>
    </div>

    <div class="divider" style="margin:.75rem 0;"></div>

    <div style="display:flex; gap:.75rem; flex-wrap:wrap;">
      <div v-for="i in 3" :key="i" class="surface" style="padding:.7rem .9rem;">
        <div style="width:80px;height:14px;background:#e5e7eb;border-radius:6px; animation:pulse 1.2s infinite;"></div>
      </div>
    </div>
  </div>

  <div class="grid cols-5" style="grid-template-columns: repeat( auto-fit, minmax(130px, 1fr) ); margin-top:1rem;">
    <div v-for="i in 6" :key="i" class="surface" style="padding:1rem;">
      <div style="width:90px;height:12px;background:#e5e7eb;border-radius:6px; animation:pulse 1.2s infinite;"></div>
      <div style="width:26px;height:26px;background:#e5e7eb;border-radius:6px; margin:.35rem auto; animation:pulse 1.2s infinite;"></div>
      <div style="display:flex; gap:.5rem; justify-content:center;">
        <div style="width:40px;height:14px;background:#e5e7eb;border-radius:6px; animation:pulse 1.2s infinite;"></div>
        <div style="width:40px;height:14px;background:#e5e7eb;border-radius:6px; animation:pulse 1.2s infinite;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: .6; }
  50% { opacity: 1; }
}
</style>

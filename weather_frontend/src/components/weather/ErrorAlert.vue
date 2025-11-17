<script setup lang="ts">
defineProps<{ message: string }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="card" style="padding:.75rem; border-left:4px solid var(--op-error); background:#fef2f2;">
    <div style="display:flex; justify-content:space-between; align-items:center; gap:.5rem;">
      <div style="color:#991b1b; font-weight:600;"><slot>{{ message }}</slot></div>
      <button class="btn" style="background:#fecaca; color:#7f1d1d;" @click="emit('close')">Dismiss</button>
    </div>
  </div>
</template>

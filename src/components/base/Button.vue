<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  kind?: string;
}>();
</script>

<template>
  <button
    class="py-3 px-6"
    :class="[
      kind === 'danger'
        ? 'bg-red-400 hover:bg-red-500'
        : 'bg-accent hover:opacity-70',
      disabled ? 'opacity-50' : '',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

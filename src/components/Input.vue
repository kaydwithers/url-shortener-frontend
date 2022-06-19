<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  modelValue: string;
  required: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="mb-4">
    <label class="mb-2 block" :for="id">{{ label }}</label>
    <input
      class="w-full"
      :id="id"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

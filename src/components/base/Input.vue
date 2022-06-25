<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  modelValue: string;
  required: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const inputHandler = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
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
      @input="inputHandler"
    />
  </div>
</template>

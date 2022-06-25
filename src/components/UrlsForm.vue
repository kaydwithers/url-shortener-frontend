<script setup lang="ts">
import { ref } from "vue";

import { useUrl } from "@/composables/useUrl";

import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const { addUrl, getUrls } = useUrl();

const inputText = ref("");

const submitHandler = async (event: Event) => {
  event.preventDefault();
  await addUrl(inputText.value);
  await getUrls();
};
</script>

<template>
  <div class="mb-10">
    <form @submit="submitHandler">
      <Input
        id="longUrl"
        label="Add a URL"
        placeholder="e.g. http://google.com"
        required
        type="url"
        v-model="inputText"
      />

      <Button class="transition hover:scale-90" type="submit">Add URL</Button>
    </form>
  </div>
</template>

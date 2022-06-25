<script setup lang="ts">
import { onMounted } from "vue";

import { useHttpClient } from "@/composables/useHttp";
import { useUrl } from "@/composables/useUrl";

import Form from "./Form.vue";
import List from "./List.vue";

const { error, isLoading } = useHttpClient();
const { getUrls, urls } = useUrl();

onMounted(async () => {
  await getUrls();
});
</script>

<template>
  <main>
    <Form />
    <List :error="error" :isLoading="isLoading" :items="urls" />
  </main>
</template>

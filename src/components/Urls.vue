<script setup lang="ts">
import { onMounted } from "vue";

import { useHttpClient } from "@/composables/useHttp";
import { useUrl } from "@/composables/useUrl";

import UrlsForm from "./UrlsForm.vue";
import UrlsList from "./UrlsList.vue";

const { error, isLoading } = useHttpClient();
const { getUrls, urls } = useUrl();

onMounted(async () => {
  await getUrls();
});
</script>

<template>
  <UrlsForm />
  <UrlsList :error="error" :isLoading="isLoading" :items="urls" />
</template>

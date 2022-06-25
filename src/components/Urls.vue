<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useHttpClient } from "@/composables/useHttp";
import { useUrl } from "@/composables/useUrl";

import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import UrlsList from "./UrlsList.vue";

const { error, isLoading } = useHttpClient();
const { addUrl, getUrls, urls } = useUrl();

const inputText = ref("");

const submitHandler = async (event: Event) => {
  event.preventDefault();
  await addUrl(inputText.value);
  await getUrls();
};

onMounted(async () => {
  await getUrls();
});
</script>

<template>
  <div>
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

        <Button class="transition hover:scale-90" type="submit">
          Add URL
        </Button>
      </form>
    </div>

    <UrlsList :error="error" :isLoading="isLoading" :items="urls" />
  </div>
</template>

<script setup lang="ts">
import { API_URL } from "@/lib/const";
import { useUrl } from "@/composables/useUrl";

import type { UrlInterface } from "@/lib/interfaces/urlInterface";

defineProps<{
  error: string;
  isLoading: boolean;
  items: Array<UrlInterface>;
}>();

const { deleteUrl, getUrls } = useUrl();

const deleteHandler = async (shortUrl: string) => {
  await deleteUrl(shortUrl);
  await getUrls();
};
</script>

<template>
  <div class="mb-4 flex w-full justify-between text-center">
    <div class="flex-1 text-left">
      <h4 class="font-medium">Full URL</h4>
    </div>

    <div class="flex-1 text-center">
      <h4 class="font-medium">Short URL</h4>
    </div>

    <div class="flex-1 text-center">
      <h4 class="font-medium">Clicks</h4>
    </div>

    <div class="flex-1 text-right">
      <h4 class="font-medium"></h4>
    </div>
  </div>

  <div class="flex w-full flex-col justify-between text-center">
    <div v-if="isLoading" class="text-left">
      <p>Loading&hellip;</p>
    </div>

    <div v-else-if="!isLoading && error" class="text-left">
      <p>Sorry, there was an error: {{ error }}</p>
    </div>

    <div
      v-else
      v-for="(item, index) in items"
      :key="index"
      class="mb-2 flex flex-row"
    >
      <div class="flex-1 text-left">
        <a :href="item.full" class="underline">
          {{ item.full }}
        </a>
      </div>

      <div class="flex-1 text-center">
        <a :href="`${API_URL}/${item.short}`" class="underline">
          {{ item.short }}
        </a>
      </div>

      <div class="flex-1 text-center">
        <p>{{ item.clicks }}</p>
      </div>

      <div class="flex-1 text-right">
        <button
          class="p-1 transition hover:rotate-45"
          @click="deleteHandler(item.short)"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

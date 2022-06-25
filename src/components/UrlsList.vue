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
  <div class="flex w-full flex-col justify-between text-center">
    <div v-if="isLoading" class="text-left">
      <p>Loading&hellip;</p>
    </div>

    <div v-else-if="!isLoading && error" class="text-left">
      <p>Sorry, there was an error: {{ error }}</p>
    </div>

    <table v-else>
      <tr>
        <th class="pb-4 text-left">Full URL</th>
        <th class="pb-4">Short URL</th>
        <th class="pb-4">Clicks</th>
        <th class="pb-4">Delete</th>
      </tr>
      <tr v-for="(item, index) in items" :key="index">
        <td class="text-left">
          {{ item.full }}
        </td>
        <td>
          <a :href="`${API_URL}/${item.short}`" class="underline">
            {{ item.short }}
          </a>
        </td>
        <td>
          {{ item.clicks }}
        </td>
        <td>
          <button
            class="p-2 transition hover:rotate-45"
            @click="deleteHandler(item.short)"
          >
            🗑️
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { REDIRECT_URL } from "@/lib/const";
import { useHttpClient } from "@/composables/useHttp";
import { useUrl } from "@/composables/useUrl";

import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";

const { error, isLoading } = useHttpClient();
const { addUrl, deleteUrl, getUrls, urls } = useUrl();

const inputText = ref("");

const deleteHandler = async (shortUrl: string) => {
  await deleteUrl(shortUrl);
  await getUrls();
};

const urlSubmitHandler = async (event: Event) => {
  event.preventDefault();
  await addUrl(inputText.value);
  await getUrls();
};

getUrls();
</script>

<template>
  <div>
    <div v-if="isLoading">
      <p>Loading&hellip;</p>
    </div>

    <div v-else-if="!isLoading && error" class="text-red-700">
      <p>{{ error }}</p>
    </div>

    <div v-else class="">
      <div class="mb-10">
        <form @submit="urlSubmitHandler">
          <Input
            id="longUrl"
            label="Add a URL"
            placeholder="e.g. http://google.com"
            required
            type="url"
            v-model="inputText"
          />

          <Button class="transition hover:scale-90" type="submit">Go</Button>
        </form>
      </div>

      <div class="mb-2 flex w-full justify-between text-center">
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
        <div v-for="(url, index) in urls" :key="index" class="flex flex-row">
          <div class="flex-1 text-left">
            <a :href="url.full" class="underline">
              {{ url.full }}
            </a>
          </div>

          <div class="flex-1 text-center">
            <a :href="`${REDIRECT_URL}/${url.short}`" class="underline">
              {{ url.short }}
            </a>
          </div>

          <div class="flex-1 text-center">
            <p>{{ url.clicks }}</p>
          </div>

          <div class="flex-1 text-right">
            <button
              class="transition hover:rotate-45"
              @click="deleteHandler(url.short)"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

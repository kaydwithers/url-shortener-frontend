<script setup lang="ts">
import Header from "@/components/Header.vue";
import Urls from "@/components/Urls.vue";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-24">
    <Header />

    <main>
      <Urls />
    </main>
  </div>
</template>

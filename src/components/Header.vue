<template>
  <header class="bg-white dark:bg-gray-900">
    <div class="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Rails Redirects in Seconds
        </p>
        <p class="max-w-xl mx-auto mt-5 text-xl text-gray-400">
          Quickly create redirects for a Rails apps without any coding experience. Proven to annoy developers 100% less.
        </p>
      </div>

      <div class="flex justify-center mt-8">
        <slot />
      </div>
    </div>
  </header>
</template>

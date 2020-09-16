<template>
  <div id="app" class="relative overflow-hidden bg-gray-50">
    <Main />
    <div class="fixed bottom-0 left-0">
      <Wave />
    </div>
  </div>
</template>

<script>
import Main from '@/components/Main'
import Wave from '@/components/Wave'

export default {
  components: {
    Main,
    Wave,
  },
}
</script>
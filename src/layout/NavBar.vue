<script setup>
// defineProps({
//   drawer: { Boolean }
// })
</script>

<template>
  <slot>

  </slot>
</template>
<script>
export default {
  methods: {
    changeLanguage(langType){
      this.$emit('changeLanguage', langType)
    }
  }
}
</script>
<template>
  <div></div>
</template>

<script>
export default {
  name: 'notice-message',
  data () {
    return {
      message: '',
      title: '',
      show: false
    }
  },
  computed: {
    notice () {
      return this.$store.state.global.noticeQueue;
    }
  },
  watch: {
    notice (value) {
      this.$alertify.success(`<div class="text-info">From: ${value[value.length - 1].source}, <br />${value[value.length - 1].message}</div>`);
    }
  }
}
</script>

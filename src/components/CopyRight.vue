<template>
<a-affix :offset-bottom="0">
  <div class="copy-right" :style="{backgroundColor: bgColor}">
    Copyright &copy; 2020-2020 Hxl All Rights Reserved
  </div>
</a-affix>
</template>
<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'black'
    }
  }
}
</script>
<style scoped>
.copy-right {
  text-align: center;
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  /* background-color: black; */
  color: white;
}
</style>
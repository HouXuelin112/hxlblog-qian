<template>
  <a-timeline mode="alternate" :pending="true" :reverse="true">
    <a-timeline-item v-for="(diary, i) in diarys" :key="i" :color="diary.color">
      <a-icon v-if="diary.dot" slot="dot" :type="diary.dot.type" :style="diary.dot.style" />
      <DiaryCard :diary="diary" :number="i" :total="diarys.length"></DiaryCard>
    </a-timeline-item>
  </a-timeline>
</template>
<script>
import DiaryCard from './DiaryCard.vue'
export default {
  components: {
    DiaryCard
  },
  props: {
    diarys: {
      type: Array,
      default: () => {
        return [
        ]
      }
    }
  }
}
</script>
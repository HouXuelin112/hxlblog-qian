<template>
  <div class="recentGuest">
    <h3 class="title"><b>最近访客</b></h3>
    <a-list>
      <a-list-item class="items" v-for="(guest,i) in recentVisitors" :key="i">
        <img :src="'data:image/png;base64,' + guest.head"/>
        <p>{{ guest.nickName }}</p>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  props: {
     recentVisitors: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped lang="scss">
.recentGuest {
  box-shadow: 0 0 5px grey;
  background: whitesmoke;
  position: relative;
  .title {
    background-color: rgba(17, 16, 16, .38);
    padding: 3px;
    border-bottom: 2px solid white;
  }
  .items {
    box-shadow: 0 0 5px grey;
    background-color: dimgrey;
    width: 30%;
    margin: 1.6%;
    height: 80px;
    float: left;
    position: relative;
    cursor: pointer;

    &:hover {
      transform: scale(1.5, 1.5);
      z-index: 10;
    }
    img {
      width: 100%;
      height: 80px;
      display: block;
      padding: 0;
      margin: 0;
      position: absolute;
      &:hover {
        cursor: pointer;
      }
    }
    p {
      background-color: grey;
      opacity: .8;
      text-align: center;
      font-size: 10px;
      width: 100%;
      overflow: hidden;
      position: absolute;
      bottom: 0px;
      z-index: 2;
    }
  }
}
</style>
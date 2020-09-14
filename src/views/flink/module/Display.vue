<template>
<div class="flink-card clearfix">
  <a :href="flink.addr">
    <div class="left common">
      <img :src="flink.icon"/>
    </div>
    <div class="right common">
      <h3>{{ flink.name }}</h3>
      <p>{{ flink.description }}</p>
    </div>
  </a>
</div>
</template>
<script>
export default {
  props: {
    flink: {
      type: Object,
      default: () => {
        return {
          name: 'test',
          addr: 'http://www.baidu.com',
          description: '百度一下，你就完蛋',
          icon: require('../../../assets/logo.png')
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
@media screen and (max-width: 1200px){
  .flink-card {
  display: inline-block;
  width: 30%;
  margin: 10px 1.6%;
  border: 1px solid #ece9eb;
  position: relative;
  z-index: 10;
  &:hover {
    box-shadow: 0px 5px 5px grey;
    transform: scale(1.02);
  }
  .common {
    height: 100px;
  }
  .left {
    float: left;
    width: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    float: right;
    width: 65%;
    padding-top: 10px;
  }
}
}
@media screen and(min-width: 1200px) {
  .flink-card {
  display: inline-block;
  width: 20%;
  margin: 10px 2.5%;
  border: 1px solid #ece9eb;
  position: relative;
  z-index: 10;
  &:hover {
    box-shadow: 0px 5px 5px grey;
    transform: scale(1.02);
  }
  .common {
    height: 100px;
  }
  .left {
    float: left;
    width: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    float: right;
    width: 65%;
    padding-top: 10px;
  }
}
}
</style>
<template>
  <div class="search-box-and-tags" ref="searchAndTags">
    <div class="search">
      <a-auto-complete style="width: 80%"
        class="global-search"
        placeholder="检索博文"
        size="large"
        :backfill="true"
        @search="handleSearch"
        @change="onChange"
      >
        <template slot="dataSource">
          <a-select-option v-for="email in result" :key="email">
            {{ email }}
          </a-select-option>
        </template>
      </a-auto-complete>
      <a-button
        style="width: 20%"
        class="search-btn"
        size="large"
        type="primary"
        @click="onSearch"
      >
        <a-icon type="search" />
      </a-button>
    </div>
    <div class="tags">
      <a-list>
        <a-list-item class="items" v-for="(tag, i) in tags" :key="i" @click="onClick(tag)"> {{ tag.tagName }}</a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
import service from '@/utils/requests.js'
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      result: [],
      selectValue: ''
    };
  },
  methods: {
    onClick(tag) {
      this.$emit('tagClick', tag)
    },
    handleSearch(value) {
      this.result = []
      const qs = require('qs')
      service.request({
        url: '/getTips',
        method: 'post',
        data: qs.stringify({
          text: value
        })
      }).then(res => {
        console.log(res)
        res.forEach(b => {
          if (!this.result.includes(b.title)){
            this.result.push(b.title)
          }
        })
      })
    },
    onChange (value) {
      this.selectValue = value
    },
    onSearch () {
      if (this.selectValue.trim() === '') {
        return 0
      }
      this.$emit('search', this.selectValue.trim())
    },
    getAffixTarget () {
      return this.$refs.searchAndTags
    }
  },
}
</script>
<style scoped lang="scss">
.search-box-and-tags {
  box-shadow: 0 0 5px grey;
  .search {
    width: 100%;
    background-color: gray;
    opacity: .6;
    padding: 20px 10px;
  }
  .tags {
    background: whitesmoke;
    opacity: .6;
    font-size: 16px;
    text-indent: 20px;
    color: black;
    .items {
      &:hover {
        background-color: bisque;
        opacity: .6;
        border-right: 5px solid grey;
      }
    }
  }
}
</style>
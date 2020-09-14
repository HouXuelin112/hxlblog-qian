import Home from "../views/Home.vue";
import ReadBlogPage from "../views/blog/ReadBlogPage.vue";
import BlogDisplay from "../views/blog/BlogDisplay.vue";
import MessageContainer from '../views/message/MessageContainer.vue'
import Diary from '../views/diary/Diary.vue'
import Flink from '../views/flink/FlinkContainer.vue'
import About from '../views/about/AboutContainer.vue'

// 路由配置
export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    description: '首页'
  },
  {
    path: "/blog/display",
    name: "blogDisplay",
    component: BlogDisplay,
    description: '博客展示'
  },
  {
    path: "/blog/read/:id",
    name: "readBlog",
    component: ReadBlogPage,
    description: '博文阅读'
  },
  {
    path: "/message",
    name: "message",
    component: MessageContainer,
    description: '留言'
  },
  {
    path: "/diary",
    name: "diary",
    component: Diary,
    description: '日记'
  },
  {
    path: "/flink",
    name: "flink",
    component: Flink,
    description: '友链'
  },
  {
    path: "/about",
    name: "about",
    component: About,
    description: '关于'
  }
];
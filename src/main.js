// 入口文件
import Vue from 'vue';
import app from './App.vue';
import { Header,Tabbar, TabItem,TabContainer, TabContainerItem } from 'mint-ui';
import 'mint-ui/lib/style.css'; 
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

new Vue({
    render :h=>h(app)
}).$mount("#app")
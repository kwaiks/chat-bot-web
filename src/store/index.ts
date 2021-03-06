import Vue from "vue";
import Vuex from "vuex";
import chat from "./modules/chats";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chat,
    user
  }
});

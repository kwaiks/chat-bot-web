import { MutationTree } from "vuex";

interface UserState {
  name: string;
  lang: string;
}

const state: UserState = {
  name: "",
  lang: ""
};

const mutations: MutationTree<UserState> = {
  setName(state, payload: string) {
    state.name = payload;
  },
  setLang(state, payload: string) {
    state.lang = payload;
  }
};

export default {
  state,
  mutations
};

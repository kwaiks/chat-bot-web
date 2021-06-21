import { ActionTree, MutationTree } from "vuex";
import { Chat } from "@/types";
import axios from "axios";

interface Intent {
  intent: string;
  count: number;
}

interface ChatState {
  chats: Array<Chat>;
  lastIntent: Intent;
}

const state: ChatState = {
  chats: [],
  lastIntent: {
    intent: "",
    count: 0,
  },
};

const mutations: MutationTree<ChatState> = {
  addMessage(state, payload: Chat) {
    state.chats.push(payload);
  },
  setIntent(state, payload: string) {
    if (payload === state.lastIntent.intent) {
      state.lastIntent.count += 1;
    } else {
      state.lastIntent.intent = payload;
      state.lastIntent.count = 0;
    }
  },
};

const actions: ActionTree<Array<Chat>, any> = {
  async sendMessage({ commit, rootState }, payload: string) {
    commit("addMessage", {
      message: payload,
      received: false,
    });
    try {
      const { data } = await axios.post("http://localhost:8888/ask", {
        lang: "en",
        question: payload,
      });
      commit("setIntent", data.intent);
      console.log(rootState);
      if (rootState.chat.lastIntent.count >= 3) {
        commit("addMessage", {
          message:
            "You've been asking it more than 3 times. I won't answer you",
          received: true,
        });
      } else {
        let msg = data.answer;
        if (msg.includes("{{name}}")) {
          msg = msg.replace("{{name}}", rootState.user.name);
        }
        commit("addMessage", {
          message: msg,
          received: true
        });
      }
    } catch (err) {
      console.error(err);
      commit("addMessage", {
        message: "Seems like i have an error",
        received: true,
      });
    }
  }
};

export default {
  state,
  actions,
  mutations,
};

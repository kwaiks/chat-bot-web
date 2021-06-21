<template>
  <div class="main">
    <div class="header">
      <a href="https://kwaiks.me" style="text-decoration:none;color: white">Kwaiks.me</a>
    </div>
    <div class="chat-wrapper">
      <div class="chat-main">
        <Chat />
      </div>
      <div class="chat-sidebar">
        <div class="question-wrapper">
          <div class="question-header">
            <span>Most Asked Questions</span>
          </div>
          <div class="question-content">
            <div
              class="question-item"
              v-for="(item, index) in freqQuestion"
              :key="index"
            >
              {{ item.message }}
            </div>
          </div>
        </div>
        <div class="question-wrapper">
          <div class="question-header">
            <span>Most Unanswered Questions</span>
          </div>
          <div class="question-content">
            <div
              class="question-item"
              v-for="(item, index) in unQuestion"
              :key="index"
            >
              <span>{{ item.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">Copyright © 2020 Kwaiks</div>
    <modal name="landingModal" :clickToClose="false">
      <div class="modal-content">
        <span>Please input your name</span>
        <div>
          <input
            v-model="username"
            type="text"
            placeholder="Type your message here..."
            @keyup="onKeyPress"
          />
        </div>
        <button @click="insertName">Enter</button>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chat from "./Chat.vue";
import { getFrequentQuestions, getUnansweredQuestions } from "@/api";

@Component({
  components: {
    Chat,
  },
})
export default class Web extends Vue {
  private username = "";
  private freqQuestion: Array<object> = [];
  private unQuestion: Array<object> = [];

  mounted() {
    this.$modal.show("landingModal");
    getFrequentQuestions()
      .then((val) => {
        this.freqQuestion = val;
      })
      .catch(() => ({}));
    getUnansweredQuestions()
      .then((val) => {
        this.unQuestion = val;
      })
      .catch(() => ({}));
  }

  insertName() {
    this.$modal.hide("landingModal");
    this.$store.commit("setName", this.username);
    let message = `Hey, ${this.username}.\nMy name is Alex`;
    this.$store.commit("addMessage", {
      message,
      received: true,
    });
    message = "You can ask me anything.";
    setTimeout(() => {
      this.$store.commit("addMessage", {
        message,
        received: true,
      });
    }, 800);
  }

  onKeyPress(e: KeyboardEvent) {
    if (e.keyCode === 13 && this.username !== "") {
      this.insertName();
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-image: url("https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-wrapper {
  display: flex;
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 10px;
}
.chat-main {
  flex: 4;
}
.chat-sidebar {
  flex: 2;
  display: flex;
  flex-direction: column;
}
.modal-content {
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.footer {
  position: absolute;
  bottom: 20px;
  color: white;
}
.header {
  position: absolute;
  top: 20px;
  width: 80%;
}
.question-wrapper {
  flex: 1;
}

.question-content {
  padding: 0;
  margin: 0;
  list-style: none;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: center;
}

.question-item {
}

</style>

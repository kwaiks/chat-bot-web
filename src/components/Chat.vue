<template>
  <div class="c-wrapper">
    <div class="chats" ref="chatWrapper">
      <div v-for="(chat, index) in messages" :key="index">
        <chat-baloon :message="chat.message" :received="chat.received" />
      </div>
    </div>
    <div class="chat-input">
      <div class="input-wrapper">
        <input
          v-model="inputMessage"
          @keyup="enterPress"
          type="text"
          placeholder="Type your message here..."
        />
        <div class="send-button" @click="sendMessage">
          <vue-material-icon name="send" :size="30" color="red" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import ChatBaloon from "./ChatBaloon.vue";

@Component({
  components: {
    ChatBaloon
  }
})
export default class Chat extends Vue {
  @Ref() chatWrapper!: HTMLElement;
  private inputMessage = "";
  private typingState = true;

  get messages() {
    return this.$store.state.chat.chats;
  }

  private scrollToEnd() {
    const container = this.chatWrapper;
    container.scrollTop = container.scrollHeight;
  }

  updated() {
    if (!this.typingState) {
      this.$nextTick(() => this.scrollToEnd());
    }
  }

  public enterPress(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.sendMessage();
    } else {
      this.typingState = true;
    }
  }

  public sendMessage() {
    if (this.inputMessage !== "") {
      this.$store.dispatch("sendMessage", this.inputMessage);
      this.inputMessage = "";
      this.typingState = false;
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  padding: 5px 5px 5px 10px;
  border: none;
  border-radius: 30px;
  width: 80%;

  &::placeholder {
    color: #e3e3e3;
    font-weight: 300;
    margin-left: 20px;
  }

  &:focus {
    outline: none;
  }
}
.c-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.chats {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 7;
  overflow: scroll;
  padding-bottom: 30px;
  padding-top: 10px;
}

.chat-input {
  width: 100%;
  flex: 1;
  background-color: #e3e3e3;
  border-bottom-left-radius: 10px;
}

.input-wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.send-button {
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>

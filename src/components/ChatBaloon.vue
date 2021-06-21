<template>
  <div class="mine messages" v-if="!received">
    <div class="message">
      <pre>{{ message }}</pre>
    </div>
  </div>
  <div class="yours messages" v-else>
    <div class="message">
      <pre>{{ message }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ChatBaloon extends Vue {
  @Prop() readonly message!: string;
  @Prop() readonly received!: boolean;

//   mounted(){
//       if(this.message.includes("{{name}}")){
//       }
//   }
}
</script>

<style lang="scss" scoped>
.messages {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  width: 200px;
  min-height: 24px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
}
.mine {
  align-items: flex-end;
}

.messages pre {
  white-space: pre-wrap; 
  word-wrap: break-word;
  font-family: inherit;
}

.mine .message {
  color: white;
  margin-left: 25%;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  position: relative;
}

.mine .message:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.mine .message:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-left-radius: 10px;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 25%;
  background-color: #eee;
  position: relative;
}

.yours .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #eee;
  border-bottom-right-radius: 15px;
}
.yours .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-right-radius: 10px;
}
</style>

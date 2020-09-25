import { createApp, h } from "vue";
import App from "./App.vue";

const app = createApp({
  render: () => h(App),
});

app.mount(document.body.querySelector("#root"));

chrome.runtime.sendMessage({ message: "hello" });

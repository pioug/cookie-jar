<template>
  <h1>Cookie Jar Extension</h1>
  <p>
    Clear your cache via this extension to avoid being signed out from sites you've bookmarked.
  </p>
  <button @click="clear()">
    CLEAR ALL BROWSING DATA <br />
    <small><strong>EXCEPT DATA USEFUL FOR MY BOOKMARKS</strong></small>
  </button>
  <p v-if="timestamp">
    ✅ Cache cleared <small>({{ timestamp }})</small>
  </p>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const timestamp = ref("");
    return {
      clear,
      timestamp,
    };

    function clear() {
      chrome.runtime.sendMessage({ command: "clear" }, function () {
        chrome.runtime.onMessage.addListener(displayResult);
      });
    }

    function displayResult({ result }) {
      if (result !== "cleared") {
        return;
      }
      const t = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date());

      timestamp.value = t;
      chrome.runtime.onMessage.removeListener(displayResult);
    }
  },
};
</script>

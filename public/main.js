const socketURL = `ws://${window.location.host}`;

const { createApp } = Vue;

createApp({
  data: function() {
    return {
      messages: [],
      socket: null,
    };
  },
  mounted: function() {
    this.socket = new WebSocket(socketURL);
    this.socket.addEventListener("message", (e) => this.readIncomingMessage(e));
  },
  methods: {
    sendMessage: function(e) {
      if(e.key !== "Enter" || this.socket.readyState !== WebSocket.OPEN) return;
      this.socket.send(this.message);
    },
    readIncomingMessage: function(e) {
      this.messages = [e.data, ...messages];
    },
  }
}).mount("#app");

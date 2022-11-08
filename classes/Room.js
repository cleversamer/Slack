class Room {
  constructor(id, title, namespace, private = false) {
    this.id = id;
    this.title = title;
    this.namespace = namespace;
    this.private = !!private;
    this.history = [];
  }

  addMessage(message) {
    this.history.push(message);
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;

class Namespace {
  constructor(id, title, imageURL, endpoint) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }
}

module.exports = Namespace;

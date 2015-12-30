export default class Post {
  constructor(id, content, selected = false) {
    this.id = id;
    this.content = content;
    this.selected = selected;
  }

  select() {
    return new Post(this.id, this.content, true);
  }

  unselect() {
    return new Post(this.id, this.content, false);
  }

  info() {
    const [title, body] = this.content.split('\n', 2);
    return { title, body }
  }

  get title() {
    return this.info().title;
  }

  get body() {
    return this.info().title;
  }
}

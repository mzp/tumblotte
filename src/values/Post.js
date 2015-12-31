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

  change(content) {
    return new Post(this.id, content, this.selected);
  }

  get title() {
    const [title] = this.content.split('\n', 1);
    return title;
  }

  get body() {
    return this.content.substring(this.title.length);
  }
}

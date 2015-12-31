export default class Post {
  constructor(id, content, tumblrId, selected = false) {
    this.id = id;
    this.content = content || '';
    this.tumblrId = tumblrId || null;
    this.selected = selected;
  }

  select() {
    return new Post(this.id, this.content, this.tumblrId, true);
  }

  unselect() {
    return new Post(this.id, this.content, this.tumblrId, false);
  }

  change(content) {
    return new Post(this.id, content, this.tumblrId, this.selected);
  }

  post(tumblrId) {
    return new Post(this.id, this.content, tumblrId, this.selected);
  }

  get title() {
    const [title] = this.content.split('\n', 1);
    return title;
  }

  get body() {
    return this.content.substring(this.title.length);
  }

  get isPosted() {
    return this.tumblrId !== null;
  }
}

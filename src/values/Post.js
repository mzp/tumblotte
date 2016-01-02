export default class Post {
  constructor({ id, blogName, content, tumblrId, dirty, selected = false}) {
    this.id = id;
    this.blogName = blogName;
    this.content = content || '';
    this.tumblrId = tumblrId || null;
    this.dirty = dirty;
    this.selected = selected;
  }

  select() {
    return new Post({ ...this, selected: true });
  }

  unselect() {
    return new Post({ ...this, selected: false });
  }

  change(content) {
    return new Post({ ...this, dirty: true, content: content });
  }

  post(tumblrId) {
    return new Post({ ...this, dirty: false, tumblrId: tumblrId });
  }

  published() {
    return new Post({ ...this, dirty: false })
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

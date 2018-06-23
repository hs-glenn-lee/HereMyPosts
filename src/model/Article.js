export default class Article {

  constructor(id, title, content, summary, readCount, isDel, isPublic, category, author, createTimestamp, updateTimestamp) {
    this.id = id;
    this.title = title;

    this.content = content // for convetion

    this.summary = summary;
    this.readCount = readCount || 0;

    this.isDel = false;
    this.isDel = isDel;

    this.isPublic = false;
    this.isDel = isDel

    this.category = category;
    this.author = author;

    this.createTimestamp = createTimestamp;
    this.updateTimestamp = updateTimestamp;
  }

}

export default class Series {
  constructor(id, name, createTimestamp, updateTimestamp, articles, owner) {
    this.id = id;
    this.name = name;
    this.createTimestamp = createTimestamp;
    this.updateTimestamp = updateTimestamp;
    this.articles = articles;
    this.owner = owner;
  }

}

export default class Tag {

  constructor(id, name, tagArticles, owner,  createTimestamp, updateTimestamp ) {
    this.id = id;
    this.name = name;
    this.tagArticles = tagArticles;
    this.owner = owner;
    this.createTimestamp = createTimestamp;
    this.updateTimestamp = updateTimestamp;
  }

}

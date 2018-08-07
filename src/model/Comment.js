export default class Comment {
  constructor(id, anonymousAuthorName, content, author, isDel, isAnonymous, anonymousPassword, createTimestamp, updateTimestamp, article) {
    this.id = id;

    this.content = content;
    this.author = author;

    this.anonymousAuthorName = anonymousAuthorName;
    this.anonymousPassword = anonymousPassword;

    this.isAnonymous = false;
    this.isAnonymous = isAnonymous;
    this.isDel = false;
    this.isDel = isDel;
    this.createTimestamp = createTimestamp;
    this.updateTimestamp = updateTimestamp;
    this.article = article;
  }

}

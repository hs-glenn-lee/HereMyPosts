export default class Comment {
  constructor(id, authorName, content, authorId, isDel, isAnonymous, anonymousPassword, createTimestamp, updateTimestamp, article) {
    this.id = id;
    this.authorName = authorName;
    this.authorId = authorId;
    this.content = content;
    this.isDel = false;
    this.isDel = isDel;
    this.isAnonymous = false;
    this.isAnonymous = isAnonymous;
    this.anonymousPassword = anonymousPassword;
    this.createTimestamp = createTimestamp;
    this.updateTimestamp = updateTimestamp;

    this.article = article;
  }

}

import TagArticle from "./TagArticle";

export default class TagCollection {

  constructor(owner, article) {
    this.owner = owner;
    this.article = article;
    this.tagMap = {};
  }

  addTags(tagArray) {
    if(tagArray) {
      tagArray.forEach( (el,idx) => {
        this.tagMap[el.name] = el;
      })
    }
  }

  addTag(tag) {
    if(this.findTag(tag.name)) {}
    else {
      this.tagMap[tag.name] = el;
    }
  }

  removeTag(tag) {
    delete this.tagMap[tag.name]
  }

  findTag(tagName) {
    return this.tagMap[tagName];
  }

  getTagArticle(tagName) {
    var tag = this.findTag(tagName);
    var tagArticle = new TagArticle(undefined, this.article, tag);
  }

  getTagArticleList() {
    var tagArticles = [];
    for(var tagName in tagMap) {
      var tag = this.tagMap[tagName];
      tagArticles.push(new TagArticle(undefined, this.article, tag))
    }
    return tagArticles;
  }

}

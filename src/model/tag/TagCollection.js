import TagArticle from "./TagArticle";

export default class TagCollection {

  constructor(article, tagArticles) {//todo tag article로만 생성하게 바꾸자.
    this.article = article;
    this.tagMap = {};
    this.tagArticles = tagArticles || [];
  }

  addTags(tagArray) {
    if(tagArray) {
      tagArray.forEach( (el) => {
        this.tagMap[el.name] = el;
      })
    }
  }

  addTag(tag) {
    if(this.findTag(tag.name)) {}
    else {
      this.tagMap[tag.name] = tag;
      this.tagArticles.push(new TagArticle(undefined, this.article, tag))
    }
  }

  removeTag(tag) {
    delete this.tagMap[tag.name]
  }

  findTag(tagName) {
    return this.tagMap[tagName];
  }

  getTagArticles() {
    var tagArticles = [];
    for(var tagName in this.tagMap) {
      var tag = this.tagMap[tagName];
      tagArticles.push(new TagArticle(undefined, this.article, tag))
    }
    return tagArticles;
  }

  toTagArray () {
    var tagArray = [];
    for(var tagName in this.tagMap) {
      var tag = this.tagMap[tagName];
      tagArray.push(tag);
    }
    tagArray.sort();
    return tagArray;
  }

  isEmpty () {
    return Object.keys(this.tagMap).length > 0;
  }

}

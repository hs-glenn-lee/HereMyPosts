import TagArticle from "./TagArticle";

export default class TagCollection {

  constructor(article) {
    this.article = article;
    this.tagMap = {};
  }

  addTags(tagArray) {

    if(tagArray) {
      console.log(tagArray)
      tagArray.forEach( (el) => {
        this.tagMap[el.name] = el;
      })
    }
  }

  addTag(tag) {
    if(this.findTag(tag.name)) {}
    else {
      this.tagMap[tag.name] = tag;
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
    return new TagArticle(undefined, this.article, tag);
  }

  getTagArticles() {
    var tagArticles = [];
    for(var tagName in this.tagMap) {
      var tag = this.tagMap[tagName];
      tagArticles.push(new TagArticle(undefined, this.article, tag))
    }
    return tagArticles;
  }

  toArray () {
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

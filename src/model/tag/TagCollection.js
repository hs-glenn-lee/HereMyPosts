import TagArticle from "./TagArticle";

export default class TagCollection {

  constructor(article, tagsArticles) {
    this.article = article;
    this.tagMap = {};
    this.tagsArticles  = tagsArticles || [];
    this.tagsArticles.forEach( (el) => {
      this.tagMap[el.name] = el.tag;
    });
  }

  setArticle (article) {
    this.article = article || null;
  }

  setTagsArticles (tagsArticles) {
    this.tagsArticles  = tagsArticles || [];
    this.tagMap = {};
    this.tagsArticles.forEach( (el) => {
      this.tagMap[el.name] = el.tag;
    });
  }

  addTag(tag) {
    if(!this.findTag(tag.name)) {
      this.tagMap[tag.name] = tag;
      this.tagsArticles.push(new TagArticle(undefined, this.article, tag));
    }
  }

  removeTag(tag) {
    if(this.findTag(tag.name)) {
      //remove from tagMap
      delete this.tagMap[tag.name]

      //remove from tagsArticles
      let idx = this.tagsArticles.findIndex(el => {
        if(el.tag.name === tag.name) {
          return true
        }else {
          return false
        }
      });
      if(idx > 0 )
        this.tagsArticles.slice(idx,1);
    }

  }

  findTag(tagName) {
    return this.tagMap[tagName];
  }

  getTagsArticles() {
    var tagArticles = [];
    for(var tagName in this.tagMap) {
      var tag = this.tagMap[tagName];
      tagArticles.push(new TagArticle(undefined, this.article, tag))
    }
    return tagArticles;
  }

  isEmpty () {
    return this.tagsArticles.length > 0;
  }

}

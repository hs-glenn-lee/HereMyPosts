import TagArticle from "./TagArticle";

export default class TagCollection {
  //create with article, tagsArticles
  // 1) article is not assigned = new article
  // 2) article is set = saved article
  constructor(article, tagsArticles) {
    this.article = article || null;
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
    if(this.findTag(tag.name) === undefined) {
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

      if(idx > -1 )
        this.tagsArticles.splice(idx,1);
    }

  }

  findTag(tagName) {
    return this.tagMap[tagName];
  }

  getTagsArticles() {
    if(this.article === null || this.article === undefined) {
      throw Error('this TagCollection property article is not assigned.');
    }
    this.tagsArticles.forEach( el => {
      if(el.article) {
        if(el.article.id === null || el.article.id === undefined) {
          el.article = this.article;
        }
      }
    });
    return this.tagsArticles;
  }

  isEmpty () {
    return this.tagsArticles.length > 0;
  }

}

// eslint-disable-next-line no-use-before-define
import Category from '@/model/Category'
export default class CategoryNode extends  Category{

  constructor(category, parent, children) {
    super(category.id, category.parentId, category.name, category.seq, category.isDel, category.isPublic)
    this.parent = parent || null;
    this.children = children || [];
  }

  cloneAsCategory () {
    return new Category(this.id, this.parentId, this.name, this.seq, this.isDel, this.isPublic)
  }

  getChildren() {
    return this.children
  }

  getChild(i) {
    return this.children[i]
  }

  remove() {
    //this.parent.remove(this.seq)
  }

  hasChild () {
    return (this.children.length > 0)
  }

  addChild (categoryNode) {
    categoryNode.parent = this;
    categoryNode.parentId = this.id;
    categoryNode.seq = this.children.length;
    this.children.push(categoryNode)
  }

  removeChildById (id) {
    var targetChildIndex = this.findChildIndex(id);
    if(targetChildIndex > -1) {
      this.removeChild(targetChildIndex);
    }
  }

  removeChild (i) {
    var target = this.children[i]
    target.parentId = null;
    this.children.splice(i,1)
  }

  findChildIndex (id) {
    return this.children.findIndex(el => {
      return el.id === id
    })
  }

  sortChildrenByName (order) {
    var isOrderByAsc = (order === 'ASC') ? 1 : -1;
    this.children.sort(e1, e2 => {
      return e1['name'].localeCompare(e2['name']) * isOrderByAsc //asc
    })
  }

  sortChildrenAsSeq (order) {;
    this.children.sort( (e1, e2) => {
      return Math.sign(e1.seq - e2.seq)
    })
  }

  syncChildrenSeq () {
    this.children.forEach(function(el, i) {
      el.seq = i;
    })
  }
  getParent () {
    return this.parent;
  }

  validNewCategoryNameAsChild (newCategory) { // if there's the same name in children return false
    if(!newCategory) {
      return false;
    }

    for(var i in this.children) {
      if(this.children[i].name === newCategory.name) {
        if(this.children[i].id === newCategory.id) {
          return true
        }else {
          return false;
        }
      }
    }
    return true;
  }

}

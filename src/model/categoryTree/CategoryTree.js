import CategoryNode from "./CategoryNode";

export default class CategoryTree {
  //structre
  //init with category list (Category{])
  //controll as category tree (CategoryNode Tree)
  //export as category list

  constructor() {
    this.categoryList = [];
    this.root = {};
    this.map = {};
  }

  //default root values id = cat$root name = default seq = 0 parentId = null. 왜냐면 cat&root라는 id로 못 만들기해야하기 때문에
  //reserved name and id = cat$root
  setCategoryList (categoryList) {
    this.categoryList = categoryList
    console.log(this.categoryList)
    this.convListToTree()
  }

  sortBySeq (startNode) {
    var children = startNode.getChildren()
    for(var child in children) {
      sortAsSeq(children[child])
    }
    startNode.sortChildrenAsSeq()
  }

  convListToTree () {
    //conv Category list to CategoryNode map,
    var catList = this.categoryList
    var catNodeMap = {};

    catList.forEach(function(el) {
      catNodeMap[el.id] = new CategoryNode(el.id, null, el.name, el.seq)
    });

    //assemblying tree from map
    var treeRoot = catNodeMap['default'];
    for(var catNode in catNodeMap) {
      var currCatNode = catNodeMap[catNode];
      var parentCatNode = catNodeMap[currCatNode.parentId]
      currCatNode.parent = parentCatNode;
      parentCatNode.children.push(currCatNode)
    }

    console.log(treeRoot)
    //sorting children ny seq
    this.sortBySeq(treeRoot);
    this.root = treeRoot;

    return
  }

  getCategoryList (startNode) {
    var list = [];

    var children = startNode.root.getChildren()
    for(var child in children) {
      list.concat(getCategoryList(children[child]))
    }

    if(startNode === this.root) {
      return list.push(this.root)
    }else {
      return list
    }

  }


/*  sortChildren (catRootNode) {
    var children = catRootNode.getChildren()
    for(child in children) {
      children[child].syncChildrenSeq()
    }
  }*/



  convTreeToList () {

  }

  find (id) {

  }


}

import CategoryNode from "./category-node";

export default class CategoryTree {
  //structre
  //init with category list (Category{])
  //controll as category tree (CategoryNode Tree)
  //export as category list

  constructor() {
    this.categoryList = [];
    this.root = new CategoryNode({id:'empty', parentId: null, name: 'empty', seq: 0})
    this.map = {};
  }

  isEmpty() {
    return !this.categoryList.length > 0;
  }

  //default root values id = cat$root name = default seq = 0 parentId = null. 왜냐면 cat&root라는 id로 못 만들기해야하기 때문에
  //reserved name and id = cat$root
  setCategoryList (categoryList) {
    this.categoryList = categoryList
    this.convListToTree()
  }

  sortBySeq (startNode) {
    var children = startNode.getChildren()
    for(var child in children) {
      this.sortBySeq(children[child])
    }
    startNode.sortChildrenAsSeq()
  }

  convListToTree () {
    console.log('conv')
    //conv Category list to CategoryNode map,
    var catList = this.categoryList
    console.log(catList);
    var catNodeMap = this.map;

    catList.forEach(function(el) {
      catNodeMap[el.id] = new CategoryNode(el, null, null)
    });

    //assemblying tree from map
    var treeRoot;
    for(var catNode in catNodeMap) {
      var currCatNode = catNodeMap[catNode];
      var parentCatNode = catNodeMap[currCatNode.parentId]

      if(parentCatNode) {
        currCatNode.parent = parentCatNode;
        parentCatNode.children.push(currCatNode)
      }
      if(currCatNode.parentId == null) {//!! null parentId means this node is root node
        treeRoot = currCatNode
      }

      if(currCatNode.parentId == null) {
        treeRoot = currCatNode;
      }
    }

    //sorting children ny seq
    this.sortBySeq(treeRoot);
    this.root = treeRoot;
    return
  }

  getCategoryList (startNode) {
    var list = [];

    var children = startNode.root.getChildren()
    for(var child in children) {
      list.concat(this.getCategoryList(children[child]))
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
    console.log('---------------')
    console.log(id);
    console.log(this.map[id]);
    return this.map[id];
  }


}

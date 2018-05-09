import {CategoryNode} from "./CategoryNode";

export class CategoryTree {
  //structre
  //init with category list (Category{])
  //controll as category tree (CategoryNode Tree)
  //export as category list

  constructor() {
    this.list = [];
    this.root = {};
    this.map = {};
  }

  //default root values id = cat$root name = cat$root seq = 0 parentId = null
  //reserved name and id = cat$root
  setList (catList) {

  }

  convListToTree (catList) {
    //conv Category list to CategoryNode map,
    var catNodeMap = {};
    catList.forEach(function(el) {
      catNodeMap[el.id] = new CategoryNode(el.id, null, el.name, el.seq)
    });

    //assemblying tree from map
    var treeRoot = catNodeMap['cat$root'];
    for(var catNode in catNodeMap) {
      var currCatNode = catNodeMap[catNode];
      var parentCatNode = catNodeMap[currCatNode.parentId]
      currCatNode.parent = parentCatNode;
      parentCatNode.children.push(currCatNode)
    }

    //sorting children ny seq
    sortAsSeq(treeRoot)
    this.root = treeRoot

    return
  }

/*  sortChildren (catRootNode) {
    var children = catRootNode.getChildren()
    for(child in children) {
      children[child].syncChildrenSeq()
    }
  }*/

  sortBySeq (startNode) {
    var children = startNode.getChildren()
    for(var child in children) {
      sortAsSeq(children[child])
    }
    startNode.sortChildrenAsSeq()
  }

  convTreeToList () {

  }

  find (id) {

  }


}

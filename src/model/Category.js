export default class Category {
  constructor(id, parentId, name, seq, isDel, isPublic) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.seq = seq;

    this.isDel = false;
    this.isDel = isDel;

    this.isPublic = true;
    this.isPublic = isPublic;
  }

}

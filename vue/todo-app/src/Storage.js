export default function Storage (name) {
  this.name = name
  this.datas = []
}
Storage.prototype.setData = function (datas) {
  this.datas = datas
  localStorage.setItem(this.name, JSON.stringify(datas))
}
Storage.prototype.fetchData = function () {
  if (this.datas && this.datas.length > 0) {
    return this.datas
  }
  this.datas = JSON.parse(localStorage.getItem(this.name))
  return this.datas
}

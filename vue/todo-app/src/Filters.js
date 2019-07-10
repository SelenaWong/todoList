export default function Filters () {
  this.condition = {
    all: function (datas) {
      return datas
    },
    completed: function (datas) {
      var tempDatas = datas.filter(item => item.completed)
      return tempDatas
    },
    actived: function (datas) {
      var tempDatas = datas.filter(item => !item.completed)
      return tempDatas
    }
  }
}

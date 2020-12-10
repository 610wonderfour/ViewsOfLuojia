/*
**可能的常用工具函数
*/

const th = require('./th')
/*
*检查当前区域是否在收藏馆中，若是返回true
*@params {
  collectionStatus : 后端传来的当前收藏状态的字符串如'1,2,3,4',
  area: 当前区域名称如'梅园区域'
}
*/
const checkCollectionStatus = function(collectionStatus, area) {
  let status = collectionStatus.split(',');
  return status.includes(th.typeHash(area) + '')
}

module.exports = {
  checkCollectionStatus: checkCollectionStatus

}
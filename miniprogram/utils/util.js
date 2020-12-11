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

const getBriefName = function(area) {
  switch(area) {
    case '梅园区域': return '梅园';
    case '桂园区域': return '桂园';
    case '枫园区域': return '枫园';
    case '樱园区域': return '樱园';
    case '牌坊区域': return '牌坊';
    case '湖滨区域': return '湖滨';
    case '工学部': return '工学部';
    case '信息学部': return '信部';
    default: 

  }
}

module.exports = {
  checkCollectionStatus: checkCollectionStatus,
  getBriefName: getBriefName,

}
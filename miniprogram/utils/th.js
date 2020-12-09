/**
*输入区域名称映射为类型编码
*/
function th(){}

th.typeHash = function typeHash(area) {
  switch(area){
    case '枫园区域': return 1
    case '工学部': return 2
    case '桂园区域': return 3
    case '湖滨区域': return 4
    case '梅园区域': return 5
    case '牌坊区域': return 6
    case '信息学部': return 7
    case '樱园区域': return 8
  }
}

module.exports = th;
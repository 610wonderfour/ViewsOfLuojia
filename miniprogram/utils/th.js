/**
*输入区域名称映射为区域编码
*/
function typeHash(area) {
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

function typeHashBack(code) {
  switch(code){
    case 1: return '枫园区域'
    case 2: return '工学部'
    case 3: return '桂园区域'
    case 4: return '湖滨区域'
    case 5: return '梅园区域'
    case 6: return '牌坊区域'
    case 7: return '信息学部'
    case 8: return '樱园区域'
  }
}

module.exports = {
  typeHash: typeHash,
  typeHashBack: typeHashBack
};
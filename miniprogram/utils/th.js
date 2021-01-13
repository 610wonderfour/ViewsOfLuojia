/**
*输入区域名称映射为区域编码
*/

module.exports = {
  typeHash(area) {
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
  },
  typeHashBack(code) {
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
  },
  getDescription(area){
    switch(area){
      case '枫园区域': return {
        des1: '--"烟柳画桥，风帘翠幕"',
        des2:'(武大的小公主们生活的地方)'
      };
      case '工学部': return {
        des1: '--"一桥飞架南北，天堑变通途"',
        des2: '(又名武又大学工学部)',
      };
      case '桂园区域': return {
        des1: '--"没有十里荷花，但有三秋桂子"',
        des2: '(文理学部中的黄金地段，上课前5分钟起床毫无压力)'
      };
      case '湖滨区域': return {
        des1: '--"落霞与孤鹜齐飞，秋水共长天一色"',
        des2: '(蚊虫大军入侵警告)'
      };
      case '梅园区域': return {
        des1: '--"待到山花烂漫时，她在丛中笑"',
        des2: '(梅园食堂什么时候才能重回当初的模样)'
      }
      case '牌坊区域': return {
        des1: '--"桃李无言，下自成蹊"',
        des2: '(文法理工农医? 武汉理工大学?)'
      };
      case '信息学部': return {
        des1: '--"0和1在这里上下起舞、翻飞"',
        des2: '(无情的程序员罢了)'
      };
      case '樱园区域': return {
        des1: '--"如果，樱花掉落的速度是每秒5厘米"',
        des2: '(在武大看一场人海，是每一朵樱花的梦想)'
      }
    }
  },
  choiceHash(code){
    switch(code){
      case 0: return 'A';
      case 1: return 'B';
      case 2: return 'C';
      case 3: return 'D';
    }
  },
  
};
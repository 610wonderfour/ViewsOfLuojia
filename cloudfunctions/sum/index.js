// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event)
  // console.log(context)
  const wxContext = cloud.getWXContext()// 获取微信小程序上下文



  var response_text = event.Content == '前端' ? '低调嘉嘉子' : event.Content == '后端' ? '闷骚宿舍长' : event.Content == '产品' ? '勇敢汪汪队' : event.Content == 'UI' ? '海纳百川' : event.Content == '美工' ? '美丽嘉嘉子' : '听唔懂你港乜嘢'
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content:   response_text,
    },
  })
  return {
    sum: event.a + event.b
  }
}

const got = require('got')

const SCKEY = process.env.PUSH_KEY
const BARKID = process.env.BARK_ID

const sendNotify = (title, message) => {
  console.log(`https://api.day.app/${BARKID}/${encodeURIComponent(title)}/${encodeURIComponent(message)}?group=${encodeURIComponent("长江雨课堂")}`)
  if (BARKID) {
    got(`https://api.day.app/${BARKID}/${encodeURIComponent(title)}/${encodeURIComponent(message)}?group=${encodeURIComponent("长江雨课堂")}`, {
          responseType: 'json'  
    }).then( ({ body }) => {
      if (body.code === 200) {
        console.log("Bark app 推送通知成功");
      }else {
        console.log(`Bark app 推送通知异常：${body.message}`);
      }
    }).catch( (err) => {
      console.log("Bark app 发送通知调用API失败！！\n");
      console.log(err);
    })
  } else {
    console.log( "您未提供BARKID，无法使用BARK接收推送通知\n")
  }

  if (SCKEY) {
    got(`http://pushplus.hxtrip.com/${SCKEY}.send`, {
      searchParams: {
        text: title,
        desp: message,
      },
      responseType: 'json',
    })
      .then(({ body }) => {
        if (body.code === 0) {
          console.log('发送通知消息成功\n')
        } else if (body.code === 1024) {
          console.log(`发送通知消息异常: ${body.errmsg}\n`)
        } else {
          console.log(`发送通知消息异常\n${JSON.stringify(body)}`)
        }
      })
      .catch((err) => {
        console.log('发送通知调用API失败！！\n')
        console.log(err)
      })
  } else {
    console.log('您未提供SCKEY，取消微信推送消息通知\n')
  }
}

module.exports = sendNotify

import { readDB, writeDB } from "../dbController.js"
import { v4 } from 'uuid'


const setMsgs = data => writeDB('messages', data)

//http 메소드를 한꺼번에 등록하기 위해 배열
const messagesRoute = [
  {
    method: 'get',
    route: "/messages",
    handler: (req, res) => {
      const msgs = readDB('messages')
      res.send(msgs)
    }
  }, {
    method: 'get',
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const msgs = readDB('messages')
        const msg = msgs.find((msg) => msg.id === id)
        if (!msg) throw Error('not found')
        res.send(msg)
      } catch (err) {
        res.status(404).send({ error: err })
      }
    }
  }, {
    method: 'post',
    route: "/messages",
    handler: ({ body }, res) => {
      const msgs = readDB('messages')
      const newMsg = {
        id: v4(),
        text: body.text,
        timestamp: Date.now()
      }
      msgs.unshift(newMsg)
      setMsgs(msgs)
      res.send(newMsg) //post 응답은 새 데이터만
    }
  }, {
    method: 'put',
    route: "/messages/:id", //client id랑 server의 id가 맞지 않는 경우 대비해 try
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = readDB('messages')
        const targetIndex = msgs.findIndex((msg) => msg.id === id)
        if (targetIndex < 0) throw '메세지가 없습니다'

        const newMsg = { ...msgs[targetIndex], text: body.text }
        msgs.splice(targetIndex, 1, newMsg)
        setMsgs(msgs)
        res.send(newMsg)
      } catch (err) {
        res.status(500).send({ error: err })
      }
    }
  }, {
    method: 'delete',
    route: "/messages/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const msgs = readDB('messages')
        const targetIndex = msgs.findIndex((msg) => msg.id === id)
        if (targetIndex < 0) throw '메세지가 없습니다'

        msgs.splice(targetIndex, 1)
        setMsgs(msgs)
        res.send(id)

      } catch (err) {
        res.status(500).send({ error: err })
      }
    }
  },
]

export default messagesRoute
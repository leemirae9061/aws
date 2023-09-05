import { useEffect, useState } from "react"
import MsgInput from "./MsgInput"
import MsgItem from "./MsgItem"
import fetcher from "../fetcher"

const MsgList = () => {
  const [msgs, setMsgs] = useState([])
  const [editingId, setEditingId] = useState(null)


  //get
  const getMessages = async () => {
    const msgs = await fetcher('get', '/messages')
    setMsgs(msgs)
  }

  useEffect(() => {
    getMessages()
  }, [])


  //post
  const onCreate = async text => {
    const newMsg = await fetcher('post', '/messages', { text })
    setMsgs(msgs => [newMsg, ...msgs])
  }

  //put
  const onUpdate = async (text, id) => {
    const newMsg = await fetcher('put', `/messages/${id}`, { text })
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1,
        newMsg
      )
      return newMsgs
    })
    doneEdit()
  }

  //delete
  const onDelete = async id => {
    const receivedId = await fetcher('delete', `/messages/${id}`)

    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === receivedId + '')
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1)
      return newMsgs
    })
  }

  const doneEdit = () => setEditingId(null)

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {
          msgs.map(x => <MsgItem {...x} key={x.id} onDelete={() => onDelete(x.id)} onUpdate={onUpdate} startEdit={() => setEditingId(x.id)} isEditing={editingId === x.id} />)
        }
      </ul>
    </>
  )
}

export default MsgList
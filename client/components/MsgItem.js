import MsgInput from "./MsgInput"

const MsgItem = ({ timestamp, text, id, onUpdate, isEditing, startEdit, onDelete }) => (
  <li className="message_item">
    <h3>
      <sub>
        {new Date(timestamp).toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </sub>
    </h3>
    {/* 수정할때는 text 대신 textarea 보여주야 해 */}
    {isEditing ? <MsgInput mutate={onUpdate} id={id} text={text} /> : text}
    <div className="messages_buttons">
      <button onClick={startEdit}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  </li>
)

export default MsgItem
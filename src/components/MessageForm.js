import React from 'react'

const MessageForm = ({ handleSubmit, text, setText }) => {
  return (
    <form className='message_form' onSubmit={handleSubmit}>
      <label htmlFor='img'></label>

      <div>
        <input
          type='text'
          placeholder='Enter message'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className='button' style={{ width: '80px' }}>
          Send
        </button>
      </div>
    </form>
  )
}

export default MessageForm

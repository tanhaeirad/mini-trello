import { useState } from 'react'
import DeleteIcon from '../Icons/DeleteIcon'

const Task = (props) => {
  const { task, handleDeleteTask, handleUpdateTask } = props

  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (editMode) {
    return (
      <div
        onClick={toggleEditMode}
        className='
        bg-mainBackgroundColor
        p-2.5
        h-24
        min-h-24
        flex
        items-center
        text-left
        rounded-xl
        hover:ring-2
        hover:ring-inset
        hover:ring-rose-500
        cursor-grab
        relative
        task
      '
      >
        <textarea
          value={task.content}
          autoFocus
          placeholder='Task content'
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={(e) => handleUpdateTask(task.id, e.target.value)}
          className='
          h-[90%]
          w-full
          resize-none
          border-none
          rounded
          bg-transparent
          text-white
          focus:outline-none
        '
        ></textarea>
      </div>
    )
  }

  return (
    <div
      onClick={toggleEditMode}
      className='
      bg-mainBackgroundColor
      p-2.5
      h-24
      min-h-24
      flex
      items-center
      text-left
      rounded-xl
      hover:ring-2
      hover:ring-inset
      hover:ring-rose-500
      cursor-grab
      relative
      task
  '
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => handleDeleteTask(task.id)}
          className='
          stroke-white
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          bg-columnBackgroundColor
          p-2
          rounded
          opacity-60
          hover:opacity-100
        '
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  )
}

export default Task

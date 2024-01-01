import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import DeleteIcon from '../Icons/DeleteIcon'

const Task = (props) => {
  const { task, handleDeleteTask, handleUpdateTask } = props

  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(task.content)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
        bg-mainBackgroundColor
        p-2.5
        h-24
        min-h-[6rem]
        flex
        items-center
        text-left
        rounded-xl
        cursor-grab
        relative
        border-2
        border-ring
        border-rose-500
        task
      "
      ></div>
    )
  }
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="
        bg-mainBackgroundColor
        p-2.5
        h-24
        min-h-[6rem]
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
      "
      >
        <textarea
          value={inputValue}
          autoFocus
          placeholder="Task content"
          onBlur={() => {
            toggleEditMode()
            if (task.content !== inputValue)
              handleUpdateTask(task.id, inputValue)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
              if (task.content !== inputValue)
                handleUpdateTask(task.id, inputValue)
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          className="
          h-[90%]
          w-full
          resize-none
          border-none
          rounded
          bg-transparent
          text-white
          focus:outline-none
        "
        ></textarea>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="
      bg-mainBackgroundColor
      p-2.5
      h-24
      min-h-[6rem]
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
  "
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="
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
        "
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  )
}

export default Task

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import DeleteIcon from '../Icons/DeleteIcon'
import { useState } from 'react'

const List = (props) => {
  const { list, handleDeleteList, handleUpdateList } = props

  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: 'List',
      list,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='
        bg-columnBackgroundColor
        opacity-40
        border-2
        border-rose-500
        w-80
        h-[960px]
        max-h-[960px]
        rounded-md
        flex
        flex-col
  '
      />
    )
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className='
      bg-columnBackgroundColor
      w-80
      h-[960px]
      max-h-[960px]
      rounded-md
      flex
      flex-col
  '
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className='
        bg-mainBackgroundColor
        text-base cursor-grab
        rounded-md
        rounded-b-none
        font-bold
        border-columnBackgroundColor
        border-4
        p-3
        flex
        items-center
        justify-between
      '
      >
        <div className='flex gap-2'>
          <div
            className='
            flex
            justify-center
            item-center
            bg-columnBackgroundColor
            px-2
            py-1
            text-sm
            rounded-full
          '
          >
            0
          </div>
          {!editMode && list.title}
          {/* TODO: should connect to backend */}
          {editMode && (
            <input
              className='
              bg-black focus:border-rose-500 border rounded outline-none px-2
              '
              value={list.title}
              onChange={(event) =>
                handleUpdateList(list.id, event.target.value)
              }
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return
                setEditMode(false)
              }}
            />
          )}
        </div>
        <button
          onClick={() => handleDeleteList(list.id)}
          className='
          stroke-gray-500
          hover:stroke-white
          rounded
          px-2
          py-1
        '
        >
          <DeleteIcon />
        </button>
      </div>

      <div className='flex flex-grow'>Content</div>

      <div>Footer</div>
    </div>
  )
}

export default List

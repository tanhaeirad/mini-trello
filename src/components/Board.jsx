import { useMemo, useState } from 'react'
import AddIcon from '../Icons/AddIcon'
import List from './List'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

const Board = () => {
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  const listsId = useMemo(() => lists.map((list) => list.id), [lists])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleCreateList = () => {
    // TODO: should connect to the backend instead
    const newList = {
      id: generateId(),
      title: `List ${lists.length + 1}`,
    }
    setLists([...lists, newList])
  }

  const handleDeleteList = (id) => {
    // TODO: should connect to the backend instead
    const newLists = lists.filter((list) => list.id !== id)
    setLists(newLists)
  }

  const handleUpdateList = (id, title) => {
    const newList = lists.map((list) => {
      if (list.id !== id) return list
      return { ...list, title }
    })
    setLists(newList)
  }

  const onDragStart = (event) => {
    if (event.active.data.current?.type === 'List') {
      setActiveList(event.active.data.current.list)
    }
  }

  const onDragEnd = (event) => {
    // TODO: should connect to backend
    const { active, over } = event
    if (!over) return

    const activeListId = active.id
    const overListId = over.id

    if (activeListId === overListId) return

    setLists((lists) => {
      const activeListIndex = lists.findIndex(
        (list) => list.id === activeListId
      )

      const overListIndex = lists.findIndex((list) => list.id === overListId)

      return arrayMove(lists, activeListIndex, overListIndex)
    })
  }

  return (
    <div
      className='
       m-auto
       flex
       min-h-screen
       w-full
       items-center
       overflow-x-auto
       overflow-y-hidden
       px-10
     '
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className='m-auto flex gap-4'>
          <div className='flex gap-4'>
            <SortableContext items={listsId}>
              {lists.map((list) => (
                <List
                  key={list.id}
                  list={list}
                  handleDeleteList={handleDeleteList}
                  handleUpdateList={handleUpdateList}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className='
             h-14
             w-80
             min-w-80
             bg-mainBackgroundColor
             rounded-lg
             border-2
             border-columnBackgroundColor
             p-4
             ring-rose-500
             hover:ring-2
             cursor-pointer
             flex
             gap-2
           '
            onClick={handleCreateList}
          >
            <AddIcon />
            Add another list
          </button>
        </div>
        {createPortal(
          <DragOverlay>{activeList && <List list={activeList} />}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

// TODO: should remove after backend
const generateId = () => {
  return Math.floor(Math.random() * 100001)
}

export default Board

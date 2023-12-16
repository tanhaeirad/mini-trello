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
import Task from './Task'

const Board = () => {
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])

  const [activeList, setActiveList] = useState(null)
  const [activeTask, setActiveTask] = useState(null)

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

    const newTasks = tasks.filter((task) => task.listId !== id)
    setTasks(newTasks)
  }

  const handleUpdateList = (id, title) => {
    // TODO: should connect to the backend instead

    const newList = lists.map((list) => {
      if (list.id !== id) return list
      return { ...list, title }
    })
    setLists(newList)
  }

  const handleCreateTask = (listId) => {
    // TODO: should connect to backend
    const newTask = {
      id: generateId(),
      listId,
      content: `Card ${tasks.length + 1}`,
    }
    setTasks([...tasks, newTask])
  }

  const handleDeleteTask = (id) => {
    // TODO: should connect to backend
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  const handleUpdateTask = (id, content) => {
    // TODO: should connect to backend
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task
      return { ...task, content }
    })
    setTasks(newTasks)
  }

  const onDragStart = (event) => {
    if (event.active.data.current?.type === 'List') {
      setActiveList(event.active.data.current.list)
      return
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  const onDragOver = (event) => {
    // TODO: should connect to backend
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'

    if (!isActiveTask) return

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        tasks[activeIndex].listId = tasks[overIndex].listId

        return arrayMove(tasks, activeIndex, overIndex)
      })
      return
    }

    const isOverList = over.data.current?.type === 'List'
    if (isActiveTask && isOverList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        tasks[activeIndex].listId = overId

        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  const onDragEnd = (event) => {
    // TODO: should connect to backend
    setActiveList(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const isActiveList = active.data.current?.type === 'List'
    const isOverList = over.data.current?.type === 'List'
    if (!isActiveList || !isOverList) return

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
        onDragOver={onDragOver}
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
                  handleCreateTask={handleCreateTask}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                  tasks={tasks.filter((task) => task.listId === list.id)}
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
          <DragOverlay>
            {activeList && (
              <List
                list={activeList}
                handleDeleteList={handleDeleteList}
                handleUpdateList={handleUpdateList}
                handleCreateTask={handleCreateTask}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                tasks={tasks.filter((task) => task.listId === activeList.id)}
              />
            )}
            {activeTask && (
              <Task
                task={activeTask}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
              />
            )}
          </DragOverlay>,
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
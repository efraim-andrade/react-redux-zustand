import { create } from 'zustand'

import { api } from '../lib/axios'

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  next: () => void
  isLoading: boolean
  course: null | Course
  load: () => Promise<void>
  currentLessonIndex: number
  currentModuleIndex: number
  play: (moduleAndLessonIndex: [number, number]) => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    isLoading: true,
    currentLessonIndex: 0,
    currentModuleIndex: 0,

    load: async () => {
      set({
        isLoading: true,
      })

      const response = await api.get<Course>('/courses/1')

      set({
        isLoading: false,
        course: response.data,
      })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      })
    },

    next: () => {
      const { course, currentModuleIndex, currentLessonIndex } = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        })
        return
      }

      const nextModuleIndex = currentModuleIndex + 1
      const nextModule = course?.modules[nextModuleIndex]

      if (!nextModule) return

      set({
        currentLessonIndex: 0,
        currentModuleIndex: nextModuleIndex,
      })
    },
  }
})

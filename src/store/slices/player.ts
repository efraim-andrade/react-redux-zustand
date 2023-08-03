import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '../../lib/axios'
import { useAppSelector } from '../'

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
  isLoading: boolean
  course: null | Course
  currentLessonIndex: number
  currentModuleIndex: number
}

const initialState: PlayerState = {
  course: null,
  isLoading: true,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

export const loadCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get<Course>('/courses/1')

  return response.data
})

export const playerSlice = createSlice({
  initialState,
  name: 'player',

  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  },

  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },

    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
        return
      }

      const nextModuleIndex = state.currentModuleIndex + 1
      const nextModule = state.course?.modules[nextModuleIndex]

      if (!nextModule) return

      state.currentModuleIndex = nextModuleIndex
      state.currentLessonIndex = 0
    },
  },
})

export const player = playerSlice.reducer

export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}

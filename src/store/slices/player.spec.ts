import { it, expect, describe } from 'vitest'

import { play, next, PlayerState, player as reducer } from './player'

const exampleState: PlayerState = {
  isLoading: false,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          { duration: '13:45', id: 'Jai8w6K_GnY', title: 'CSS Modules' },
          {
            duration: '10:05',
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            duration: '13:45',
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
          },
          { duration: '10:05', id: 'Ng_Vk4tBl0g', title: 'Responsividade' },
        ],
      },
    ],
  },
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]))

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toBe(0)
    expect(state.currentLessonIndex).toBe(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
      },
      next(),
    )

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(0)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    const state = reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
        currentModuleIndex: 1,
      },
      next(),
    )

    expect(state.currentModuleIndex).toBe(1)
    expect(state.currentLessonIndex).toBe(1)
  })
})

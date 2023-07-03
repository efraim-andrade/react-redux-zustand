import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  course: {
    modules: [
      {
        id: '1',
        title: 'Iniciando com React',
        lessons: [
          { duration: '13:45', id: 'Jai8w6K_GnY', title: 'CSS Modules' },
          {
            duration: '10:05',
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
          },
          {
            duration: '06:33',
            id: 'D83-55LUdKE',
            title: 'Componente: Header',
          },
          {
            duration: '09:12',
            id: 'W_ATsETujaY',
            title: 'Componente: Sidebar',
          },
          { duration: '03:23', id: 'Pj8dPeameYo', title: 'CSS Global' },
          {
            duration: '11:34',
            id: '8KBq2vhwbac',
            title: 'Form de comentários',
          },
        ],
      },
      {
        id: '2',
        title: 'Estrutura da aplicação',
        lessons: [
          {
            duration: '13:45',
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
          },
          { duration: '10:05', id: 'Ng_Vk4tBl0g', title: 'Responsividade' },
          {
            duration: '06:33',
            id: 'h5JA3wfuW1k',
            title: 'Interações no JSX',
          },
          {
            duration: '09:12',
            id: '1G0vSTqWELg',
            title: 'Utilizando estado',
          },
        ],
      },
      {
        id: '3',
        title: 'Ferramentas',
        lessons: [
          {
            duration: '09:13',
            id: '4rMShwohDuA',
            title: 'Extensões úteis e não tão conhecidas do js',
          },
        ],
      },
    ],
  },
}

const playerSlice = createSlice({
  initialState,
  name: 'player',

  reducers: {
    play: (state, action) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },
  },
})

export const player = playerSlice.reducer

export const { play } = playerSlice.actions

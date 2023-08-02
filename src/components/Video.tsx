import ReactPlayer from 'react-player'

import { useAppSelector } from '../store'

export function Video() {
  const lesson = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ]

    return currentLesson
  })

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        controls
        width="100%"
        height="100%"
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
      />
    </div>
  )
}

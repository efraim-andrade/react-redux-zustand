import { useDispatch } from 'react-redux'
import ReactPlayer from 'react-player'

import { next, useCurrentLesson } from '../store/slices/player'

export function Video() {
  const dispatch = useDispatch()

  const { currentLesson: lesson } = useCurrentLesson()

  function handlePlayNext() {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        playing
        controls
        width="100%"
        height="100%"
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
      />
    </div>
  )
}

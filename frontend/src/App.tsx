import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import { fetchSongs } from "./features/songs/songsSlice"

import styled from "@emotion/styled"

const ListContainer = styled.div`
  padding: 16px;
`

function App() {
  const dispatch = useDispatch()
  const songs = useSelector((state: any) => state.songs.songs)
  const loading = useSelector((state: any) => state.songs.loading)

  useEffect(() => {
    dispatch(fetchSongs())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <ListContainer>
      {songs.map((song: any) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </ListContainer>
  )
}

export default App

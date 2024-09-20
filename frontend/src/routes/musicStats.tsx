/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMusicStats } from "../features/musicStats/musicStatsSlice";

export default function MusicStats() {
  const dispatch = useDispatch();
  const stats = useSelector((state: any) => state.musicStats.stats);

  // console.log(stats, "stats");

  useEffect(() => {
    console.log("useEffect");

    dispatch(fetchMusicStats());
  }, [dispatch]);

  return (
    <>
      {stats !== null && (
        <div
          css={{
            color: "var(--text-100)",
          }}
        >
          <h1>Music Statistics</h1>
          <div>
            <h2>Total Counts</h2>
            <p>Total Songs: {stats.totalSongs}</p>
            <p>Total Artists: {stats.totalArtists}</p>
            <p>Total Albums: {stats.totalAlbums}</p>
            <p>Total Genres: {stats.totalGenres}</p>
          </div>

          <div>
            <h2>Songs per Genre</h2>
            <ul>
              {stats.songsPerGenre.map((item: any) => (
                <li key={item.genre}>
                  Genre: {item.genre}, Songs: {item.count}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Songs per Artist</h2>
            <ul>
              {stats.songsPerArtist.map((item: any) => (
                <li key={item.artist}>
                  Artist: {item.artist}, Songs: {item.songCount}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Albums per Artist</h2>
            <ul>
              {stats.albumsPerArtist.map((item: any) => (
                <li key={item.artist}>
                  Artist: {item.artist}, Albums: {item.albumCount}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Songs per Album</h2>
            <ul>
              {stats.songsPerAlbum.map((item: any) => (
                <li key={item.album}>
                  Album: {item.album}, Songs: {item.songCount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

import "./App.css";
import React, { useState, useEffect } from "react";
import Dropdown from "./components/dropdown";
import Tracklist from "./components/tracklist";
import Trackinfo from "./components/trackinfo";
import axios from "axios";
import { Credentials } from "./credentials.js";

function App() {
  const client = new Credentials();

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({ selectedGenre: "", listOfGenres: [] });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listofPlaylists: [],
  });
  const [tracks, setTracks] = useState({ selectedTrack: "", listOfTracks: [] });
  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client.id + ":" + client.secret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios("https://api.spotify.com/v1/browse/categories?locale=US", {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenres: genreResponse.data.categories.items,
        });
      });
    });
  }, [genres.selectedGenre, client.id, client.secret]);

  const genreChanged = (val) => {
    setGenres({
      selectedGenre: val,
      listOfGenres: genres.listOfGenres,
    });

    axios(
      `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listofPlaylists: playlistResponse.data.playlists.items,
      });
    });
  };

  const playlistChanged = (val) => {
    setPlaylist({
      selectedPlaylist: val,
      listofPlaylists: playlist.listofPlaylists,
    });
  };

  const buttonClicked = (e) => {
    e.preventDefault();
    console.log("selected playlist: ", playlist.selectedPlaylist);
    axios(
      `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((trackResponse) => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracks: trackResponse.data.items,
      });
    });
  };

  const tracklistClicked = (val) => {
    const currentTracks = [...tracks.listOfTracks];
    const trackInfo = currentTracks.filter((track) => track.track.id === val);

    setTrackDetail(trackInfo[0].track);
  };

  return (
    <div className="container">
      <form onSubmit={buttonClicked}>
        <Dropdown
          label="Genre: "
          options={genres.listOfGenres}
          selectedValue={genres.selectedGenre}
          changed={genreChanged}
        />
        <Dropdown
          label="Playlist: "
          options={playlist.listofPlaylists}
          selectedValue={playlist.selectedPlaylist}
          changed={playlistChanged}
        />
        <div className="col-sm-1 row form-group px-0">
          <button className="btn btn-success ">Search</button>
        </div>
        <br></br>
        <div className="row">
          <Tracklist items={tracks.listOfTracks} clicked={tracklistClicked} />
          {trackDetail && <Trackinfo {...trackDetail} />}
        </div>
      </form>
    </div>
  );
}

export default App;

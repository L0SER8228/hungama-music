const fetch = require("isomorphic-unfetch");
const Song = require("./struct/Song");
// eslint-disable-next-line no-unused-vars
const { Readable } = require("stream");

const regex = {
  all: /^https?:\/\/www\.hungama\.com\/(song|playlists|album|artist)\/[\w-]+\/\d+\/?$/gm,
  song: /^https?:\/\/www\.hungama\.com\/song\/[\w-]+\/\d+\/?$/gm,
  album: /^https?:\/\/www\.hungama\.com\/album\/[\w-]+\/\d+\/?$/gm,
  playlist: /^https?:\/\/www\.hungama\.com\/playlists\/[\w-]+\/\d+\/?$/gm,
  artist: /^https?:\/\/www\.hungama\.com\/artist\/[\w-]+\/\d+\/?$/gm
}
const idRegex = /\/(\d+)\/?/;

const API = {
  track: "https://www.hungama.com/audio-player-data/track/",
  album: "https://www.hungama.com/audio-player-data/album/",
  playlist: "https://www.hungama.com/audio-player-data/playlist/",
  artistRadio: "https://www.hungama.com/audio-player-data/artist_radio/"
};

/**
 * get info of a track.
 * @param {string} id - track id
 * @returns {Promise<Object>}
*/
async function getTrackInfo(id) {
  const data = await fetch(`${API.track}${id}`)
    .then(r => r.json())
    .then(data => data[0]);

  const info = new Song(data);
  return info;
}

/**
 * get info of an album.
 * @param {string} id - album id
 * @returns {Promise<Object>}
*/
async function getAlbumInfo(id) {
  const data = await fetch(`${API.album}${id}`)
    .then(r => r.json())
    .then(data => data);

  const info = {
    id: data[0].id_album,
    name: data[0].album_name,
    image: data[0].album_image,
    tracks: data.map((value) => new Song(value))
  }

  return info;
}

/**
 * get info of a playlist.
 * @param {string} id - playlist id
 * @returns {Promise<Object>}
*/
async function getPlaylistInfo(id) {
  const data = await fetch(`${API.playlist}${id}`)
    .then(r => r.json())
    .then(data => data);

  const info = {
    id: data[0].playlist_id,
    name: data[0].playlist_name,
    image: data[0].playlist_image,
    tracks: data.map((value) => new Song(value))
  }

  return info;
}

/**
 * get tracks of an artist radio.
 * @param {string} id - artist id
 * @returns {Promise<Object>}
*/
async function getArtistRadioTracks(id) {
  const data = await fetch(`${API.artistRadio}${id}`)
    .then(r => r.json())
    .then(data => data);

  const info = {
    id,
    tracks: data.map((value) => new Song(value))
  }

  return info;
}

/**
 * Get id of from a hungama url.
 * @param {string} url - hungama url
 * @returns {string}
*/
function getId(url) {
  if (!url || !regex.all.test(url)) {
    // return null;
    throw new Error("This is not a valid hungama music url. Only song, album, artist, playlist urls are supported.")
  }

  const match = url.match(idRegex);
  if (match) return match[1];
  else return null;
}


/**
 * Gets download link of a track.
 * @param {string} stream - track stream link, obtained from getTrackInfo
 * @returns {Promise<Readable>}
*/
async function download(stream) {
  const data = await fetch(stream)
    .then(r => r.json())
    .then(data => data.response);

  return {
    link: data.media_url,
    type: data.type
  }
}

/**
 * get info of a hungama url.
 * @param {string} url - hungama url(song/artist/album/playlist)
 * @returns {Promise<Object>}
*/
async function getInfo(url) {
  if (!url) throw new Error("Invalid url!");

  const id = getId(url);

  let info;
  if (regex.song.test(url)) info = await getTrackInfo(id);
  if (regex.album.test(url)) info = await getAlbumInfo(id);
  if (regex.playlist.test(url)) info = await getPlaylistInfo(id);
  if (regex.artist.test(url)) info = await getArtistRadioTracks(id);

  return info;
}

/**
 * Returns ReadableStream
 * @param {string} link Hungama song URL
 * @returns {Promise<Readable>}
 */
async function hgdl(link) {
  try {
    const data = await getInfo(link);
    if (!data) throw new Error("Invalid URL.");

    const streamURL = await download(data.stream);

    return streamURL;
  } catch (err) {
    return err;
  }
}

module.exports = hgdl;
hgdl.getInfo = getInfo;
hgdl.download = download;
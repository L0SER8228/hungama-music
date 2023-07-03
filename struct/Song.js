class Song {

  constructor(data) {
    this._patch(data);
  }

  _patch(data) {
    this.id = data.mediaid || data.id_migration;
    this.name = data.song_name;
    this.url = this.genUrl();
    this.singers = data.singer_name.split(", ") || [];
    this.stream = data.file || data.preview_link;
    this.album = {
      name: data.album_name,
      id: data.id_album,
      image: this.fixImage(data.album_image)
    };
    this.date = data.date;
    this.image = this.fixImage(data.img_src);
    this.mood = data.mood || "";
    this.genre = data.genre || "";
    this.lang = data.language || "";
    this.actors = data.actor_list?.split(", ") || [];
    this.directors = data.music_director_list?.split(", ") || [];
    this.lyrics = data.lyrics;
    this.lyricist = data.lyricist;
  }

  genUrl() {
    const BASE_URL = "https://www.hungama.com/song"
    return `${BASE_URL}/${this.name.toLowerCase().replace(/ /g, "-")}/${this.id}`;
  }

  fixImage(base_img) {
    const imgPrefix = base_img.split("_")[0];
    return `${imgPrefix}_1000x1000.jpg`
  }
}

module.exports = Song;
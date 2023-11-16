const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");

const artist = document.getElementById("artist");
const title = document.getElementById("title");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let progress = document.getElementById("progress");
let tot_duration = document.getElementById("duration");
let tot_currentTime = document.getElementById("current_time");

const progress_div = document.getElementById("progress_div");

const songs = [
  {
    name: "celtic-irish-scottish-tin-music1",
    title: "Celtic Irish Scottish Tin",
    artist: "Paul David Hewson",
    image: "music1",
  },
  {
    name: "british-historical-drama-music2",
    title: "British Historical Drama",
    artist: "Thomas Brunet",
    image: "music2",
  },
  {
    name: "the-victorian-mansion-music3",
    title: "The Victorian Mansion",
    artist: "Geoff Harvey",
    image: "music3",
  },
  {
    name: "remembering-you-music4",
    title: "Remembering You",
    artist: "acob Christoffersen",
    image: "music4",
  },
  {
    name: "when-you-are-not-with-me-music5",
    title: "When You are not with-me",
    artist: "Bromaz",
    image: "music5",
  },
];

let isPlaying = false;

//For Play function
// play.addEventListener('click', () => {
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

//For Pause function
// play.addEventListener('click', () => {
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  // if (isPlaying) {
  //     pauseMusic();
  // } else {
  //     playMusic();
  // }

  //Ternary / Conditional operator
  isPlaying ? pauseMusic() : playMusic();
});

//Changing the music data
const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "./audios/" + songs.name + ".mp3";
  img.src = "./images/" + songs.image + ".jpg";
};

songIndex = 0;
// loadSong(songs[3]);

const nextSong = () => {
  // songIndex++;
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  // songIndex--;
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// Progressbar js work
music.addEventListener("timeupdate", (event) => {
  // console.log(event);
  const { currentTime, duration } = event.srcElement;
  // console.log(currentTime);
  // console.log(duration);

  let progress_time = (currentTime / duration) * 100;
  // console.log(progress_time);
  progress.style.width = `${progress_time}%`;

  //Music duration update
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  // console.log(min_duration);
  // console.log(sec_duration);

  let total_duration = `${min_duration}:${sec_duration}`;

  if (duration) {
    tot_duration.textContent = `${total_duration}`;
  }

  //Music Current time update
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }

  let total_currentTime = `${min_currentTime}:${sec_currentTime}`;
  tot_currentTime.textContent = `${total_currentTime}`;
});

//Progress onclick functionality
progress_div.addEventListener("click", (event) => {
  // console.log(event);

  const { duration } = music;

  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  // console.log(duration);
  // console.log(move_progress);

  music.currentTime = move_progress;
});

//Match both time to play next song (Call Next song function)
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

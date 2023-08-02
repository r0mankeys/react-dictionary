import "../styles/WordHero.css";
import { PlayPauseIcon } from "@heroicons/react/24/solid";

const WordHero = ({ searchWord, audio, phonetic }) => {
  const sound = new Audio(audio);
  return (
    <div className="word-avec-audio-btn">
      <h1 className="display-word">{searchWord.toLowerCase()}</h1>
      <div className="audio-section">
        <button
          onClick={() => {
            sound.play();
          }}
          className="audio"
        >
          <audio src={audio} id="audio"></audio>
          <PlayPauseIcon className="play-pause-icon" />
        </button>
        <p className="phonetic">[ {phonetic} ]</p>
      </div>
    </div>
  );
};

export default WordHero;

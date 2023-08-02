import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import "../styles/WordForm.css";

const WordForm = ({ search, setSearchWord }) => {
  const [word, setWord] = useState("");

  const handleSumbit = (word, event) => {
    event.preventDefault();
    search(word);
    setWord("");
    setSearchWord(word);
  };
  return (
    <form
      onSubmit={(e) => handleSumbit(word, e)}
      className="word-input-container"
    >
      <div id="word-input-field">
        <input
          value={word}
          onInput={(event) => setWord(event.target.value)}
          className="word-input"
          type="text"
          name="word to search"
          placeholder="Enter a word..."
          maxLength={30}
          autoComplete="off"
          required
        />
        <button className="word-submit-btn" type="submit">
          <MagnifyingGlassIcon className="search-icon" />
        </button>
      </div>
    </form>
  );
};

export default WordForm;

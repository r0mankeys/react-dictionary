import "./reset.css";
import "./index.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import WordForm from "./components/WordForm";
import WordHero from "./components/WordHero";
import WordBreakdown from "./components/WordBreakdown";
import { useState } from "react";

const App = () => {
  // Color theming logic
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)"); // boolean value for user color settings
  let value; // dynamically set intial page theme to use prefernce
  prefersDark.matches ? (value = "dark") : (value = "light"); // dynamically set intial page theme to use prefernce

  const [theme, setTheme] = useLocalStorage(value, value); // dynamically set intial page theme to user preference

  const changeTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  const [pageFont, setPageFont] = useState("Clash"); // controlling font of page, based on clicked font option in dropdown

  const changeFont = (fontFam) => {
    setPageFont(fontFam);
  };

  const [searchWord, setSearchWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [audio, setAudio] = useState("");
  const [wordTypes, setWordTypes] = useState([]);
  const [definition, setDefinitions] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [url, setUrl] = useState("");
  const [index, setIndex] = useState("");

  const search = (word) => {
    // Back to the top of the page when the funcion is called
    window.scroll(0, 0);
    // Get URL using word variable
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    async function getWord() {
      let response = await fetch(url);
      let result = await response.json();
      return result;
    }

    getWord()
      .then((data) => {
        // function that sorts the data, this essentailly does everything and is broken down into many helper functions
        sort(data);
      })
      .catch(() => console.error("This word is not found"));
  };

  // function that sorts the data into variables for conciseness
  let sort = (data) => {
    console.table(data);
    // 'entry' only exists to assign data[0] to a variable for conciseness
    const entry = data[0];
    // let phonetic = entry.phonetic;
    // setPhonetic(entry.phonetic);
    let phonetics = entry.phonetics;
    let meanings = entry.meanings;
    let sourceURL = entry.sourceUrls;
    let phonetic = phonetics.find((ele) => ele.text);
    setPhonetic(phonetic.text);
    let found = phonetics.find((ele) => ele.audio);
    found
      ? setAudio(found.audio)
      : (setAudio(""), setPhonetic("No audio file"));
    setWordTypes(meanings.map((meaning) => meaning.partOfSpeech));
    //TODO: Find solution with better big O time complexity
    // Remove repeat offenders
    setWordTypes((oldState) => [...new Set(oldState)]);
    setDefinitions(
      meanings.map((meaning) =>
        meaning.definitions.map((def) => def.definition)
      )
    );
    setDefinitions((oldState) => [...oldState]);
    setSynonyms(meanings.map((meaning) => meaning.synonyms.map((syn) => syn)));
    setUrl(sourceURL);
  };

  function handleChange(event) {
    setIndex(event.target.id);
  }

  return (
    <div className="body" id={theme} data-font={pageFont}>
      <Navbar
        theme={theme}
        pageFont={pageFont}
        changeFont={changeFont}
        changeTheme={changeTheme}
      />
      <WordForm setSearchWord={setSearchWord} search={search} />
      {searchWord.length > 0 && (
        <>
          <WordHero searchWord={searchWord} audio={audio} phonetic={phonetic} />

          <WordBreakdown
            wordTypes={wordTypes}
            index={index}
            handleChange={handleChange}
            url={url}
            setSearchWord={setSearchWord}
            search={search}
            definition={definition}
            synonyms={synonyms}
          />
        </>
      )}
    </div>
  );
};

export default App;

/* eslint-disable react/jsx-key */
import "../styles/WordBreakdown.css";

const WordBreakdown = ({
  wordTypes,
  index,
  handleChange,
  url,
  setSearchWord,
  search,
  definition,
  synonyms,
}) => {
  return (
    <>
      <div className="word-types">
        {wordTypes.map((wordType, index) => (
          <>
            <WordInput
              handleChange={handleChange}
              wordType={wordType}
              index={index}
            />
            <WordLabel wordType={wordType} index={index} />
          </>
        ))}
      </div>
      <DefinitionBreakdown
        definition={definition}
        synonyms={synonyms}
        index={index}
        url={url}
        setSearchWord={setSearchWord}
        search={search}
      />
    </>
  );
};

export default WordBreakdown;

function WordInput({ handleChange, wordType, index }) {
  return (
    <input
      onChange={(e) => handleChange(e)}
      className="word-type-radio"
      key={`${wordType + index}`}
      type="radio"
      id={index}
      value={wordType}
      name="word-type"
    />
  );
}

function WordLabel({ wordType, index }) {
  return (
    <label
      className="word-type"
      key={`${wordType + index + 1}`}
      htmlFor={index}
    >
      {wordType}
    </label>
  );
}

function DefinitionBreakdown({
  definition,
  synonyms,
  index,
  url,
  setSearchWord,
  search,
}) {
  function onlySome(synonyms) {
    let helperArr = [];
    for (let i = 0; i < 3; i++) {
      helperArr.push(synonyms[i]);
    }
    return helperArr.filter((syn) => typeof syn !== "undefined");
  }

  return (
    <div className="defintions-box">
      <ul className="definitions">
        <div className="def-container">
          {definition[index] &&
            definition[index].map((def, index) => (
              <Definition def={def} index={index} />
            ))}
        </div>
        <div className="source-container container">
          <h2 className="source-title">Source</h2>
          <a
            className="source-link"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
        </div>
        <div className="synonyms-container container">
          <h2 className="synonyms-title">Synonyms</h2>
          {[index] && (
            <ul className="synonyms-box">
              {synonyms[index] && synonyms[index].length > 0 ? (
                onlySome(synonyms[index]).map((syn) => (
                  <Synonym
                    setSearchWord={setSearchWord}
                    syn={syn}
                    search={search}
                  />
                ))
              ) : (
                <p
                  style={{
                    paddingInline: 0,
                  }}
                >
                  No Synonyms
                </p>
              )}
            </ul>
          )}
        </div>
      </ul>
    </div>
  );
}

function Definition({ def, index }) {
  return (
    <li className="definition" key={def}>
      {`${index + 1}. ${def}`}
    </li>
  );
}

function Synonym({ setSearchWord, syn, search }) {
  return (
    <li
      className="synonym"
      onClick={() => {
        setSearchWord(syn);
        search(syn);
      }}
      key={syn}
    >
      {syn}
    </li>
  );
}

// ✅ Trenches Wordbook - Polished Version with Live Suggestions
import { useState } from "react";
import "./home.css";
import { brainrotDictionary } from "./context/data";
import { RiTwitterXFill } from "react-icons/ri";

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [randomWord, setRandomWord] = useState(null);
  const [addNew, setAddNew] = useState({ word: "", definition: "" });
  const [addNewWord, setAddNewWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toUpperCase();
    if (brainrotDictionary[term]) {
      setSearchResult({ word: term, definition: brainrotDictionary[term] });
    } else {
      setSearchResult({
        word: term,
        definition: "Word not found in the dictionary.",
      });
    }
    setSuggestions([]);
    setRandomWord(null);
  };

  const handleRandomWord = () => {
    setIsLoading(true);
    setSearchResult(null);
    setRandomWord(null);
    setTimeout(() => {
      setSearchTerm("");
    }, 1000);
    setTimeout(() => {
      const keys = Object.keys(brainrotDictionary);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setRandomWord({
        word: randomKey,
        definition: brainrotDictionary[randomKey],
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAddNewWord = () => {
    const { word, definition } = addNew;
    if (word && definition) {
      brainrotDictionary[word.toUpperCase()] = definition;
      setAddNew({ word: "", definition: "" });
      setAddNewWord(false);
      setSearchResult({
        word: word.toUpperCase(),
        definition: "Your word has been added to the dictionary.",
      });
    } else {
      alert("Please fill in both fields.");
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    const filtered = Object.keys(brainrotDictionary).filter((key) =>
      key.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  return (
    <div className="w100 df fdc aic p-r brainrot-container">
      <div className="df fdc aic gap-10 brainrot-header">
        <h1>Trenches Wordbook</h1>
        <div className="df fdc aic gap-10">
          <p>
            A lexicon of brainrot words, definitions, and more. Explore the
            depths of linguistic chaos and discover the beauty of corrupted
            language.
          </p>
          <p>Generate your own corrupted lexicon or explore the unknown.</p>
        </div>
        <button
          className="df aic gap-10 mt-10 action-button"
          onClick={() => window.open("https://x.com/wordbook_sol", "_blank")}
        >
          Follow Us <RiTwitterXFill />
        </button>
      </div>

      <form
        className="w100 df fdc aic gap-20 p-r action"
        onSubmit={handleSearch}
      >
        <label className="df aic gap-10">
          <input
            type="text"
            placeholder="Enter a brainrot word..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span role="button" tabIndex={0} onClick={handleSearch}>
            Search
          </span>
        </label>

        {suggestions.length > 0 && searchTerm.length > 0 && (
          <div className="suggestion-box">
            <p>Suggestions:</p>
            <ul>
              {suggestions.map((word) => (
                <li
                  key={word}
                  onClick={() => {
                    setSearchTerm(word);
                    setSuggestions([]);
                  }}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="df aic gap-20">
          <button
            className="action-button"
            type="button"
            onClick={handleRandomWord}
          >
            Generate Random
          </button>
          <button
            className="action-button"
            type="button"
            onClick={() => setAddNewWord(!addNewWord)}
          >
            Add New Word
          </button>
        </div>
      </form>

      {addNewWord && (
        <div className="df fdc aic gap-10 add-new-word">
          <h2>Add New Word</h2>
          <input
            type="text"
            placeholder="Word"
            value={addNew.word}
            onChange={(e) => setAddNew({ ...addNew, word: e.target.value })}
          />
          <input
            type="text"
            placeholder="Definition"
            value={addNew.definition}
            onChange={(e) =>
              setAddNew({ ...addNew, definition: e.target.value })
            }
          />
          <button className="action-button" onClick={handleAddNewWord}>
            Save Word
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading glow-text">Consulting the void...</div>
      )}

      {!isLoading && searchResult && (
        <div className="df fdc aic gap-10 search-result">
          <h2>{searchResult.word}</h2>
          <p>{searchResult.definition}</p>
        </div>
      )}

      {!isLoading && randomWord && (
        <div className="df fdc aic gap-10 random-word">
          <h2>{randomWord.word}</h2>
          <p>{randomWord.definition}</p>
        </div>
      )}

      <div className="brainrot-footer">
        © 2025 Trenches Wordbook - All rights reserved.
      </div>
    </div>
  );
};

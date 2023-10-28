import React, { useState } from "react";
import { BackToHome } from "../App";

const ChallengeOne = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const checkPalindrome = (str) => {
    return str === str.split("").reverse().join("");
  };

  const handleCheck = () => {
    if (checkPalindrome(input)) {
      setResult(-1);
      return;
    }

    for (let i = 0; i < input.length; i++) {
      const temp = input.slice(0, i) + input.slice(i + 1, input.length);
      if (checkPalindrome(temp)) {
        setResult(i);
        return;
      }
    }
    setResult(-1);
  };

  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 1</h1>
      <h2 className="subtitle has-text-white">
        Given a<code>string</code> of lowercase letters in the range ascii[a-z],
        determine the <code>index</code> of the one character that can be
        <code>removed</code> to make the string a palindrome. If the word is
        already a palindrome or there is no <code>"only one index"</code>{" "}
        solution, which means that we have to remove more than one, return{" "}
        <code>-1</code>. Otherwise, return the <code>index</code>
        of the character to remove.
      </h2>
      <h1 className="title is-1 has-text-white">Example</h1>
      <h2 className="subtitle has-text-white">
        <p>aaab</p>
        <p>acxycab</p>

        <p> Output </p>
        <p>3</p>
        <p>-1</p>
      </h2>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="purpleButton" onClick={handleCheck}>
        {" "}
        Submit{" "}
      </button>
      {result !== null && (
        <h2 className="subtitle has-text-white">Result: {result}</h2>
      )}
    </>
  );
};

export default ChallengeOne;

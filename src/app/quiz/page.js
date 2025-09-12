"use client";
import React, { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "Which keyword is used to define an immutable variable in Rust?",
    options: ["let", "var", "mut", "const"],
    correctAnswer: "let",
    explanation:
      "In Rust, variables are immutable by default when declared with `let`. To make them mutable, you need to add the `mut` keyword.",
  },
  {
    question: "Which ownership rule is correct in Rust?",
    options: [
      "Each value has only one owner at a time",
      "Multiple owners are always allowed",
      "Values never get dropped",
      "Memory must be managed manually",
    ],
    correctAnswer: "Each value has only one owner at a time",
    explanation:
      "Rust enforces ownership rules to ensure memory safety. Each value has exactly one owner, and when the owner goes out of scope, the value is dropped.",
  },
  {
    question: "What does the `?` operator do in Rust?",
    options: [
      "It unwraps `Option` values",
      "It propagates errors in functions returning `Result`",
      "It creates a loop",
      "It performs a null check",
    ],
    correctAnswer: "It propagates errors in functions returning `Result`",
    explanation:
      "The `?` operator is used for error propagation. If the `Result` is `Err`, it returns the error from the function; otherwise, it unwraps the `Ok` value.",
  },
  {
    question: "Which collection type is used for dynamic arrays in Rust?",
    options: ["Array", "Vec", "List", "Tuple"],
    correctAnswer: "Vec",
    explanation:
      "`Vec<T>` is the growable, heap-allocated vector type in Rust, used for dynamic arrays.",
  },
  {
    question: "What does `String::from(\"hello\")` do?",
    options: [
      "Creates a string slice",
      "Creates a new owned `String`",
      "Creates a reference",
      "Creates a tuple",
    ],
    correctAnswer: "Creates a new owned `String`",
    explanation:
      "`String::from(\"hello\")` creates an owned heap-allocated string, different from a string slice `&str`.",
  },
  {
    question: "What keyword is used to define a function in Rust?",
    options: ["function", "fn", "func", "def"],
    correctAnswer: "fn",
    explanation: "Functions in Rust are defined with the `fn` keyword.",
  },
  {
    question: "What does `&` mean when used in Rust?",
    options: [
      "It declares a new variable",
      "It creates a reference to a value",
      "It copies the value",
      "It defines a constant",
    ],
    correctAnswer: "It creates a reference to a value",
    explanation:
      "`&` is used to borrow values by reference instead of moving ownership.",
  },
  {
    question: "Which trait must a type implement to be printable with `{}`?",
    options: ["Debug", "Clone", "Display", "Copy"],
    correctAnswer: "Display",
    explanation:
      "Types must implement the `Display` trait to be formatted with `{}`. For `{:?}`, they must implement `Debug`.",
  },
  {
    question: "What will this code output? `let x = 5; let y = x; println!(\"{}\", x);`",
    options: ["5", "Error", "undefined", "0"],
    correctAnswer: "5",
    explanation:
      "Since `i32` implements the `Copy` trait, `y = x` copies the value, so `x` is still valid.",
  },
  {
    question: "Which keyword is used to define an enum in Rust?",
    options: ["enum", "enums", "variant", "union"],
    correctAnswer: "enum",
    explanation: "Enums in Rust are declared with the `enum` keyword.",
  },
];

const RustQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correct = option === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(-1); // End of quiz
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  return (
    <>
      <div className="card-body">
        <h1 className="quiz-title">🦀 Rust Basics Quiz</h1>
        <p className="quiz-description">
          Test your knowledge of Rust fundamentals with this interactive quiz!
          Answer questions on ownership, borrowing, functions, collections, and
          more.
        </p>

        {currentQuestion === -1 ? (
          <div className="quiz-result">
            <h2 className="quiz-title text-2xl">Quiz Complete!</h2>
            <p className="quiz-description">
              Your score:{" "}
              <span className="font-bold">{score}</span> out of{" "}
              {questions.length}
            </p>
            <p className="quiz-description">
              {score === questions.length
                ? "Perfect score! You're a Rustacean in the making!"
                : score >= questions.length / 2
                ? "Great job! You're getting the hang of Rust basics."
                : "Keep practicing! Try again to improve your score."}
            </p>
            <button className="quiz-button" onClick={handleRestart}>
              Restart Quiz
            </button>
            <a
              href="https://doc.rust-lang.org/book/" // Rust book link
              className="quiz-buy-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More with The Rust Book
            </a>
          </div>
        ) : (
          <div className="quiz-question">
            <h2 className="quiz-title text-2xl">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="quiz-description font-medium">
              {questions[currentQuestion].question}
            </p>
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option-button ${
                    showFeedback && selectedOption === option
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
            {showFeedback && (
              <div className="quiz-feedback">
                <p className={isCorrect ? "text-green-400" : "text-red-400"}>
                  {isCorrect ? "Correct!" : "Incorrect!"}
                </p>
                <p className="quiz-description">
                  {questions[currentQuestion].explanation}
                </p>
                <button className="quiz-button" onClick={handleNext}>
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "See Results"}
                </button>
              </div>
            )}
            <p className="quiz-score">Score: {score}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RustQuiz;

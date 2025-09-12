"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level2() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level1RustCompleted, setLevel1RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel1RustCompleted(localStorage.getItem("level1RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Conditional Statements: if, else if, else",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Conditional Statements: if, else if, else</h4>
          <p>
            Use <code>if</code>, <code>else if</code>, and <code>else</code> for conditional logic in Rust.
          </p>
          <p className="mt-2">
            <b>🔹 Basic if Statement</b><br />
            Check a condition:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 5;\nif x > 0 {\n    println!("x is positive");\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 else if and else</b><br />
            Handle multiple conditions:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 0;\nif x > 0 {\n    println!("Positive");\n} else if x == 0 {\n    println!("Zero");\n} else {\n    println!("Negative");\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 if as Expression</b><br />
            Use <code>if</code> to return a value:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let y = if x > 0 { 1 } else { -1 };`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write an if statement (e.g., if x > 0 { println!("Positive"); }).',
      check: (code) => {
        const result = /\bif\s+\w+\s*(>|<|==|!=|>=|<=)\s*\S+\s*\{.*?\}(?:\s*else\s*(if\s+\w+\s*(>|<|==|!=|>=|<=)\s*\S+\s*\{.*?\}\s*)?)?(?:\s*else\s*\{.*?\})?/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write an if statement (e.g., if x > 0 { println!("Positive"); }).',
      success: '✅ Great! You used if statements in Rust.'
    },
    {
      title: "Pattern Matching with match",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Pattern Matching with match</h4>
          <p>
            The <code>match</code> expression provides pattern matching for control flow.
          </p>
          <p className="mt-2">
            <b>🔹 Basic match</b><br />
            Match a value against patterns:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 1;\nmatch x {\n    1 => println!("One"),\n    2 => println!("Two"),\n    _ => println!("Other"),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Match with Ranges</b><br />
            Match ranges of values:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 5;\nmatch x {\n    1..=3 => println!("Small"),\n    4..=6 => println!("Medium"),\n    _ => println!("Large"),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Match as Expression</b><br />
            Return a value from <code>match</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let result = match x {\n    1 => "One",\n    _ => "Other",\n};`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a match expression (e.g., match x { 1 => println!("One"), _ => println!("Other") }).',
      check: (code) => {
        const result = /\bmatch\s+\w+\s*\{.*?\s*=>\s*\S+.*?\}/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a match expression (e.g., match x { 1 => println!("One"), _ => println!("Other") }).',
      success: '✅ Great! You used match for pattern matching.'
    },
    {
      title: "Loops: for, while, loop",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Loops: for, while, loop</h4>
          <p>
            Rust provides <code>for</code>, <code>while</code>, and <code>loop</code> for iteration.
          </p>
          <p className="mt-2">
            <b>🔹 for Loop</b><br />
            Iterate over a range or collection:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`for i in 1..=3 {\n    println!("Number: {}", i);\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 while Loop</b><br />
            Loop until a condition is false:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut x = 3;\nwhile x > 0 {\n    println!("x: {}", x);\n    x -= 1;\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 loop</b><br />
            Infinite loop with <code>break</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut count = 0;\nloop {\n    count += 1;\n    if count == 3 {\n        break;\n    }\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a for, while, or loop statement (e.g., for i in 1..=3 { println!("Number: {}", i); }).',
      check: (code) => {
        const result = /\b(for\s+\w+\s+in\s+\S+\s*\{.*?\}|while\s+\w+\s*(>|<|==|!=|>=|<=)\s*\S+\s*\{.*?\}|loop\s*\{.*?\})/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a for, while, or loop statement (e.g., for i in 1..=3 { println!("Number: {}", i); }).',
      success: '✅ Great! You used loops in Rust.'
    },
    {
      title: "Ownership in Control Flow with Small Scripts",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Ownership in Control Flow with Small Scripts</h4>
          <p>
            Rust’s ownership rules affect control flow, ensuring memory safety.
          </p>
          <p className="mt-2">
            <b>🔹 Ownership in Loops</b><br />
            Moving ownership in a loop:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s = String::from("hello");\nfor c in s.chars() {\n    println!("{}", c);\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Borrowing in Conditionals</b><br />
            Use references to avoid moving:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s = String::from("hello");\nif s.len() > 3 {\n    println!("Long string: {}", s);\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Ownership in match</b><br />
            Match with references:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s = Some(String::from("hello"));\nmatch &s {\n    Some(val) => println!("Value: {}", val),\n    None => println!("No value"),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Key Concepts</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Concept</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Ownership</td>
                  <td className="border border-green-400 p-2">Each value has a single owner</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Borrowing</td>
                  <td className="border border-green-400 p-2">Use &amp; for references</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Move</td>
                  <td className="border border-green-400 p-2">Transfer ownership in loops/match</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a Rust script with control flow and ownership (e.g., for c in s.chars() { println!("{}", c); }).',
      check: (code) => {
        const result = /\b(let\s+\w+\s*=\s*(String::from\(\S+\)|Some\(\S+\)).*?(for\s+\w+\s+in\s+\w+\.\w+\(\)\s*\{|match\s+&\w+\s*\{|if\s+\w+\.\w+\(\)\s*(>|<|==|!=|>=|<=)\s*\S+\s*\{))/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a script with control flow and ownership (e.g., for c in s.chars() { println!("{}", c); }).',
      success: '✅ Great! You applied ownership in control flow.'
    }
  ];

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      console.log(`Navigating to next lesson: ${currentLesson + 1}`);
      setCurrentLesson(currentLesson + 1);
      setCode("");
      setMessage("");
    }
  };

  const handlePrev = () => {
    if (currentLesson > 0) {
      console.log(`Navigating to previous lesson: ${currentLesson - 1}`);
      setCurrentLesson(currentLesson - 1);
      setCode("");
      setMessage("");
    }
  };

  const checkCode = () => {
    console.log(`Checking code for lesson ${currentLesson}: "${code}"`);
    try {
      if (!code.trim()) {
        setMessage("❌ Please enter some code to check.");
        return;
      }
      if (lessons[currentLesson].check(code)) {
        setMessage(lessons[currentLesson].success);
        if (currentLesson < lessons.length - 1) {
          console.log(`Advancing to lesson ${currentLesson + 1}`);
          setTimeout(() => {
            setCurrentLesson(currentLesson + 1);
            setCode("");
            setMessage("");
          }, 1000);
        } else {
          console.log("Completing Level 2");
          localStorage.setItem("level2RustCompleted", "true");
          setTimeout(() => {
            setCurrentLesson(lessons.length);
            setCode("");
            setMessage("");
          }, 1000);
        }
      } else {
        setMessage(lessons[currentLesson].error);
      }
    } catch (error) {
      console.error(`Error in checkCode: ${error.message}`);
      setMessage("❌ An error occurred while checking your code. Please try again.");
    }
  };

  if (!subscribed) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 2: Rust Control Flow</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 2, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level1RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 2: Rust Control Flow</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 1 First</h3>
          <p>
            You need to complete Level 1 before accessing Level 2. Go back and finish the Rust Basics lessons!
          </p>
          <Link href="/level1" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 1
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 2: Rust Control Flow</h2>

      {currentLesson < lessons.length ? (
        <div>
          <div className="nav-buttons flex justify-between mb-6">
            <button
              onClick={handlePrev}
              disabled={currentLesson === 0}
              className="btn px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
            >
              ⬅ Previous
            </button>
            {/* <button
              onClick={handleNext}
              className="btn px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Next ➡️
            </button> */}
          </div>

          <h3 className="text-xl font-semibold mb-4">{lessons[currentLesson].title}</h3>
          <div className="lesson-description text-gray-700 mb-4">{lessons[currentLesson].description}</div>
          <p className="task font-semibold mb-4">
            <b>Task:</b> {lessons[currentLesson].task}
          </p>

          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              console.log(`Code input updated: "${e.target.value}"`);
            }}
            placeholder="💻 Type your Rust code snippet here..."
            className="code-input"
            style={{
              width: "100%",
              height: "120px",
              background: "#111",
              color: "#0f0",
              fontFamily: "monospace",
              fontSize: "1rem",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
          />
          <div className="action-buttons">
            <button
              onClick={checkCode}
              className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Check Code
            </button>
          </div>
          <p
            className={`mt-4 ${message.includes("❌") ? "error-message text-red-500" : "success-message text-green-500"}`}
          >
            {message}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 2</h2>
          <Link href="/level3" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 3 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level1() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");


  const lessons = [
    {
      title: "Installing Rust using rustup",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Installing Rust using rustup</h4>
          <p>
            Rust is a modern systems programming language. <code>rustup</code> is the recommended tool to install Rust.
          </p>
          <p className="mt-2">
            <b>🔹 Install rustup</b><br />
            Download and install Rust on Linux/macOS:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Verify Installation</b><br />
            Check Rust version:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`rustc --version`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Update Rust</b><br />
            Keep Rust up-to-date:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`rustup update`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a command to install or verify Rust (e.g., curl ... rustup.rs, rustc --version).',
      check: (code) => {
        const result = /\b(curl\s+--proto\s+.*rustup\.rs\s+\|\s+sh|rustc\s+--version|rustup\s+update)\b/m.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Enter a command like "curl ... rustup.rs | sh", "rustc --version", or "rustup update".',
      success: '✅ Great! You installed Rust using rustup.'
    },
    {
      title: "Learning Cargo (Rust’s Build & Package Manager)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Learning Cargo (Rust’s Build & Package Manager)</h4>
          <p>
            Cargo is Rust’s build tool and package manager for creating, building, and managing projects.
          </p>
          <p className="mt-2">
            <b>🔹 Create a Project</b><br />
            Start a new Rust project:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`cargo new my-project`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Build a Project</b><br />
            Compile the project:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`cargo build`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Run a Project</b><br />
            Execute the compiled binary:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`cargo run`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Cargo command (e.g., cargo new my-project, cargo build).',
      check: (code) => {
        const result = /\b(cargo\s+(new\s+\w+|build|run|check))\b/m.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Use a Cargo command like cargo new, cargo build, cargo run, or cargo check.',
      success: '✅ Great! You used Cargo to manage a Rust project.'
    },
    {
      title: "Rust Syntax, Variables, Constants, and Mutability",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Rust Syntax, Variables, Constants, and Mutability</h4>
          <p>
            Rust has strict syntax for variables and constants, with immutability by default.
          </p>
          <p className="mt-2">
            <b>🔹 Variables</b><br />
            Declare variables with <code>let</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 5;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Mutable Variables</b><br />
            Use <code>mut</code> for mutability:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut y = 10;\ny = 20;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Constants</b><br />
            Use <code>const</code> for immutable constants:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`const MAX: i32 = 100;`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with a variable or constant (e.g., let x = 5, const MAX: i32 = 100).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*=\s*\S+|const\s+\w+\s*:\s*\w+\s*=\s*\S+)\b/m.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a variable (let x = 5, let mut y = 10) or constant (const MAX: i32 = 100).',
      success: '✅ Great! You understand Rust variables and constants.'
    },
    {
      title: "Working with Data Types (Integers, Floats, Strings, Booleans, Chars)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Working with Data Types</h4>
          <p>
            Rust is strongly typed, requiring explicit type annotations for some declarations.
          </p>
          <p className="mt-2">
            <b>🔹 Integers and Floats</b><br />
            Use <code>i32</code>, <code>f64</code>, etc.:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let num: i32 = 42;\nlet pi: f64 = 3.14;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Strings and Chars</b><br />
            Use <code>String</code> or <code>char</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let name: String = String::from("Rust");\nlet letter: char = 'R';`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Booleans</b><br />
            True or false values:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let is_active: bool = true;`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with a data type (e.g., let x: i32 = 42, let name: String = String::from("Rust")).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*:\s*(i32|f64|bool|char|String)\s*=\s*\S+)\b/m.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with a data type (e.g., let x: i32 = 42, let name: String = String::from("Rust")).',
      success: '✅ Great! You worked with Rust data types.'
    },
    {
      title: "Basic Operators and Expressions",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Basic Operators and Expressions</h4>
          <p>
            Rust supports arithmetic, comparison, and logical operators for expressions.
          </p>
          <p className="mt-2">
            <b>🔹 Arithmetic Operators</b><br />
            Add, subtract, multiply, etc.:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let sum = 5 + 3;\nlet product = 4 * 2;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Comparison Operators</b><br />
            Compare values:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let is_equal = 5 == 5;\nlet is_greater = 10 > 5;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Logical Operators</b><br />
            Combine conditions:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let result = true && false;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Useful Operators</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Operator</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">+, -, *, /</td>
                  <td className="border border-green-400 p-2">Arithmetic operations</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">==, !=, &gt;, &lt;</td>
                  <td className="border border-green-400 p-2">Comparison operations</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">&amp;&amp;, ||, !</td>
                  <td className="border border-green-400 p-2">Logical operations</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a Rust expression with an operator (e.g., let sum = 5 + 3, let is_equal = 5 == 5).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*=\s*\S+\s*(\+|-|\*|\/|==|!=|>|>=|<|<=|&&|\|\|)\s*\S+)\b/m.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write an expression with an operator (e.g., let sum = 5 + 3, let is_equal = 5 == 5).',
      success: '✅ Great! You used Rust operators and expressions.'
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
          console.log("Completing Level 1");
          localStorage.setItem("level1RustCompleted", "true");
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


  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 1: Rust Basics</h2>

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
            placeholder="💻 Type your Rust command or code snippet here..."
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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 1</h2>
          <Link href="/level2" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 2 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}
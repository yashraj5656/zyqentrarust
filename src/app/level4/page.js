"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level4() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level3RustCompleted, setLevel3RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel3RustCompleted(localStorage.getItem("level3RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Defining and Calling Functions",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Defining and Calling Functions</h4>
          <p>
            Functions in Rust are defined with <code>fn</code> and can be called to perform tasks.
          </p>
          <p className="mt-2">
            <b>🔹 Basic Function</b><br />
            Define and call a simple function:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn greet() {\n    println!("Hello, Rust!");\n}\ngreet();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Function with No Return</b><br />
            Functions implicitly return <code>()</code> if no return is specified:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn say_hello() {\n    println!("Hello!");\n}\nsay_hello();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Calling Functions</b><br />
            Call functions by name:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn main() {\n    greet();\n}\nfn greet() {\n    println!("Hi!");\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet defining and calling a function (e.g., fn greet() { println!("Hello!"); } greet();).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*\(\s*\)\s*\{.*?\}.*?\w+\(\);)/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet defining and calling a function (e.g., fn greet() { println!("Hello!"); } greet();).',
      success: '✅ Great! You defined and called a function in Rust.'
    },
    {
      title: "Working with Parameters and Return Types",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Parameters and Return Types</h4>
          <p>
            Functions can take parameters and return values with explicit types.
          </p>
          <p className="mt-2">
            <b>🔹 Function with Parameters</b><br />
            Define parameters with types:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn add(a: i32, b: i32) {\n    println!("Sum: {}", a + b);\n}\nadd(2, 3);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Return Types</b><br />
            Specify return type with <code></code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn square(num: i32) -> i32 {\n    num * num\n}\nlet result = square(4);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Early Return</b><br />
            Use <code>return</code> for early exit:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn max(a: i32, b: i32) -> i32 {\n    if a > b {\n        return a;\n    }\n    b\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a function with parameters or a return type (e.g., fn add(a: i32, b: i32) -> i32 { a + b }).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*\([^)]+\s*:\s*\w+\s*(,\s*\w+\s*:\s*\w+\s*)?\)\s*(->\s*\w+\s*)?\{.*?\})/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a function with parameters or a return type (e.g., fn add(a: i32, b: i32) -> i32 { a + b }).',
      success: '✅ Great! You worked with function parameters and return types.'
    },
    {
      title: "Using Closures and Higher-Order Functions",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Closures and Higher-Order Functions</h4>
          <p>
            Closures are anonymous functions that capture their environment; higher-order functions take functions as arguments.
          </p>
          <p className="mt-2">
            <b>🔹 Basic Closure</b><br />
            Define a closure with <code>|args|</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let add = |x: i32, y: i32| x + y;\nprintln!("{}", add(2, 3));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Closure Capturing Environment</b><br />
            Closures can use external variables:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 5;\nlet multiply = |y: i32| x * y;\nprintln!("{}", multiply(3));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Higher-Order Function</b><br />
            Pass a closure to a function:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn apply<F>(f: F, x: i32) -> i32 where F: Fn(i32) -> i32 {\n    f(x)\n}\nlet double = |x| x * 2;\nlet result = apply(double, 5);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a closure or higher-order function (e.g., let add = |x: i32, y: i32| x + y;).',
      check: (code) => {
        const result = /\b(let\s+\w+\s*=\s*\|[^|]+\|\s*\S+.*?\;|fn\s+\w+\s*<\w+>\s*\([^)]*:\s*\w+\s*(,\s*\w+\s*:\s*\w+\s*)?\)\s*->\s*\w+\s*where\s*\w+:\s*Fn\([^)]+\)\s*->\s*\w+)/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a closure (e.g., let add = |x: i32, y: i32| x + y;) or higher-order function (e.g., fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32).',
      success: '✅ Great! You used closures and higher-order functions.'
    },
    {
      title: "Organizing Code with Modules",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Organizing Code with Modules</h4>
          <p>
            Modules organize code using <code>mod</code>, <code>use</code>, and <code>pub</code> for visibility.
          </p>
          <p className="mt-2">
            <b>🔹 Define a Module</b><br />
            Use <code>mod</code> to create a module:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`mod utils {\n    pub fn greet() {\n        println!("Hello!");\n    }\n}\nutils::greet();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Using Modules</b><br />
            Import with <code>use</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`mod utils {\n    pub fn add(a: i32, b: i32) -> i32 { a + b }\n}\nuse utils::add;\nprintln!("{}", add(2, 3));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Public vs. Private</b><br />
            Use <code>pub</code> for public items:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`mod my_mod {\n    pub fn public() {}\n    fn private() {}\n}\nmy_mod::public();`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with a module (e.g., mod utils { pub fn greet() {} } utils::greet();).',
      check: (code) => {
        const result = /\b(mod\s+\w+\s*\{.*(pub\s+)?fn\s+\w+\s*\([^)]*\)\s*(\s*->\s*\w+\s*)?\{.*?\}.*?(use\s+\w+::\w+;|\w+::\w+\(\);))/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with a module (e.g., mod utils { pub fn greet() {} } utils::greet(); or use utils::greet;).',
      success: '✅ Great! You organized code with modules.'
    },
    {
      title: "Exploring Crates (Rust Libraries)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Exploring Crates (Rust Libraries)</h4>
          <p>
            Crates are Rust libraries; use them with <code>extern crate</code> or Cargo dependencies.
          </p>
          <p className="mt-2">
            <b>🔹 Using a Crate</b><br />
            Import a crate (simulated here):
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`extern crate rand;\nuse rand::Rng;\nlet num = rand::thread_rng().gen_range(1..=10);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Standard Library Crate</b><br />
            Use standard library modules:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::vec::Vec;\nlet v: Vec<i32> = Vec::new();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Crate Summary</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Crate Type</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Standard Library</td>
                  <td className="border border-green-400 p-2">use std::module</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">External Crate</td>
                  <td className="border border-green-400 p-2">extern crate; use crate::module</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a snippet using a crate (e.g., use std::vec::Vec; or extern crate rand;).',
      check: (code) => {
        const result = /\b(extern\s+crate\s+\w+;|use\s+std::\w+.*;)/ms.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using a crate (e.g., use std::vec::Vec; or extern crate rand;).',
      success: '✅ Great! You explored Rust crates.'
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
          console.log("Completing Level 4");
          localStorage.setItem("level4RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 4: Rust Functions and Modules</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 4, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level3RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 4: Rust Functions and Modules</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 3 First</h3>
          <p>
            You need to complete Level 3 before accessing Level 4. Go back and finish the Rust Ownership, Borrowing, and Lifetimes lessons!
          </p>
          <Link href="/level3" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 3
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 4: Rust Functions and Modules</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 4</h2>
          <Link href="/level5" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 5 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}
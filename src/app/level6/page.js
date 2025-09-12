
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level6() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level5RustCompleted, setLevel5RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel5RustCompleted(localStorage.getItem("level5RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Understand panic and the ? operator",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Panic and the ? Operator</h4>
          <p>
            <code>panic!</code> stops execution on unrecoverable errors; the <code>?</code> operator propagates errors.
          </p>
          <p className="mt-2">
            <b>🔹 Panic</b><br />
            Causes program to crash:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn main() {\n    panic!("Crash!");\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 ? Operator</b><br />
            Propagates <code>Result</code> or <code>Option</code> errors:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn parse_number(s: &str) -> Result<i32, std::num::ParseIntError> {\n    let num = s.parse::<i32>()?;\n    Ok(num)\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Using ? in Main</b><br />
            With <code>Result</code> return type:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn main() -> Result<(), std::io::Error> {\n    let data = std::fs::read_to_string("file.txt")?;\n    Ok(())\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using panic! or the ? operator (e.g., panic!("error"); or fn f() -> Result<i32, &str> { Ok(42) } let x = f()?;).',
      check: (code) => {
        const result = /\b(panic!\([^)]+\);|fn\s+\w+\s*\([^)]*\)\s*->\s*Result<[^>]+>\s*\{.*\?)/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using panic! or the ? operator (e.g., panic!("error"); or fn f() -> Result<i32, &str> { Ok(42) } let x = f()?;).',
      success: '✅ Great! You understood panic and the ? operator.'
    },
    {
      title: "Learn to use Result<T, E> effectively",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Using Result</h4>
          <p>
            <code>Result</code> handles success (<code>Ok</code>) or failure (<code>Err</code>) safely.
          </p>
          <p className="mt-2">
            <b>🔹 Basic Result</b><br />
            Return <code>Ok</code> or <code>Err</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err("Division by zero".to_string())\n    } else {\n        Ok(a / b)\n    }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Pattern Matching</b><br />
            Handle <code>Result</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let result = divide(10, 2);\nmatch result {\n    Ok(value) => println!("Result: {}", value),\n    Err(e) => println!("Error: {}", e),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Result Methods</b><br />
            Use <code>unwrap_or</code>, <code>map</code>, etc.:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let value = divide(10, 0).unwrap_or(0);\nprintln!("Value: {}", value);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using Result<T, E> (e.g., fn divide(a: i32, b: i32) -> Result<i32, String> { Ok(a / b) }).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*\([^)]*\)\s*->\s*Result<[^>]+>\s*\{.*(Ok|Err)\([^)]+\).*?\}|match\s+\w+\s*\{.*Ok.*=>.*Err.*=>\s*\})/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using Result<T, E> (e.g., fn divide(a: i32, b: i32) -> Result<i32, String> { Ok(a / b) }).',
      success: '✅ Great! You used Result<T, E> effectively.'
    },
    {
      title: "Practice error propagation",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Error Propagation</h4>
          <p>
            Propagate errors up the call stack using <code>?</code> or explicit returns.
          </p>
          <p className="mt-2">
            <b>🔹 Using ? Operator</b><br />
            Propagate errors:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn read_file(path: &str) -> Result<String, std::io::Error> {\n    std::fs::read_to_string(path)?\n    Ok(String::new())\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Explicit Propagation</b><br />
            Manual error handling:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn process_file(path: &str) -> Result<String, String> {\n    match std::fs::read_to_string(path) {\n        Ok(content) => Ok(content),\n        Err(_) => Err("Failed to read".to_string()),\n    }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Chaining</b><br />
            Propagate through multiple calls:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn process() -> Result<i32, String> {\n    let num = parse_number("42")?.parse::<i32>()?;\n    Ok(num)\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with error propagation (e.g., fn f() -> Result<(), &str> { Ok(()) } let x = f()?;).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*\([^)]*\)\s*->\s*Result<[^>]+>\s*\{.*\?.*\})/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with error propagation (e.g., fn f() -> Result<(), &str> { Ok(()) } let x = f()?;).',
      success: '✅ Great! You practiced error propagation.'
    },
    {
      title: "Build robust programs with proper error handling",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Robust Error Handling</h4>
          <p>
            Combine <code>Result</code>, <code>Option</code>, and matching for reliable programs.
          </p>
          <p className="mt-2">
            <b>🔹 Comprehensive Handling</b><br />
            Handle multiple error types:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn process_input(s: &str) -> Result<i32, String> {\n    if s.is_empty() {\n        return Err("Empty input".to_string());\n    }\n    s.parse::<i32>().map_err(|_| "Invalid number".to_string())\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Combining Option and Result</b><br />
            Handle optional results:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn find_number(s: &str) -> Result<Option<i32>, String> {\n    if s.is_empty() {\n        Ok(None)\n    } else {\n        Ok(Some(s.parse::<i32>().map_err(|_| "Invalid number".to_string())?))\n    }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Error Recovery</b><br />
            Provide fallback values:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn safe_divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err("Division by zero".to_string())\n    } else {\n        Ok(a / b)\n    }\n}\nlet result = safe_divide(10, 0).unwrap_or(0);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with robust error handling (e.g., fn f(s: &str) -> Result<i32, String> { s.parse().map_err(|_| "Invalid".to_string()) }).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*\([^)]*\)\s*->\s*Result<[^>]+>\s*\{.*(map_err|unwrap_or|if\s+\w+\s*\{.*Err.*\}.*Ok.*\})\})/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with robust error handling (e.g., fn f(s: &str) -> Result<i32, String> { s.parse().map_err(|_| "Invalid".to_string()) }).',
      success: '✅ Great! You built robust error handling.'
    },
    {
      title: "Explore custom error types with thiserror or anyhow",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Custom Error Types</h4>
          <p>
            Use <code>thiserror</code> for structured errors or <code>anyhow</code> for simple error handling.
          </p>
          <p className="mt-2">
            <b>🔹 thiserror</b><br />
            Define structured errors:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use thiserror::Error;\n#[derive(Error, Debug)]\npub enum MyError {\n    #[error("Invalid input: {0}")]\n    InvalidInput(String),\n}\nfn process(s: &str) -> Result<(), MyError> {\n    if s.is_empty() {\n        Err(MyError::InvalidInput("empty".to_string()))\n    } else {\n        Ok(())\n    }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 anyhow</b><br />
            Simple error handling:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use anyhow::Result;\nfn process(s: &str) -> Result<()> {\n    if s.is_empty() {\n        anyhow::bail!("Empty input");\n    }\n    Ok(())\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Comparison</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Crate</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">thiserror</td>
                  <td className="border border-green-400 p-2">Structured, library errors</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">anyhow</td>
                  <td className="border border-green-400 p-2">Quick, application errors</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using a custom error type with thiserror or anyhow (e.g., use thiserror::Error; #[derive(Error, Debug)] enum MyError { ... }).',
      check: (code) => {
        const result = /\b(use\s+(thiserror::Error|anyhow::Result);\s*(#\[derive\(Error,.*\]\s*enum\s+\w+\s*\{.*\}|fn\s+\w+\s*\([^)]*\)\s*->\s*Result<[^>]*>\s*\{.*(bail!\([^)]+\)|Err\([^)]+\))\}))/ms.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using thiserror or anyhow (e.g., use thiserror::Error; #[derive(Error, Debug)] enum MyError { ... }).',
      success: '✅ Great! You explored custom error types with thiserror or anyhow.'
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
          console.log("Completing Level 6");
          localStorage.setItem("level6RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 6: Rust Error Handling</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 6, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level5RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 6: Rust Error Handling</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 5 First</h3>
          <p>
            You need to complete Level 5 before accessing Level 6. Go back and finish the Rust Data Structures lessons!
          </p>
          <Link href="/level5" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 5
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 6: Rust Error Handling</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 6</h2>
          <Link href="/level7" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 7 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}

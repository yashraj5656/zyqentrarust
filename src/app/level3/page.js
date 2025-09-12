"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level3() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level2RustCompleted, setLevel2RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel2RustCompleted(localStorage.getItem("level2RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Rust’s Memory Model: Stack vs. Heap",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Rust’s Memory Model: Stack vs. Heap</h4>
          <p>
            Rust manages memory using stack (fast, fixed-size) and heap (dynamic, allocated) without a garbage collector.
          </p>
          <p className="mt-2">
            <b>🔹 Stack</b><br />
            Stores fixed-size data like integers:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x: i32 = 42; // Stack: fixed size, fast`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Heap</b><br />
            Stores dynamic data like strings:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s: String = String::from("hello"); // Heap: dynamic size`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Stack vs. Heap</b><br />
            Stack is faster; heap requires allocation:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let num = 10; // Stack\nlet text = String::from("Rust"); // Heap\nlet arr = vec![1, 2, 3]; // Heap`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with stack or heap data (e.g., let x: i32 = 42, let s: String = String::from("hello")).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*(:\s*(i32|f64|bool|char|String))?\s*=\s*(\d+|String::from\("\w+"\)|\[\w+\]|vec!\[\S+\]))/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with stack data (e.g., let x: i32 = 42) or heap data (e.g., let s: String = String::from("hello")).',
      success: '✅ Great! You understand Rust’s stack vs. heap memory model.'
    },
    {
      title: "Ownership Rules (Each Value Has One Owner)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Ownership Rules</h4>
          <p>
            Rust’s ownership ensures memory safety: each value has one owner, dropped when out of scope.
          </p>
          <p className="mt-2">
            <b>🔹 Ownership Move</b><br />
            Moving ownership invalidates the original variable:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s1 = String::from("hello");\nlet s2 = s1; // s1 moved, no longer valid\nprintln!("{}", s2);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Copy for Stack Data</b><br />
            Simple types are copied:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let x = 5;\nlet y = x; // x copied, both valid\nprintln!("{}", x);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Ownership in Functions</b><br />
            Passing to functions can move ownership:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn take(s: String) { println!("{}", s); }\nlet s = String::from("hello");\ntake(s); // s moved`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet showing ownership or copy (e.g., let s1 = String::from("hello"); let s2 = s1;).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*(:\s*String)?\s*=\s*(String::from\("\w+"\)|\d+);\s*let\s+\w+\s*=\s*\w+;)/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with ownership (e.g., let s1 = String::from("hello"); let s2 = s1;) or copy (e.g., let x = 5; let y = x;).',
      success: '✅ Great! You understand Rust’s ownership rules.'
    },
    {
      title: "Borrowing and Mutability Rules",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Borrowing and Mutability Rules</h4>
          <p>
            Borrowing allows accessing data without taking ownership, using references (<code>&</code>).
          </p>
          <p className="mt-2">
            <b>🔹 Immutable Borrowing</b><br />
            Multiple read-only references:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s = String::from("hello");\nlet r1 = &s;\nlet r2 = &s;\nprintln!("{}", r1); // s still valid`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Mutable Borrowing</b><br />
            Single mutable reference:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut s = String::from("hello");\nlet r = &mut s;\nr.push_str(", world");\nprintln!("{}", s);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Borrowing in Functions</b><br />
            Pass references to avoid moves:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn print_str(s: &String) { println!("{}", s); }\nlet s = String::from("hello");\nprint_str(&s); // s still valid`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with borrowing (e.g., let r = &s; or let r = &mut s;).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*=\s*&(mut\s+)?\w+;.*(println!|\w+\.\w+\(\)))/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a borrowing snippet with usage (e.g., let r = &s; println!("{}", r); or let r = &mut s; r.push_str("...");).',
      success: '✅ Great! You mastered borrowing and mutability.'
    },
    {
      title: "Lifetimes and Their Importance",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Lifetimes and Their Importance</h4>
          <p>
            Lifetimes ensure references are valid, preventing dangling pointers.
          </p>
          <p className="mt-2">
            <b>🔹 Lifetime Annotation</b><br />
            Use <code>'a</code> to tie references:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {\n    if s1.len() > s2.len() { s1 } else { s2 }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Lifetime in Structs</b><br />
            Structs with references need lifetimes:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Ref<'a> {\n    s: &'a str,\n}\nlet s = String::from("hello");\nlet r = Ref { s: &s };`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Lifetime Elision</b><br />
            Rust infers lifetimes in simple cases:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn first(s: &str) -> &str { s } // Implicit lifetime`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with a lifetime annotation (e.g., fn longest<\'a>(s1: &\'a str, s2: &\'a str) -> &\'a str).',
      check: (code) => {
        const result = /\b(fn\s+\w+<'a>\s*\([^)]*&\s*'a\s+\w+[^)]*\)\s*->\s*&\s*'a\s+\w+|struct\s+\w+<'a>\s*\{.*&\s*'a\s+\w+.*\})/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with a lifetime (e.g., fn longest<\'a>(s1: &\'a str, s2: &\'a str) -> &\'a str or struct Ref<\'a> { s: &\'a str }).',
      success: '✅ Great! You understand lifetimes.'
    },
    {
      title: "Avoiding Common Compiler Errors",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Avoiding Common Compiler Errors</h4>
          <p>
            Learn to fix common ownership and borrowing errors.
          </p>
          <p className="mt-2">
            <b>🔹 Use After Move</b><br />
            Use <code>clone</code> to keep the original:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s1 = String::from("hello");\nlet s2 = s1.clone();\nprintln!("{}", s1); // Valid`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Borrowing Conflicts</b><br />
            Limit mutable borrow scope:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut s = String::from("hello");\n{\n    let r1 = &mut s;\n} // r1 scope ends\nlet r2 = &mut s;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Dangling Reference</b><br />
            Ensure data outlives references:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let s = String::from("hello");\nlet r = &s;\nprintln!("{}", r); // Valid`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Summary of Concepts</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Concept</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Key Point</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Stack vs. Heap</td>
                  <td className="border border-green-400 p-2">Stack: fixed, fast; Heap: dynamic</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Ownership</td>
                  <td className="border border-green-400 p-2">One owner, dropped at scope end</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Borrowing</td>
                  <td className="border border-green-400 p-2">&amp; for immutable, &amp;mut for mutable</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Lifetimes</td>
                  <td className="border border-green-400 p-2">Ensure references are valid</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Error Fixes</td>
                  <td className="border border-green-400 p-2">Use clone(), limit borrow scope</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a snippet avoiding a common error (e.g., let s2 = s1.clone(); or let r = &s;).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?\w+\s*=\s*(\w+\.clone\(\)|&\s*(mut\s+)?\w+);.*(println!|\w+\.\w+\(\)))/ms.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet avoiding errors with usage (e.g., let s2 = s1.clone(); println!("{}", s1); or let r = &s; println!("{}", r);).',
      success: '✅ Great! You avoided common compiler errors.'
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
          console.log("Completing Level 3");
          localStorage.setItem("level3RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 3: Rust Ownership, Borrowing, and Lifetimes</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 3, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level2RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 3: Rust Ownership, Borrowing, and Lifetimes</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 2 First</h3>
          <p>
            You need to complete Level 2 before accessing Level 3. Go back and finish the Rust Control Flow lessons!
          </p>
          <Link href="/level2" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 2
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 3: Rust Ownership, Borrowing, and Lifetimes</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 3</h2>
          <Link href="/level4" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 4 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}
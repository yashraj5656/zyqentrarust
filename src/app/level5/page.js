"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level5() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level4RustCompleted, setLevel4RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel4RustCompleted(localStorage.getItem("level4RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Learn arrays, slices, and vectors",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Arrays, Slices, and Vectors</h4>
          <p>Arrays have fixed size, slices are views into arrays/vectors, and vectors are dynamic arrays.</p>
          <p className="mt-2">
            <b>🔹 Arrays</b>
            <pre style={{ background: "#222", color: "#0f0", padding: "10px", borderRadius: "8px" }}>
{`let arr: [i32; 3] = [1, 2, 3];\nprintln!("First: {}", arr[0]);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Slices</b>
            <pre style={{ background: "#222", color: "#0f0", padding: "10px", borderRadius: "8px" }}>
{`let arr = [1, 2, 3, 4];\nlet slice: &[i32] = &arr[1..3];\nprintln!("Slice: {:?}", slice);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Vectors</b>
            <pre style={{ background: "#222", color: "#0f0", padding: "10px", borderRadius: "8px" }}>
{`let mut vec: Vec<i32> = Vec::new();\nvec.push(1);\nvec.push(2);\nprintln!("Vector: {:?}", vec);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with an array, slice, or vector.',
      check: (code) => /\b(let\s+\w+\s*(:\s*\[\w+;\d+\]|:\s*Vec<\w+>)?)/.test(code),
      error: '❌ Try again. Write a snippet with an array, slice, or vector.',
      success: '✅ Great! You learned arrays, slices, and vectors in Rust.'
    },
    {
      title: "Work with tuples and structs",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Tuples and Structs</h4>
          <p>Tuples group different types, structs define custom types with named fields.</p>
        </div>
      ),
      task: 'Write a snippet with a tuple or struct.',
      check: (code) => /\b(tuple|struct)/i.test(code),
      error: '❌ Try again. Write a snippet with a tuple or struct.',
      success: '✅ Great! You worked with tuples and structs.'
    },
    {
      title: "Use enums and pattern matching",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Enums and Pattern Matching</h4>
          <p>Enums define variants, pattern matching handles them with <code>match</code>.</p>
        </div>
      ),
      task: 'Write a snippet using an enum or match statement.',
      check: (code) => /\b(enum|match)/.test(code),
      error: '❌ Try again. Write a snippet using an enum or match statement.',
      success: '✅ Great! You used enums and pattern matching.'
    },
    {
      title: "Explore Option and Result for safe error handling",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Option and Result</h4>
          <p>Option for optional values, Result for error handling without panics.</p>
        </div>
      ),
      task: 'Write a snippet using Option or Result (e.g., let opt: Option<i32> = Some(5); match opt { Some(x) => {}, None => {} }).',
      check: (code) => /\b(Option|Result|Some|None|Ok|Err)/.test(code),
      error: '❌ Try again. Write a snippet using Option or Result.',
      success: '✅ Great! You explored Option and Result for safe error handling.'
    },
    {
      title: "Practice building custom data types",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Building Custom Data Types</h4>
          <p>Combine structs, enums, and traits to create complex types.</p>
        </div>
      ),
      task: 'Write a snippet using struct or enum.',
      check: (code) => /\b(struct|enum)/.test(code),
      error: '❌ Try again. Write a snippet using struct or enum.',
      success: '✅ Great! You practiced building custom data types.'
    }
  ];

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setCode("");
      setMessage("");
    }
  };

  const handlePrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setCode("");
      setMessage("");
    }
  };

  const checkCode = () => {
    if (!code.trim()) {
      setMessage("❌ Please enter some code to check.");
      return;
    }
    try {
      if (lessons[currentLesson].check(code)) {
        setMessage(lessons[currentLesson].success);
        if (currentLesson < lessons.length - 1) {
          setTimeout(() => {
            setCurrentLesson(currentLesson + 1);
            setCode("");
            setMessage("");
          }, 1000);
        } else {
          localStorage.setItem("level5RustCompleted", "true");
        }
      } else {
        setMessage(lessons[currentLesson].error);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ An error occurred while checking your code.");
    }
  };

  if (!subscribed) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">🚀 Level 5: Data Structures</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Subscribe Now</Link>
        </div>
      </div>
    );
  }

  if (!level4RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">🚀 Level 5: Data Structures</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 4 First</h3>
          <Link href="/level4" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go to Level 4</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">🚀 Level 5: Data Structures</h2>

      {currentLesson < lessons.length ? (
        <div>
          <div className="nav-buttons flex justify-between mb-6">
            <button onClick={handlePrev} disabled={currentLesson === 0} className="btn px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400">⬅ Previous</button>
          </div>

          <h3 className="text-xl font-semibold mb-4">{lessons[currentLesson].title}</h3>
          <div className="lesson-description text-gray-700 mb-4">{lessons[currentLesson].description}</div>
          <p className="task font-semibold mb-4"><b>Task:</b> {lessons[currentLesson].task}</p>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Rust snippet here..."
            className="w-full p-3 border rounded-md mb-4 font-mono text-sm"
            rows={8}
          />

          <button onClick={checkCode} className="btn px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4">Check</button>

          {message && <p className="message font-semibold">{message}</p>}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">🎉 Level 5 Completed!</h3>
          <Link href="/level6" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go to Level 6</Link>
        </div>
      )}
    </div>
  );
}

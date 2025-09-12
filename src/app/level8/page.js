
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level8() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level7RustCompleted, setLevel7RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel7RustCompleted(localStorage.getItem("level7RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Work with HashMaps, HashSets, and BTreeMaps",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">HashMaps, HashSets, and BTreeMaps</h4>
          <p>
            Rust’s collections like <code>HashMap</code>, <code>HashSet</code>, and <code>BTreeMap</code> store key-value pairs or unique values.
          </p>
          <p className="mt-2">
            <b>🔹 HashMap</b><br />
            Key-value storage with hashing:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("key1", 42);\nprintln!("{:?}", map.get("key1"));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 HashSet</b><br />
            Unique values:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::collections::HashSet;\nlet mut set = HashSet::new();\nset.insert(42);\nprintln!("{:?}", set.contains(&42));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 BTreeMap</b><br />
            Sorted key-value storage:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::collections::BTreeMap;\nlet mut map = BTreeMap::new();\nmap.insert(1, "one");\nprintln!("{:?}", map.get(&1));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Comparison Table</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Collection</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">HashMap</td>
                  <td className="border border-green-400 p-2">Fast key-value lookup</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">HashSet</td>
                  <td className="border border-green-400 p-2">Unique values</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">BTreeMap</td>
                  <td className="border border-green-400 p-2">Sorted key-value pairs</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using HashMap, HashSet, or BTreeMap (e.g., use std::collections::HashMap; let mut map = HashMap::new();).',
      check: (code) => {
        const result = /\b(use\s+std::collections::(HashMap|HashSet|BTreeMap);.*let\s+mut\s+\w+\s*=\s*(HashMap|HashSet|BTreeMap)::new\(\);)/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using HashMap, HashSet, or BTreeMap (e.g., use std::collections::HashMap; let mut map = HashMap::new();).',
      success: '✅ Great! You worked with HashMaps, HashSets, and BTreeMaps.'
    },
    {
      title: "Master iterators and iterator adapters (map, filter, collect)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Iterators and Adapters</h4>
          <p>
            Iterators provide a way to process collections; adapters like <code>map</code>, <code>filter</code>, and <code>collect</code> transform data.
          </p>
          <p className="mt-2">
            <b>🔹 Map Adapter</b><br />
            Transform each element:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3];\nlet doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();\nprintln!("{:?}", doubled);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Filter Adapter</b><br />
            Select elements:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3, 4];\nlet evens: Vec<i32> = v.iter().filter(|&&x| x % 2 == 0).collect();\nprintln!("{:?}", evens);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Collect</b><br />
            Gather results into a collection:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3];\nlet result: Vec<i32> = v.iter().map(|x| x + 1).collect();\nprintln!("{:?}", result);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using an iterator with map, filter, or collect (e.g., vec![1, 2].iter().map(|x| x * 2).collect::<Vec<i32>>()).',
      check: (code) => {
        const result = /\b(\w+\.iter\(\)\.(map|filter)\(\|.*\|\s*\S+.*\)\.collect)/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using an iterator with map, filter, or collect (e.g., vec![1, 2].iter().map(|x| x * 2).collect::<Vec<i32>>()).',
      success: '✅ Great! You mastered iterators and iterator adapters.'
    },
    {
      title: "Understand ownership in iterators (into_iter, iter, iter_mut)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Ownership in Iterators</h4>
          <p>
            Rust’s iterators handle ownership differently with <code>into_iter</code>, <code>iter</code>, and <code>iter_mut</code>.
          </p>
          <p className="mt-2">
            <b>🔹 into_iter</b><br />
            Consumes the collection, taking ownership:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3];\nfor x in v.into_iter() {\n    println!("{}", x);\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 iter</b><br />
            Borrows elements immutably:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3];\nfor x in v.iter() {\n    println!("{}", x);\n}\nprintln!("{:?}", v); // v still usable`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 iter_mut</b><br />
            Borrows elements mutably:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut v = vec![1, 2, 3];\nfor x in v.iter_mut() {\n    *x += 1;\n}\nprintln!("{:?}", v);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using into_iter, iter, or iter_mut (e.g., vec![1, 2].iter().map(|x| x + 1) or v.into_iter()).',
      check: (code) => {
        const result = /\b(\w+\.(into_iter|iter|iter_mut)\(\))/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using into_iter, iter, or iter_mut (e.g., vec![1, 2].iter().map(|x| x + 1) or v.into_iter()).',
      success: '✅ Great! You understood ownership in iterators.'
    },
    {
      title: "Practice functional-style programming with iterators",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Functional-Style Programming</h4>
          <p>
            Use iterators for concise, functional-style code with chaining and adapters.
          </p>
          <p className="mt-2">
            <b>🔹 Chaining Adapters</b><br />
            Combine multiple operations:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3, 4];\nlet result: Vec<i32> = v.iter()\n    .filter(|&&x| x % 2 == 0)\n    .map(|x| x * 2)\n    .collect();\nprintln!("{:?}", result);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Fold</b><br />
            Reduce to a single value:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![1, 2, 3];\nlet sum: i32 = v.iter().fold(0, |acc, x| acc + x);\nprintln!("{}", sum);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Any/All</b><br />
            Check conditions:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let v = vec![2, 4, 6];\nlet all_even = v.iter().all(|&x| x % 2 == 0);\nprintln!("{}", all_even);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with functional-style iterator operations (e.g., vec![1, 2].iter().map(|x| x * 2).collect() or .fold(0, |a, b| a + b)).',
      check: (code) => {
        const result = /\b(\w+\.iter\(\)\.(map|filter|fold|all|any)\(\|.*\|\s*\S+.*\)(.*\.collect)?)/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with functional-style iterator operations (e.g., vec![1, 2].iter().map(|x| x * 2).collect() or .fold(0, |a, b| a + b)).',
      success: '✅ Great! You practiced functional-style programming with iterators.'
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
          console.log("Completing Level 8");
          localStorage.setItem("level8RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 8: Rust Collections and Iterators</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 8, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level7RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 8: Rust Collections and Iterators</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 7 First</h3>
          <p>
            You need to complete Level 7 before accessing Level 8. Go back and finish the Rust Traits and Generics lessons!
          </p>
          <Link href="/level7" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 7
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 8: Rust Collections and Iterators</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 8</h2>
          <Link href="/level9" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 9 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}

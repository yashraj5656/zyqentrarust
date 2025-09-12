
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level9() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level8RustCompleted, setLevel8RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel8RustCompleted(localStorage.getItem("level8RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Learn about threads with std::thread",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Threads with std::thread</h4>
          <p>
            Rust’s <code>std::thread</code> module allows creating and managing threads for concurrent execution.
          </p>
          <p className="mt-2">
            <b>🔹 Spawning a Thread</b><br />
            Run code in a new thread:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::thread;\nthread::spawn(|| {\n    println!("In a new thread!");\n});\nthread::sleep(std::time::Duration::from_millis(100));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Joining Threads</b><br />
            Wait for a thread to finish:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::thread;\nlet handle = thread::spawn(|| {\n    "Hello from thread"\n});\nlet result = handle.join().unwrap();\nprintln!("{}", result);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Moving Data</b><br />
            Move data into a thread:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::thread;\nlet v = vec![1, 2, 3];\nthread::spawn(move || {\n    println!("{:?}", v);\n}).join().unwrap();`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using std::thread (e.g., use std::thread; thread::spawn(|| { println!("Hello"); });).',
      check: (code) => {
        const result = /\b(use\s+std::thread;.*thread::spawn\s*\(\s*\|[^|]*\|\s*\{.*\}\s*\))/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using std::thread (e.g., use std::thread; thread::spawn(|| { println!("Hello"); });).',
      success: '✅ Great! You learned about threads with std::thread.'
    },
    {
      title: "Use channels for message passing (mpsc)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Channels with mpsc</h4>
          <p>
            The <code>std::sync::mpsc</code> module provides channels for safe message passing between threads.
          </p>
          <p className="mt-2">
            <b>🔹 Sending Data</b><br />
            Send messages via a channel:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::sync::mpsc;\nuse std::thread;\nlet (tx, rx) = mpsc::channel();\nthread::spawn(move || {\n    tx.send(42).unwrap();\n});\nlet received = rx.recv().unwrap();\nprintln!("{}", received);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Multiple Messages</b><br />
            Send multiple values:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::sync::mpsc;\nuse std::thread;\nlet (tx, rx) = mpsc::channel();\nthread::spawn(move || {\n    for i in 1..4 {\n        tx.send(i).unwrap();\n    }\n});\nfor received in rx {\n    println!("{}", received);\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Multiple Senders</b><br />
            Clone transmitter for multiple threads:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::sync::mpsc;\nuse std::thread;\nlet (tx, rx) = mpsc::channel();\nlet tx2 = tx.clone();\nthread::spawn(move || tx.send(1).unwrap());\nthread::spawn(move || tx2.send(2).unwrap());\nprintln!("{}", rx.recv().unwrap());`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using mpsc channels (e.g., use std::sync::mpsc; let (tx, rx) = mpsc::channel(); tx.send(42);).',
      check: (code) => {
        const result = /\b(use\s+std::sync::mpsc;.*let\s*\([^)]+\)\s*=\s*mpsc::channel\(\);.*(tx\.send|rx\.recv))/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using mpsc channels (e.g., use std::sync::mpsc; let (tx, rx) = mpsc::channel(); tx.send(42);).',
      success: '✅ Great! You used channels for message passing.'
    },
    {
      title: "Explore Arc and Mutex for safe shared state",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Arc and Mutex</h4>
          <p>
            <code>Arc</code> (Atomic Reference Counting) and <code>Mutex</code> ensure safe shared state across threads.
          </p>
          <p className="mt-2">
            <b>🔹 Arc</b><br />
            Share data across threads:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::sync::Arc;\nuse std::thread;\nlet data = Arc::new(42);\nlet data2 = Arc::clone(&data);\nthread::spawn(move || {\n    println!("{}", data2);\n}).join().unwrap();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Mutex</b><br />
            Protect shared data:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::sync::{Arc, Mutex};\nuse std::thread;\nlet counter = Arc::new(Mutex::new(0));\nlet counter2 = Arc::clone(&counter);\nthread::spawn(move || {\n    let mut num = counter2.lock().unwrap();\n    *num += 1;\n}).join().unwrap();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Combined Usage</b><br />
            Safe counter increment:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use std::sync::{Arc, Mutex};\nuse std::thread;\nlet counter = Arc::new(Mutex::new(0));\nlet mut handles = vec![];\nfor _ in 0..3 {\n    let counter = Arc::clone(&counter);\n    handles.push(thread::spawn(move || {\n        let mut num = counter.lock().unwrap();\n        *num += 1;\n    }));\n}\nfor handle in handles {\n    handle.join().unwrap();\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using Arc or Mutex (e.g., use std::sync::{Arc, Mutex}; let data = Arc::new(Mutex::new(0));).',
      check: (code) => {
        const result = /\b(use\s+std::sync::(Arc|Mutex|{Arc,\s*Mutex});.*(Arc::new|Mutex::new)\()/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using Arc or Mutex (e.g., use std::sync::{Arc, Mutex}; let data = Arc::new(Mutex::new(0));).',
      success: '✅ Great! You explored Arc and Mutex for safe shared state.'
    },
    {
      title: "Understand async/await syntax",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Async/Await Syntax</h4>
          <p>
            Rust’s <code>async</code> and <code>await</code> enable asynchronous programming for non-blocking tasks.
          </p>
          <p className="mt-2">
            <b>🔹 Async Function</b><br />
            Define an async function:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`async fn say_hello() -> String {\n    String::from("Hello")\n}\nlet result = say_hello().await;`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Awaiting Futures</b><br />
            Wait for async results:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use async_std::task;\nasync fn example() -> i32 {\n    task::sleep(std::time::Duration::from_secs(1)).await;\n    42\n}\nlet result = task::block_on(example());`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Async Block</b><br />
            Use async blocks:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use async_std::task;\nlet fut = async {\n    task::sleep(std::time::Duration::from_secs(1)).await;\n    42\n};\nlet result = task::block_on(fut);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using async/await (e.g., async fn example() -> i32 { 42 } let x = example().await;).',
      check: (code) => {
        const result = /\b(async\s+fn\s+\w+\s*\([^)]*\).*\{.*\}|.*\.await)/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using async/await (e.g., async fn example() -> i32 { 42 } let x = example().await;).',
      success: '✅ Great! You understood async/await syntax.'
    },
    {
      title: "Practice with async runtimes like tokio or async-std",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Async Runtimes</h4>
          <p>
            Use <code>tokio</code> or <code>async-std</code> for running async code with executors and utilities.
          </p>
          <p className="mt-2">
            <b>🔹 Tokio Runtime</b><br />
            Run async tasks with Tokio:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use tokio::time;\n#[tokio::main]\nasync fn main() {\n    time::sleep(time::Duration::from_secs(1)).await;\n    println!("Done");\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Async-std Runtime</b><br />
            Run async tasks with async-std:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use async_std::task;\nasync fn main() -> std::io::Result<()> {\n    task::sleep(std::time::Duration::from_secs(1)).await;\n    println!("Done");\n    Ok(())\n}\nlet result = task::block_on(main());`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Spawning Tasks</b><br />
            Run concurrent tasks:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`use tokio::task;\n#[tokio::main]\nasync fn main() {\n    let handle = task::spawn(async {\n        println!("Task running");\n    });\n    handle.await.unwrap();\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Comparison Table</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Runtime</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Tokio</td>
                  <td className="border border-green-400 p-2">High-performance, feature-rich</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">async-std</td>
                  <td className="border border-green-400 p-2">Lightweight, std-like</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet using tokio or async-std (e.g., use tokio::time; async fn main() { time::sleep(time::Duration::from_secs(1)).await; }).',
      check: (code) => {
        const result = /\b(use\s+(tokio|async_std)::(time|task);.*(#[tokio::main]|task::block_on|time::sleep|task::spawn)\()/ms.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet using tokio or async-std (e.g., use tokio::time; async fn main() { time::sleep(time::Duration::from_secs(1)).await; }).',
      success: '✅ Great! You practiced with async runtimes like tokio or async-std.'
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
          console.log("Completing Level 9");
          localStorage.setItem("level9RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 9: Rust Concurrency and Asynchronous Programming</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 9, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level8RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 9: Rust Concurrency and Asynchronous Programming</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 8 First</h3>
          <p>
            You need to complete Level 8 before accessing Level 9. Go back and finish the Rust Collections and Iterators lessons!
          </p>
          <Link href="/level8" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 8
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 9: Rust Concurrency and Asynchronous Programming</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 9</h2>
          <Link href="/certificate" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Get Certificate ➡️
          </Link>
        </div>
      )}
    </div>
  );
}

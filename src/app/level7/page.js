
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Level7() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [level6RustCompleted, setLevel6RustCompleted] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    setLevel6RustCompleted(localStorage.getItem("level6RustCompleted") === "true");
  }, []);

  const lessons = [
    {
      title: "Understand generics for flexible functions & structs",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Generics in Rust</h4>
          <p>
            Generics allow functions and structs to work with multiple types, increasing flexibility.
          </p>
          <p className="mt-2">
            <b>🔹 Generic Function</b><br />
            Define a function with a type parameter:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn largest<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b { a } else { b }\n}\nlet result = largest(5, 10);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Generic Struct</b><br />
            Struct with generic fields:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Point<T> {\n    x: T,\n    y: T,\n}\nlet p = Point { x: 1, y: 2 };`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Multiple Type Parameters</b><br />
            Use multiple generics:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Pair<T, U> {\n    first: T,\n    second: U,\n}\nlet pair = Pair { first: 1, second: "hello" };`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with a generic function or struct (e.g., fn largest<T>(a: T, b: T) -> T or struct Point<T> { x: T }).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*<T[^>]*>\s*\([^)]*:\s*T.*\)\s*->\s*T\s*\{|struct\s+\w+\s*<\w+>\s*\{.*\w+\s*:\s*\w+.*\})/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with a generic function or struct (e.g., fn largest<T>(a: T, b: T) -> T or struct Point<T> { x: T }).',
      success: '✅ Great! You understood generics for flexible functions and structs.'
    },
    {
      title: "Learn about traits (Rust’s version of interfaces)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Traits in Rust</h4>
          <p>
            Traits define shared behavior, similar to interfaces in other languages.
          </p>
          <p className="mt-2">
            <b>🔹 Defining a Trait</b><br />
            Declare a trait with methods:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`trait Summary {\n    fn summarize(&self) -> String;\n}\nstruct Article {\n    title: String,\n}\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        self.title.clone()\n    }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Using Traits</b><br />
            Call trait methods:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let article = Article { title: String::from("Rust") };\nprintln!("{}", article.summarize());`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Default Implementations</b><br />
            Provide default behavior:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`trait Summary {\n    fn summarize(&self) -> String {\n        String::from("Default")\n    }\n}\nstruct Book;\nimpl Summary for Book {}\nlet book = Book;\nprintln!("{}", book.summarize());`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet defining or using a trait (e.g., trait Summary { fn summarize(&self); } or impl Summary for Type).',
      check: (code) => {
        const result = /\b(trait\s+\w+\s*\{.*fn\s+\w+\s*\([^)]*\).*?\}|impl\s+\w+\s+for\s+\w+\s*\{.*\})/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet defining or using a trait (e.g., trait Summary { fn summarize(&self); } or impl Summary for Type).',
      success: '✅ Great! You learned about traits in Rust.'
    },
    {
      title: "Implement standard traits (Debug, Clone, PartialEq, etc.)",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Standard Traits</h4>
          <p>
            Rust’s standard traits like <code>Debug</code>, <code>Clone</code>, and <code>PartialEq</code> add common functionality.
          </p>
          <p className="mt-2">
            <b>🔹 Debug Trait</b><br />
            Enable debug printing:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`#[derive(Debug)]\nstruct Point {\n    x: i32,\n}\nlet p = Point { x: 1 };\nprintln!("{:?}", p);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Clone Trait</b><br />
            Explicit copying:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`#[derive(Clone)]\nstruct Data {\n    value: i32,\n}\nlet d1 = Data { value: 42 };\nlet d2 = d1.clone();`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 PartialEq Trait</b><br />
            Enable equality comparison:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`#[derive(PartialEq)]\nstruct Item {\n    id: i32,\n}\nlet a = Item { id: 1 };\nlet b = Item { id: 1 };\nprintln!("{}", a == b);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet implementing a standard trait (e.g., #[derive(Debug)] struct Point { x: i32 } or #[derive(Clone)]).',
      check: (code) => {
        const result = /\b(#[derive\((Debug|Clone|PartialEq)\)]\s*struct\s+\w+\s*\{.*\})/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet implementing a standard trait (e.g., #[derive(Debug)] struct Point { x: i32 }).',
      success: '✅ Great! You implemented standard traits.'
    },
    {
      title: "Create custom traits",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Custom Traits</h4>
          <p>
            Define custom traits to share behavior across types.
          </p>
          <p className="mt-2">
            <b>🔹 Custom Trait</b><br />
            Define and implement:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`trait Area {\n    fn area(&self) -> f64;\n}\nstruct Circle {\n    radius: f64,\n}\nimpl Area for Circle {\n    fn area(&self) -> f64 {\n        3.14 * self.radius * self.radius\n    }\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Multiple Implementations</b><br />
            Implement for multiple types:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Rectangle {\n    width: f64,\n    height: f64,\n}\nimpl Area for Rectangle {\n    fn area(&self) -> f64 {\n        self.width * self.height\n    }\n}\nlet rect = Rectangle { width: 2.0, height: 3.0 };\nprintln!("{}", rect.area());`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Default Methods</b><br />
            Provide default behavior:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`trait Describable {\n    fn describe(&self) -> String {\n        String::from("An object")\n    }\n}\nstruct Item;\nimpl Describable for Item {}\nlet item = Item;\nprintln!("{}", item.describe());`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet creating a custom trait (e.g., trait Area { fn area(&self) -> f64; } impl Area for Type).',
      check: (code) => {
        const result = /\b(trait\s+\w+\s*\{.*fn\s+\w+\s*\([^)]*\)\s*->\s*\w+.*?\}\s*impl\s+\w+\s+for\s+\w+\s*\{.*fn\s+\w+\s*\([^)]*\)\s*->\s*\w+\s*\{.*\}\})/ms.test(code);
        console.log(`Lesson 3 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet creating a custom trait (e.g., trait Area { fn area(&self) -> f64; } impl Area for Type).',
      success: '✅ Great! You created a custom trait.'
    },
    {
      title: "Explore trait bounds and lifetimes in generics",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Trait Bounds and Lifetimes</h4>
          <p>
            Trait bounds constrain generic types; lifetimes ensure references are valid.
          </p>
          <p className="mt-2">
            <b>🔹 Trait Bounds</b><br />
            Restrict generics to types implementing traits:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn print<T: std::fmt::Debug>(value: T) {\n    println!("{:?}", value);\n}\nlet x = 42;\nprint(x);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Multiple Bounds</b><br />
            Combine traits:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn compare<T: PartialOrd + std::fmt::Debug>(a: T, b: T) {\n    println!("{:?} > {:?}", a, b);\n}\ncompare(5, 10);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Lifetimes</b><br />
            Ensure reference validity:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}\nlet result = longest("hello", "world");`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Summary Table</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Concept</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Trait Bounds</td>
                  <td className="border border-green-400 p-2">T: Trait</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Lifetimes</td>
                  <td className="border border-green-400 p-2">&'a Type</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a Rust snippet with trait bounds or lifetimes (e.g., fn print<T: std::fmt::Debug>(v: T) or fn longest<\'a>(x: &\'a str) -> &\'a str).',
      check: (code) => {
        const result = /\b(fn\s+\w+\s*<\w+:\s*\w+(\s*\+\s*\w+)?>.*|fn\s+\w+\s*<'a>.*&'a\s+\w+)/ms.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with trait bounds or lifetimes (e.g., fn print<T: std::fmt::Debug>(v: T) or fn longest<\'a>(x: &\'a str) -> &\'a str).',
      success: '✅ Great! You explored trait bounds and lifetimes in generics.'
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
          console.log("Completing Level 7");
          localStorage.setItem("level7RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 7: Rust Traits and Generics</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 7, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level6RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 7: Rust Traits and Generics</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 6 First</h3>
          <p>
            You need to complete Level 6 before accessing Level 7. Go back and finish the Rust Error Handling lessons!
          </p>
          <Link href="/level6" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 6
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 7: Rust Traits and Generics</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 7</h2>
          <Link href="/level8" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 8 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}

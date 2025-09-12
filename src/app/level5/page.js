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
          <p>
            Arrays have fixed size, slices are views into arrays/vectors, and vectors are dynamic arrays.
          </p>
          <p className="mt-2">
            <b>🔹 Arrays</b><br />
            Fixed-size collections:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let arr: [i32; 3] = [1, 2, 3];\nprintln!("First: {}", arr[0]);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Slices</b><br />
            Dynamic views:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let arr = [1, 2, 3, 4];\nlet slice: &[i32] = &arr[1..3];\nprintln!("Slice: {:?}", slice);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Vectors</b><br />
            Resizable arrays:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let mut vec: Vec<i32> = Vec::new();\nvec.push(1);\nvec.push(2);\nprintln!("Vector: {:?}", vec);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with an array, slice, or vector (e.g., let arr: [i32; 3] = [1, 2, 3]; or let mut vec = vec![1, 2];).',
      check: (code) => {
        const result = /\b(let\s+(mut\s+)?(\w+\s*:\s*\[\w+;\s*\d+\]\s*=\s*\[.*?\]|\w+\s*:\s*&\[\w+.*?\]|(mut\s+)?\w+\s*:\s*Vec<\w+>.*?Vec::new\(\)|vec!\[.*?\]))/ms.test(code);
        console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with an array, slice, or vector (e.g., let arr: [i32; 3] = [1, 2, 3]; or let mut vec = vec![1, 2];).',
      success: '✅ Great! You learned arrays, slices, and vectors in Rust.'
    },
    {
      title: "Work with tuples and structs",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Tuples and Structs</h4>
          <p>
            Tuples group different types, structs define custom types with named fields.
          </p>
          <p className="mt-2">
            <b>🔹 Tuples</b><br />
            Heterogeneous collections:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let tup: (i32, bool, &str) = (42, true, "hello");\nlet x = tup.0;\nprintln!("x: {}", x);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Structs</b><br />
            Custom data types:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Point {\n    x: i32,\n    y: i32,\n}\nlet p = Point { x: 1, y: 2 };\nprintln!("Point: ({}, {})", p.x, p.y);`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Tuple Structs</b><br />
            Structs like tuples:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Color(i32, i32, i32);\nlet red = Color(255, 0, 0);\nprintln!("R: {}", red.0);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with a tuple or struct (e.g., let tup = (1, "hi"); or struct Point { x: i32 } let p = Point { x: 1 };).',
      check: (code) => {
        const result = /\b((let\s+\w+\s*:\s*\([^)]+\)\s*=\s*\([^)]+\)|let\s+\w+\s*=\s*\([^)]+\))|(struct\s+\w+\s*\{[^}]*\w+\s*:\s*\w+[^}]*\}|struct\s+\w+\s*\([^)]+\);).*?(let\s+\w+\s*=\s*\w+\s*\{[^}]+\};))/ms.test(code);
        console.log(`Lesson 1 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with a tuple or struct (e.g., let tup = (1, "hi"); or struct Point { x: i32 } let p = Point { x: 1 };).',
      success: '✅ Great! You worked with tuples and structs.'
    },
    {
      title: "Use enums and pattern matching",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Enums and Pattern Matching</h4>
          <p>
            Enums define variants, pattern matching with <code>match</code> handles them.
          </p>
          <p className="mt-2">
            <b>🔹 Enums</b><br />
            Define variants:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`enum Message {\n    Quit,\n    Move { x: i32, y: i32 },\n    Write(String),\n}\nlet msg = Message::Write(String::from("hi"));`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Pattern Matching</b><br />
            Use <code>match</code>:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`enum IpAddrKind {\n    V4,\n    V6,\n}\nlet kind = IpAddrKind::V4;\nmatch kind {\n    IpAddrKind::V4 => println!("IPv4"),\n    IpAddrKind::V6 => println!("IPv6"),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Destructuring</b><br />
            Match with patterns:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`enum Point {\n    Unit,\n    Xy(i32, i32),\n}\nlet p = Point::Xy(1, 2);\nmatch p {\n    Point::Xy(x, y) => println!("x={}, y={}", x, y),\n    _ => println!("Unit"),\n}`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with an enum or pattern matching (e.g., enum Msg { Hi } let m = Msg::Hi; match m { Msg::Hi => {} }).',
      check: (code) => {
        const result = /\b(enum\s+\w+\s*\{[^}]*(,\s*\w+\s*(\{[^}]*\})?|\([^)]*\))[^}]*\}|match\s+\w+\s*\{[^}]*(\w+::\w+|\([^)]*\)|\w+)\s*=>)/ms.test(code);
        console.log(`Lesson 2 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet with an enum or pattern matching (e.g., enum Msg { Hi } let m = Msg::Hi; match m { Msg::Hi => {} }).',
      success: '✅ Great! You used enums and pattern matching.'
    },
    {
      title: "Explore Option and Result for safe error handling",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Option and Result</h4>
          <p>
            <code>Option</code> for optional values, <code>Result</code> for error handling without panics.
          </p>
          <p className="mt-2">
            <b>🔹 Option</b><br />
            Handle None/Some:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let some_num = Some(5);\nlet none_num: Option<i32> = None;\nmatch some_num {\n    Some(n) => println!("Got {}", n),\n    None => println!("Nothing"),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Result</b><br />
            Ok/Err variants:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`fn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        Err("Division by zero".to_string())\n    } else {\n        Ok(a / b)\n    }\n}\nlet res = divide(10.0, 2.0);\nmatch res {\n    Ok(val) => println!("Result: {}", val),\n    Err(e) => println!("Error: {}", e),\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Methods</b><br />
            Use unwrap or expect:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`let val = Some(3).unwrap_or(0);\nprintln!("Value: {}", val);`}
            </pre>
          </p>
        </div>
      ),
      task: 'Write a snippet with Option or Result (e.g., let opt: Option<i32> = Some(5); match opt { Some(x) => {}, None => {} }).',
      check: (code) => {
          try {
            const result = /\b(let\s+(mut\s+)?(\w+\s*:\s*\[\w+;\s*\d+\]\s*=\s*\[.*?\]|\w+\s*:\s*&\[\w+.*?\]|(mut\s+)?\w+\s*:\s*Vec<\w+>.*?Vec::new\(\)|vec!\[.*?\]))/ms.test(code);
            console.log(`Lesson 0 Check: Code="${code}", Result=${result}`);
            return result;
          } catch (err) {
            console.error('Regex check failed:', err);
            return false; // Fail gracefully
          }
      },
      error: '❌ Try again. Write a snippet with Option or Result (e.g., let opt: Option<i32> = Some(5); match opt { Some(x) => {}, None => {} }).',
      success: '✅ Great! You explored Option and Result for safe error handling.'
    },
    {
      title: "Practice building custom data types",
      description: (
        <div>
          <h4 className="text-xl font-bold mb-2">Building Custom Data Types</h4>
          <p>
            Combine structs, enums, and traits to create complex types.
          </p>
          <p className="mt-2">
            <b>🔹 Custom Struct with Enum</b><br />
            Use enum in struct:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`enum IpAddr {\n    V4(u8, u8, u8, u8),\n    V6(String),\n}\nstruct IpAddrWrapper(IpAddr);\nlet home = IpAddr::V4(127, 0, 0, 1);\nmatch home {\n    IpAddr::V4(a, b, c, d) => println!("IPv4: {}.{}.{}.{}", a, b, c, d),\n    _ => {},\n}`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Trait Implementation</b><br />
            Add behavior:
            <pre
              style={{
                background: "#222",
                color: "#0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {`struct Rectangle {\n    width: u32,\n    height: u32,\n}\ntrait Area {\n    fn area(&self) -> u32;\n}\nimpl Area for Rectangle {\n    fn area(&self) -> u32 {\n        self.width * self.height\n    }\n}\nlet rect = Rectangle { width: 5, height: 3 };\nprintln!("Area: {}", rect.area());`}
            </pre>
          </p>
          <p className="mt-2">
            <b>🔹 Complex Type Summary</b><br />
            <table className="border border-green-400 border-collapse w-full mt-2">
              <thead>
                <tr className="border border-green-400">
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Type</th>
                  <th className="border border-green-400 p-2 bg-gray-900 text-green-400">Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Struct + Enum</td>
                  <td className="border border-green-400 p-2">enum Ip { V4(u8,u8,u8,u8) } struct Addr(Ip)</td>
                </tr>
                <tr className="border border-green-400">
                  <td className="border border-green-400 p-2">Trait Impl</td>
                  <td className="border border-green-400 p-2">trait Area {`{ fn area(&self); } `}impl Area for Struct</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
      ),
      task: 'Write a snippet building a custom data type (e.g., struct with enum field or trait impl).',
      check: (code) => {
        const result = /\b(struct\s+\w+\s*\{[^}]*\w+\s*:\s*\w+[^}]*\}|enum\s+\w+\s*\{[^}]*(,\s*\w+\s*\([^)]*\))?[^}]*\}).*?(trait\s+\w+\s*\{[^}]*fn\s+\w+\s*\([^)]*\)\s*(->\s*\w+\s*)?;\s*\}|impl\s+\w+\s*for\s+\w+\s*\{[^}]*fn\s+\w+\s*\([^)]*\)\s*\{[^}]*\}))/ms.test(code);
        console.log(`Lesson 4 Check: Code="${code}", Result=${result}`);
        return result;
      },
      error: '❌ Try again. Write a snippet building a custom data type (e.g., struct with enum or trait implementation).',
      success: '✅ Great! You practiced building custom data types.'
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
          console.log("Completing Level 5");
          localStorage.setItem("level5RustCompleted", "true");
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
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 5: Data Structures</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Subscription Required</h3>
          <p>
            To access Level 5, you need a subscription. Please subscribe to continue learning.
          </p>
          <div><br /></div>
          <Link href="/subscribe" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ textDecoration: 'none' }}>
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  if (!level4RustCompleted) {
    return (
      <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 5: Data Structures</h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Complete Level 4 First</h3>
          <p>
            You need to complete Level 4 before accessing Level 5. Go back and finish the Rust Functions and Modules lessons!
          </p>
          <Link href="/level4" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 4
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="header text-2xl font-bold text-center text-gray-800 mb-6">🚀 Level 5: Data Structures</h2>

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
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Congrats! You completed Level 5</h2>
          <Link href="/level6" className="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Level 6 ➡️
          </Link>
        </div>
      )}
    </div>
  );
}
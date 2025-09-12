"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { loader } from "@monaco-editor/react";

// Load Monaco Editor only on the client (no SSR)
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor() {
  // ✅ Rust tasks list
  const tasks = [
    "Print 'Hello, World!'",
    "Declare a variable using let",
    "Create a function that adds two numbers",
    "Loop through numbers 1 to 5",
    "Use a vector and print its elements",
    "Define a struct with name and age",
    "Check if a number is even or odd",
    "Create a struct with an impl block",
    "Match on an enum value",
    "Handle a Result with match",
    "Use iterator map() to double values",
    "Write a panic! example",
    "Implement a closure",
    "Use destructuring with a tuple",
    "Build a simple future with async/await",
    "Write to and read from a file",
    "Handle Option safely with if let",
    "Implement a debounce-like function",
    "Use channels for concurrency",
    "Write a generator-like iterator",
  ];

  const [currentTask, setCurrentTask] = useState(0);

  // ✅ Rust starter code snippets
  const starterCodes = useMemo(
    () => [
      `fn main() {\n    println!("Hello, World!");\n}`,
      `fn main() {\n    let x = 10;\n    println!("x = {}", x);\n}`,
      `fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    println!("{}", add(2, 3));\n}`,
      `fn main() {\n    for i in 1..=5 {\n        println!("{}", i);\n    }\n}`,
      `fn main() {\n    let arr = vec![1, 2, 3, 4, 5];\n    for num in arr {\n        println!("{}", num);\n    }\n}`,
      `struct Person {\n    name: String,\n    age: u32,\n}\n\nfn main() {\n    let p = Person { name: "Alex".to_string(), age: 25 };\n    println!("{} is {} years old", p.name, p.age);\n}`,
      `fn main() {\n    let num = 7;\n    if num % 2 == 0 {\n        println!("Even");\n    } else {\n        println!("Odd");\n    }\n}`,
      `struct Person { name: String }\n\nimpl Person {\n    fn new(name: &str) -> Person {\n        Person { name: name.to_string() }\n    }\n}\n\nfn main() {\n    let p = Person::new("Alex");\n    println!("{}", p.name);\n}`,
      `enum Direction { North, South, East, West }\n\nfn main() {\n    let dir = Direction::North;\n    match dir {\n        Direction::North => println!("Going up"),\n        _ => println!("Other direction"),\n    }\n}`,
      `fn divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err("Division by zero".to_string())\n    } else {\n        Ok(a / b)\n    }\n}\n\nfn main() {\n    match divide(10, 2) {\n        Ok(v) => println!("Result: {}", v),\n        Err(e) => println!("Error: {}", e),\n    }\n}`,
      `fn main() {\n    let nums = vec![1, 2, 3];\n    let doubled: Vec<i32> = nums.iter().map(|n| n * 2).collect();\n    println!("{:?}", doubled);\n}`,
      `fn main() {\n    panic!("Something went wrong!");\n}`,
      `fn main() {\n    let x = 10;\n    let closure = || println!("x = {}", x);\n    closure();\n}`,
      `fn main() {\n    let tup = (1, "hello", 4.5);\n    let (a, b, c) = tup;\n    println!("{} {} {}", a, b, c);\n}`,
      `use tokio::time::{sleep, Duration};\n\n#[tokio::main]\nasync fn main() {\n    sleep(Duration::from_secs(1)).await;\n    println!("Done!");\n}`,
      `use std::fs;\n\nfn main() {\n    fs::write("test.txt", "Hello File").unwrap();\n    let content = fs::read_to_string("test.txt").unwrap();\n    println!("{}", content);\n}`,
      `fn main() {\n    let maybe = Some(5);\n    if let Some(v) = maybe {\n        println!("Value = {}", v);\n    }\n}`,
      `use std::thread;\nuse std::time::Duration;\n\nfn debounce<F: Fn()>(func: F, delay: Duration) {\n    thread::sleep(delay);\n    func();\n}\n\nfn main() {\n    debounce(|| println!("Debounced!"), Duration::from_millis(500));\n}`,
      `use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    thread::spawn(move || {\n        tx.send("Hello from thread").unwrap();\n    });\n    println!("{}", rx.recv().unwrap());\n}`,
      `struct Counter { count: i32 }\n\nimpl Counter {\n    fn new() -> Counter { Counter { count: 0 } }\n}\n\nimpl Iterator for Counter {\n    type Item = i32;\n    fn next(&mut self) -> Option<Self::Item> {\n        if self.count < 3 {\n            self.count += 1;\n            Some(self.count)\n        } else {\n            None\n        }\n    }\n}\n\nfn main() {\n    let mut c = Counter::new();\n    while let Some(v) = c.next() {\n        println!(\"{}\", v);\n    }\n}`,
    ],
    []
  );

  const [code, setCode] = useState(starterCodes[0]);
  const [output, setOutput] = useState("");

  // 🔄 Update editor code when task changes
  useEffect(() => {
    setCode(starterCodes[currentTask]);
  }, [currentTask, starterCodes]);

  // ✅ Setup custom theme only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      loader.init().then((monaco) => {
        monaco.editor.defineTheme("neon-night", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "6a9955" },
            { token: "keyword", foreground: "00f2ea", fontStyle: "bold" },
            { token: "identifier", foreground: "ffffff" },
            { token: "string", foreground: "a855f7" },
            { token: "number", foreground: "ffb86c" },
            { token: "delimiter", foreground: "00cba9" },
          ],
          colors: {
            "editor.background": "#0f0f0f",
            "editor.foreground": "#e0e0e0",
            "editor.lineHighlightBackground": "#111111",
            "editor.selectionBackground": "#00cba955",
            "editorCursor.foreground": "#00f2ea",
            "editorCursor.background": "#000000",
            "editor.selectionHighlightBackground": "#00f2ea33",
            "editorIndentGuide.background": "#333333",
            "editorLineNumber.foreground": "#555555",
            "editorLineNumber.activeForeground": "#00f2ea",
            "editorWhitespace.foreground": "#222222",
          },
        });
      });
    }
  }, []);

  // ⚠ Running Rust code in-browser is tricky (needs WASM or backend)
  // Here we only "simulate" running code
  const handleRun = () => {
    setOutput("⚡ Rust code execution is not supported directly in browser.\nYou can copy this code into Rust Playground (https://play.rust-lang.org/) to run it.");
  };

  return (
    <div className="glitch-form-wrapper">
      <div className="glitch-car">
        {/* Header */}
        <div className="card-header">
          <div className="card-title">
            <span>🦀 Rust Editor</span>
          </div>
          <div className="card-dots"><span></span><span></span><span></span></div>
        </div>

        {/* Body */}
        <div className="card-body">
          {/* Task Row */}
          <div className="task-row">
            <p className="task-text">
              Task {currentTask + 1}: {tasks[currentTask]}
            </p>
            <button
              onClick={() => setCurrentTask((prev) => (prev + 1) % tasks.length)}
              className="task-button"
              data-text="Next"
            >
              Next ➝
            </button>
          </div>

          {/* Editor */}
          <Editor
            height="400px"
            theme="neon-night"
            defaultLanguage="rust"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 15,
              fontFamily: '"Fira Code", Consolas, "Courier New", monospace',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              cursorSmoothCaretAnimation: "on",
              cursorBlinking: "phase",
              renderLineHighlight: "all",
              smoothScrolling: true,
            }}
          />

          {/* Output Section */}
          <div className="card-body">
            <div className="card-header">
              <div className="card-title"><span> Output</span></div>
              <button onClick={handleRun} className="task-button" data-text="Run_Code">
                ▶ Run Code
              </button>
            </div>
            <div className="card-body">
              <pre className="output-text">{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

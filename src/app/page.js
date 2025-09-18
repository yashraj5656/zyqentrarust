"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthContext"; // 🔹 use auth

export default function Dashboard() {
  const { user } = useAuth(); // 🔹 get logged-in user
  const [completed, setCompleted] = useState({
    level1: false,
    level2: false,
    level3: false,
    level4: false,
    level5: false,
    level6: false,
    level7: false,
    level8: false,
    level9: false,
  });
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    const status = {};
    for (let i = 1; i <= 9; i++) {
      status[`level${i}`] = localStorage.getItem(`level${i}RustCompleted`) === "true";
    }
    setCompleted(status);
        // Check subscription
        setSubscribed(localStorage.getItem("subscribed") === "true");
  }, []);
  const [quizScore, setQuizScore] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (!user) return; // 🔹 don’t load progress if not logged in

    const status = {};
    for (let i = 1; i <= 9; i++) {
      status[`level${i}`] = localStorage.getItem(`level${i}RustCompleted`) === "true";
    }
    setCompleted(status);

    const storedQuizScore = localStorage.getItem("quizScore");
    if (storedQuizScore) {
      setQuizScore(JSON.parse(storedQuizScore));
    }
  }, [user]);

  const resetProgress = () => {
    for (let i = 1; i <= 9; i++) {
      localStorage.removeItem(`level${i}Completed`);
    }
    localStorage.removeItem("quizScore");
    setCompleted({
      level1: false,
      level2: false,
      level3: false,
      level4: false,
      level5: false,
      level6: false,
      level7: false,
      level8: false,
      level9: false,
    });
    setQuizScore(null);
    alert("Progress reset! Start Level 1 again to unlock subsequent levels.");
  };

  const toggleInfo = () => setIsInfoOpen(!isInfoOpen);

  const levels = [
    { 
      title: "Level 1: Rust Basics", 
      desc: "Install Rust with rustup, learn cargo, syntax, variables, constants, and data types.", 
      link: "/level1", 
      unlocked: true 
    },
    { 
      title: "Level 2: Control Flow", 
      desc: "Use if/else, match, loops (for, while, loop), and practice flow ownership.", 
      link: "/level2", 
      unlocked: completed.level1 && subscribed 
    },
    { 
      title: "Level 3: Ownership, Borrowing, and Lifetimes", 
      desc: "Master Rust’s memory model, ownership rules, borrowing, and lifetimes.", 
      link: "/level3", 
      unlocked: completed.level2 && subscribed 
    },
    { 
      title: "Level 4: Functions and Modules", 
      desc: "Define functions, use closures, organize with modules, and explore crates.", 
      link: "/level4", 
      unlocked: completed.level3 && subscribed 
    },
    { 
      title: "Level 5: Data Structures", 
      desc: "Learn arrays, slices, vectors, tuples, structs, enums, and Result/Option.", 
      link: "/level5", 
      unlocked: completed.level4 && subscribed 
    },
    { 
      title: "Level 6: Error Handling", 
      desc: "Understand panic, ?, Result<T,E>, error propagation, and custom error types.", 
      link: "/level6", 
      unlocked: completed.level5 && subscribed 
    },
    { 
      title: "Level 7: Traits and Generics", 
      desc: "Work with generics, traits, trait bounds, and lifetimes in generics.", 
      link: "/level7", 
      unlocked: completed.level6 && subscribed 
    },
    { 
      title: "Level 8: Collections and Iterators", 
      desc: "Use HashMap, HashSet, iterators, ownership in iterators, and functional style.", 
      link: "/level8", 
      unlocked: completed.level7 && subscribed 
    },
    { 
      title: "Level 9: Concurrency and Async", 
      desc: "Learn threads, channels, Arc & Mutex, async/await, tokio & async-std.", 
      link: "/level9", 
      unlocked: completed.level8 && subscribed 
    },
    { 
      title: "🎓 Certificate of Completion", 
      desc: "Unlock your certificate after finishing all 9 levels.", 
      link: "/certificate", 
      unlocked: completed.level9 && subscribed 
    },
  ];
  

  const completedCount = Object.values(completed).filter((v) => v).length;
  const progressPercent = (completedCount / 8) * 100;
  const xp = completedCount * 100;

  // 🔹 If not logged in, show login prompt instead
  if (!user) {
    return (
      <div className="">
        <header className="header">
              <h1>Zyqentra</h1>
        </header>
       


       


        <div className="text-center">
          <p className="pp">Rust is the art of building unbreakable machines with words.</p>
          <p className="">
            <Link href="/signup" className=""><button data-text="Signup/Login">Signup/Login</button></Link>
            {/*{" "}or{" "} 
            <Link href="/signup" className="text-green-400 underline"><button>Sign up</button></Link><div><br></br> </div>*/}
            {" "}
          </p>
          <Link href="/lesson">
            <button className="btn" data-text="Explore Lessons (Guest Mode)">
              📖 Explore Lessons (Guest Mode)
            </button>
          </Link>
        </div>
      </div>
    );
  }
  let displayName = "Guest";
  if (user?.email) {
    displayName = user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1);
  }
  

  // 🔹 Logged in → show full dashboard
  return (
  <div className="">
      <header className="header">
              <h1>Zyqentra</h1>
          </header>







      


      <div className="">
        {/* Banner */}
        {/*<div
          className=""
          style={{
            backgroundImage: "url('/ZQENTRA.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="name">
           <span>{displayName}</span>
          </h1>
        </div>*/}

     {/* 🔹 Sticky Cyber Get Premium Button */}
     <div className="rambtn">
  <div className="cyber-wrapper">
    <Link href="/subscribe">
      <button className="cyber-btn"> Get Premium</button>
    </Link>
    <div className="cyber-tooltip">
      <div className="corner-tl"></div>
      <div className="corner-tr"></div>
      <div className="corner-bl"></div>
      <div className="corner-br"></div>
      <strong>PREMIUM MODE</strong><br />
      Unlock all levels, quizzes, and certificate.<br />
      Become a <strong>Rust Pro ⚡</strong>
    </div>
  </div>
  <div className="cyber-wrapper">
    <Link href="/quiz">
      <button className="cyber-btn">Quizzes</button>
    </Link>
    <div className="cyber-tooltip">
      <div className="corner-tl"></div>
      <div className="corner-tr"></div>
      <div className="corner-bl"></div>
      <div className="corner-br"></div>
      <strong>Quizzes</strong><br />
      Test your knowledge of Rust fundamentals with this interactive quiz! <br />
    </div>
  </div>
</div>






 

   {/* Progress */}
<motion.div 
  className="flip-card"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <motion.h2 
        className="gradient-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Rust 🦀
      </motion.h2>
      <div className="">
        <motion.div
          className=""
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
    <div className="flip-card-back">
      <p className="title">
        {completedCount} / 9 Levels Completed • {xp} XP Earned
      </p>
      {quizScore !== null && (
        <p className="">
          Quiz Score: {quizScore.correct}/{quizScore.total}
        </p>
      )}
    </div>
  </div>
</motion.div>

{/* Info Section */}
<motion.div 
  className=""
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
>
  <button
    onClick={toggleInfo}
    className="submit-btn"
    data-text="Rust"
    style={{width:"40%"}}
  >
    <h3 className="">
      {isInfoOpen ? "▼ Hide Info" : "▶ Learn About 'Rust'"}
    </h3>
  </button>

  {isInfoOpen && (
    <motion.div
      className="knk"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
    >
      <h4 className="kh">Rust: Fearless Systems Programming</h4>
      <p className="kp">
        Long ago, systems programming was a dangerous land. Memory bugs,
        crashes, and security holes haunted developers. Speed came at the
        cost of safety, and programmers often walked a thin line between
        brilliance and disaster.
      </p>
      <p className="kp">
        Then came <strong>Rust</strong>—a language forged to combine the
        speed of C with the safety of modern design. With its strict
        compiler and the mighty <em>borrow checker</em>, Rust promised
        something extraordinary: code that was fast, reliable, and memory-safe.
      </p>
      <p className="kp">
        Developers at first struggled with Rust’s rules. Ownership,
        lifetimes, and borrowing felt like puzzles. But as they learned,
        they discovered the magic: fearless concurrency, zero-cost
        abstractions, and programs that ran blazingly fast without
        sacrificing safety.
      </p>
      <p className="kp">
        One developer, <strong>Alex</strong>, once wary of segfaults and
        data races, found new confidence in Rust. With every compile-time
        check, their code became stronger. With every project, they built
        not just applications—but <strong>systems that could endure</strong>.
      </p>
      <p className="kp">
        Rust, the fearless guardian, gave programmers the best of both
        worlds: safety <em>and</em> speed. And in the hands of builders like
        Alex, it opened a future where performance and reliability walk
        side by side.
      </p>
    </motion.div>
  )}
</motion.div>

        

        {/* Levels */}
        <div className="t">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`p-6 rounded-xl shadow-lg transition relative group ${
                level.unlocked
                  ? "bg-gray-800/70 border border-green-500/40 hover:shadow-green-500/20"
                  : "bg-gray-700/50 border border-gray-600 opacity-70"
              }`}
            >
              <h3 className="tt">
                {level.title}
                {level.unlocked ? (
                  <span className="">✅</span>
                ) : (
                  <span className="">🔒</span>
                )}
              </h3>
              <p className="td">{level.desc}</p>
              {level.unlocked ? (
                <Link href={level.link}>
                  <button className="submitt-btn" data-text="Get In">
                    {index === levels.length - 1 ? "🎓 Claim Certificate" : "▶ Start Lesson"}
                  </button>
                </Link>
              ) : (
                <p className="tp">Complete previous level to unlock</p>
              )}
            </motion.div>
          ))}

          {/* Quiz Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className=""
          >
            <h3 className="">🎮 Rust Quiz</h3>
            <p className="">
              Test your knowledge of Rust fundamentals with an interactive quiz!
            </p>
            <Link href="/quiz">
              <button className="submit-btn" data-text="Take the Quiz">
                Take the Quiz
              </button>
            </Link>
            {quizScore !== null && (
              <p className="">
                Last Score: {quizScore.correct}/{quizScore.total}
              </p>
            )}
          </motion.div>
        </div>

        {/* Actions */}
        <div className="">
          <Link href="/lesson">
            <button className="submit-btn" data-text="View All Lessons">
              📖 View All Lessons
            </button>
          </Link>
          <button
            onClick={resetProgress}
            className="submit-btn"
            data-text="Reset Progress"
          >
            🔄 Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

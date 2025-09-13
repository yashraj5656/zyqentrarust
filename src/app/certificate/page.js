"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function Certificate() {
  const [unlocked, setUnlocked] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const completed = localStorage.getItem("level9RustCompleted") === "true";
    setUnlocked(completed);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF("landscape");

    // Background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, "F");

    // Logo
    const logoImg = new Image();
    logoImg.src = "Zy.png"; // Path to your logo
    doc.addImage(logoImg, "PNG", 20, 20, 40, 40);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(44, 62, 80);
    doc.text("Certificate of Completion", 148, 50, { align: "center" });

    // Student Name
    doc.setFont("times", "italic");
    doc.setFontSize(27);
    doc.setTextColor(44, 62, 80);
    doc.text(studentName || "Student Name", 148, 80, { align: "center" });

    // Course
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(34, 34, 34);
    doc.text(
      `This is to certify that ${studentName} has successfully completed the Full Rust 
    Course (Levels 1–9) with unparalleled dedication, extraordinary proficiency, and 
    exceptional skill. Through this rigorous program, ${studentName} has mastered 
    core and advanced Rust concepts, including ownership, borrowing, lifetimes, 
    concurrency, error handling, generics, and building efficient system-level 
    applications. `,
      148,
      100,
      { align: "center" }
    );

    // Date
    doc.setFontSize(16);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 60, 170, {
      align: "center",
    });

    // Signature
    doc.setFontSize(16);
    doc.text("Signed: Zyqentra", 229, 170, { align: "center" });

    // Border
    doc.setDrawColor(0, 203, 169);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    // Save
    doc.save("Rust_Certificate.pdf");
  };

  return (
    <div style={{ padding: "2rem", color: "white", textAlign: "center" }}>
      {!unlocked ? (
        <div>
          <h2>🔒 Locked</h2>
          <p>
            You must complete <b>Level 9</b> to unlock your certificate.
          </p>
          <Link href="/lesson">
            <button style={btnStyle}>Back to Lessons</button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>🎉 Congratulations! You’ve completed all levels.</h2>
          <p>Enter your name to personalize your certificate:</p>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <button onClick={generatePDF} className="submit-btn">
            Download PDF Certificate
          </button>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  marginTop: "1rem",
  padding: "10px 20px",
  background: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

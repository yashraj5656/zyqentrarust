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
  
    // Load background template (place in /public folder of Next.js)
    const bgImg = new Image();
    bgImg.src = "/ZBC.png"; 
  
    bgImg.onload = () => {
      // Fit image to A4 landscape size
      doc.addImage(bgImg, "PNG", 0, 0, 297, 210);
  
      // Title: Certificate of Appreciation
      doc.setFont("Orbitron", "bold");
      doc.setFontSize(34);
      doc.setTextColor(255, 255, 255); 
      doc.text("Certificate of Completion", 148, 40, { align: "center" });
  
      // Subtitle
      doc.setFont("Gill Sans", "normal");
      doc.setFontSize(14);
      doc.text("Proudly Presented To", 148, 60, { align: "center" });
  
      // Student Name (Big + Elegant)
      doc.setFont("times", "italic");
      doc.setFontSize(34);
      doc.setTextColor(0, 203, 169); // Zyqentra teal
      doc.text(studentName || "Name Surname", 148, 80, { align: "center" });
  
      // Course / Reason
      doc.setFont("Gill Sans", "normal");
      doc.setFontSize(14);
      doc.setTextColor(220, 220, 220);
      doc.text(
        `This is to certify that ${studentName} has successfully completed the Full Rust 
    Course (Levels 1–9) with unparalleled dedication, extraordinary proficiency, and 
    exceptional skill. Through this rigorous program, ${studentName} has mastered 
    core and advanced Rust concepts, including ownership, borrowing, lifetimes, 
    concurrency, error handling, generics, and building efficient system-level 
    applications. `,
        148,
        100,
        { align: "center", maxWidth: 250 }
      );
  
      // Date
      doc.setFontSize(12);
      doc.setTextColor(200, 200, 200);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 60, 170, { align: "center" });
  
      // Signature
      doc.setFontSize(12);
      doc.text("Signed: Zyqentra", 230, 170, { align: "center" });
  
      // Save PDF
      doc.save("Zyqentra_Certificate.pdf");
    };
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

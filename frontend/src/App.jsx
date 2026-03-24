import { useState, useEffect, useRef } from "react";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // dark theme

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");

  const codeRef = useRef(null);

  // 🔥 Apply syntax highlighting after render
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [result]);

  const handleReview = async () => {
    try {
      setLoading(true);

      const res = await axios.post("https://ai-code-reviewer-1-jadn.onrender.com/api/review", {
        code,
        language,
      });

      let raw = res.data.result;

      const match = raw.match(/\{[\s\S]*\}/);

      let parsed;

      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        parsed = {
          score: "N/A",
          issues: ["Invalid AI response"],
          suggestions: [],
          improved_code: raw,
        };
      }

      setResult(parsed);

    } catch (err) {
      console.error(err);
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Copy button
  const handleCopy = () => {
    navigator.clipboard.writeText(result.improved_code);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ textAlign: "center" }}>🤖 AI Code Reviewer</h1>

      <div style={{ maxWidth: "800px", margin: "auto" }}>

        {/* 🔥 Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "6px"
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <textarea
          rows="10"
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none"
          }}
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <br /><br />

        <button
          onClick={handleReview}
          style={{
            width: "100%",
            padding: "12px",
            background: "#22c55e",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Review Code
        </button>

        {loading && <p style={{ textAlign: "center" }}>🔄 Reviewing...</p>}

        {result && (
          <div style={{
            marginTop: "30px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}>
            <h2>Result</h2>

            <p>
              <strong>Score:</strong>{" "}
              <span style={{
                background: "#22c55e",
                padding: "5px 10px",
                borderRadius: "6px"
              }}>
                {result.score}
              </span>
            </p>

            <h3>🚨 Issues</h3>
            <ul>
              {result.issues?.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>

            <h3>💡 Suggestions</h3>
            <ul>
              {result.suggestions?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <h3>✨ Improved Code</h3>

            {/* 🔥 Copy Button */}
            <button
              onClick={handleCopy}
              style={{
                marginBottom: "10px",
                padding: "6px 10px",
                background: "#3b82f6",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Copy Code
            </button>

            {/* 🔥 Syntax Highlighting */}
            <pre style={{
              background: "#0f172a",
              padding: "15px",
              borderRadius: "8px",
              overflowX: "auto"
            }}>
              <code ref={codeRef} className={language}>
                {result.improved_code}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
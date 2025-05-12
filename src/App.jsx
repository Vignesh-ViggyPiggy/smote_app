import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState("");
  const [numRows, setNumRows] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !targetColumn || !numRows) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_col", targetColumn);
    formData.append("num_rows", numRows);

    try {
      const response = await axios.post(
        "https://jane-auctions-neil-par.trycloudflare.com/generate", // Change to your actual URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "synthetic_dataset.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong. Check the console for details.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Generate Synthetic Dataset
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            CSV File:
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Target Column:
          </label>
          <input
            type="text"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Number of Rows:
          </label>
          <input
            type="number"
            value={numRows}
            onChange={(e) => setNumRows(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "50%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
}

export default App;

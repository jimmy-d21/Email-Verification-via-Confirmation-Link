import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signup = async () => {
    if (!email || !password)
      return setMessage("Please enter email and password");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.text();
      setMessage(data);
    } catch (err) {
      setMessage("Request failed: " + err.message);
    } finally {
      setEmail("");
      setPassword("");
      setMessage("");
    }
  };

  // Inline CSS styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #c8f7c5, #dfffe0)",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  const messageStyle = {
    marginTop: "15px",
    color: message.includes("sent") ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "10px" }}>Email Verification</h1>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          Sign up and confirm your email
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={signup}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Sign Up
        </button>

        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
}

export default App;

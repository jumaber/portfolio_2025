import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user.uid === "KrsDPbHcY6WTa3k7XRl6hLjCQ1G3") {
        navigate("/dashboard");
      } else {
        setError("Unauthorized user");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFF6F6] p-4">
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-md bg-white shadow-md p-6 rounded-lg"
      >
        <h1 className="text-h2 mb-6">Login</h1>
        <div className="form-header">Email</div>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border rounded bg-white mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="form-header">Password</div>
        <input
          type="password"
          placeholder="Enter your password"
          className="p-2 border rounded bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink text-white p-2 rounded hover:opacity-90"
        >
          Log In
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}

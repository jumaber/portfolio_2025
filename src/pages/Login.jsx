import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user.uid === "i67JburFKwRSWgKaXpraD9DWioD3") {
        navigate("/dashboard");
      } else {
        setError("Nice try. You're not me.");
      }
    } catch (err) {
      setError("Nice try. You're not me.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFF6F6] p-4">
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-full max-w-sm bg-white shadow-md p-6 rounded-lg"
      >
        <h1 className="text-h2 mb-2">Hi there 👋</h1>
        <p className="text-h4 blue mb-4">This page is for me, myself, and I.</p>
        <p className="text-[14px] text-gray mb-6">
          If you’re not me, just kindly hit the back button, pretend you never saw
          this and{" "}
          <Link to="/" className="font-bold">
            go back to admire my portfolio. 😉
          </Link>
        </p>
        <label className="text-left text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter my email"
          className="p-3 border rounded bg-white mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-left text-sm font-semibold mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter my password"
          className="p-3 border rounded bg-white mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#0C0093] text-white text-h5 px-4 py-3 rounded-sm transition-all duration-200 ease-in-out hover:shadow-[8px_8px_0_0_var(--color-pink)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          Prove you're me
        </button>

        {error && (
          <div className="text-red-600 mt-4 text-sm italic">{error}</div>
        )}
      </form>
    </div>
  );
}

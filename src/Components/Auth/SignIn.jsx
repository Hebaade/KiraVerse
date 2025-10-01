import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import "./auth.css";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const navigate = useNavigate();

  // map firebase errors to user-friendly messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      case "auth/missing-password":
        return "Password is required.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // Auto hide snackbar after 3s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        {!showReset ? (
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <button
              type="button"
              className="switch-link"
              onClick={() => setShowReset(true)}
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setResetMsg("");
              try {
                await sendPasswordResetEmail(auth, resetEmail);
                setResetMsg("Password reset link has been sent to your email.");
              } catch (err) {
                setResetMsg(getErrorMessage(err.code));
              }
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
            <button
              type="button"
              className="switch-link"
              onClick={() => setShowReset(false)}
            >
              Back to Sign In
            </button>
           
          </form>
        )}
        <div>
          <span>Don't have an account? </span>
          <Link to="/signup" className="switch-link">
            Create new account
          </Link>
        </div>
      </div>
 {resetMsg && (
              <p
                className="snackbar"
              >
                {resetMsg}
              </p>
            )}
      {/* Snackbar OUTSIDE the card */}
      {error && (
        <div className="snackbar">
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default SignIn;

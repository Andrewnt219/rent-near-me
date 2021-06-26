import AuthService from '@services/AuthService';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);
      await AuthService.signInWithEmail(email, password);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="mb-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleEmailSignIn();
        }}
      >
        <p>
          Sign in with email and password (
          <Link href="/register">
            <a>No account?</a>
          </Link>
          )
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="mr-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="mr-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading}>
          <span>{loading ? 'Loading' : 'Sign in'}</span>
        </button>
      </form>
      <button
        type="button"
        onClick={async (e) => await AuthService.signInWithGoogle()}
        className="block"
      >
        Sign in with Google
      </button>
      <button
        onClick={async (e) => await AuthService.signInWithFacebook()}
        className="block"
      >
        Sign in with Facebook
      </button>
    </div>
  );
}

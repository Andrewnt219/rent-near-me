import { useState } from 'react';
import AuthService from '@services/AuthService';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await AuthService.registerWithEmail(email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form
        className="mb-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleRegister();
        }}
      >
        <p className="mb-4">Register with email and password</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="mb-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Retype Password"
          value={rePassword}
          className="mb-4"
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
        <br />
        <button disabled={loading || password !== rePassword}>
          <span>{loading ? 'Loading' : 'Register'}</span>
        </button>
        <p className={`text-green-500 ${success ? '' : 'hidden'}`}>
          Registration success! Check your mailbox for confirmation email.
        </p>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
}

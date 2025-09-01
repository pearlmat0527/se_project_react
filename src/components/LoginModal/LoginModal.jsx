// src/components/LoginModal/LoginModal.jsx
import { useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css"; // <-- add this

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isLoading = false,
  apiError = "",
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(
    () => email.trim() && password.trim(),
    [email, password]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onLogin({ email: email.trim(), password });
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    onClose?.();
  };

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Signing in…" : "Log in"}
      isSubmitDisabled={isLoading || !canSubmit}
      /* BEM hooks passed down to the modal wrapper */
      modalClassName="login-modal"
      contentClassName="login-modal__content"
      submitButtonClassName="login-modal__submit"
    >
      {!!apiError && (
        <p className="login-modal__error" role="alert">
          {apiError}
        </p>
      )}

      <div className="login-modal__field">
        <label className="login-modal__label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="login-modal__input"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="login-modal__field">
        <label className="login-modal__label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className="login-modal__input"
          type="password"
          name="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {onSwitchToRegister && (
        <div className="login-modal__actions">
          <button
            type="button"
            className="login-modal__switch"
            onClick={onSwitchToRegister}
          >
            or Sign up
          </button>
        </div>
      )}
    </ModalWithForm>
  );
}

// src/components/RegisterModal/RegisterModal.jsx
import { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister, // ({ name, avatar, email, password })
  isLoading = false,
  apiError = "",
  onSwitchToLogin,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(
    () => name.trim() && email.trim() && password.trim().length >= 6,
    [name, email, password]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit || isLoading) return;
    onRegister({
      name: name.trim(),
      avatar: avatar.trim(),
      email: email.trim(),
      password,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Signing up…" : "Sign up"}
      isSubmitDisabled={isLoading || !canSubmit}
      /* BEM modifiers to override ModalWithForm ONLY for register */
      modalClassName="form-modal--register"
      contentClassName="form-modal__content--register"
      /* optional: submitButtonClassName="register-modal__submit" */
    >
      <div className="register-modal">
        {!!apiError && (
          <p className="register-modal__error" role="alert">
            {apiError}
          </p>
        )}

        <label className="register-modal__field">
          <span className="register-modal__label">Email*</span>
          <input
            className="register-modal__input"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@gmail.com"
            autoComplete="email"
          />
        </label>

        <label className="register-modal__field">
          <span className="register-modal__label">Password* (min 6)</span>
          <input
            className="register-modal__input"
            type="password"
            name="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </label>

        <label className="register-modal__field">
          <span className="register-modal__label">Name*</span>
          <input
            className="register-modal__input"
            type="text"
            name="name"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="register-modal__field">
          <span className="register-modal__label">Avatar URL (optional)</span>
          <input
            className="register-modal__input"
            type="url"
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            autoComplete="url"
          />
        </label>

        {onSwitchToLogin && (
          <div className="register-modal__actions">
            <button
              type="button"
              className="register-modal__link"
              onClick={onSwitchToLogin}
            >
              or Log in
            </button>
          </div>
        )}
      </div>
    </ModalWithForm>
  );
}

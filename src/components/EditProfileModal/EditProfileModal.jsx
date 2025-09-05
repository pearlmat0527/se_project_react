// src/components/EditProfileModal/EditProfileModal.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit, // ({ name, avatar })
  isLoading = false,
  apiError = "",
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name ?? "");
      setAvatar(currentUser?.avatar ?? "");
    }
  }, [isOpen, currentUser]);

  const canSubmit = useMemo(() => name.trim().length >= 2, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit || isLoading) return;
    onSubmit({ name: name.trim(), avatar: avatar.trim() });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving…" : "Save changes"}
      isSubmitDisabled={!canSubmit || isLoading}
      modalClassName="edit-profile-modal"
      contentClassName="edit-profile-modal__content"
      submitButtonClassName="edit-profile-modal__submit"
    >
      {!!apiError && (
        <p className="edit-profile-modal__error" role="alert">
          {apiError}
        </p>
      )}

      <div className="edit-profile-modal__field">
        <label className="edit-profile-modal__label" htmlFor="edit-name">
          Name*
        </label>
        <input
          id="edit-name"
          className="edit-profile-modal__input"
          type="text"
          name="name"
          required
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>

      <div className="edit-profile-modal__field">
        <label className="edit-profile-modal__label" htmlFor="edit-avatar">
          Avatar URL
        </label>
        <input
          id="edit-avatar"
          className="edit-profile-modal__input"
          type="url"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
          autoComplete="url"
        />
      </div>
    </ModalWithForm>
  );
}

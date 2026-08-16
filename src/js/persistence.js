/**
 * Persistence module (placeholder — full implementation in V1.0).
 * Handles localStorage draft save/load and embedded state.
 */

/**
 * Initialize persistence layer.
 */
function initPersistence() {
  // Will be implemented in V1.0
}

/**
 * Load state on startup: embedded state first, then check localStorage.
 * @returns {object|null}
 */
function loadInitialState() {
  // Try embedded state (from saved HTML)
  const embedded = loadEmbeddedState();
  if (embedded) {
    return embedded;
  }

  // Then the autosaved draft from the previous session, so an accidental
  // tab close does not discard unsaved edits.
  try {
    const lastDocumentId = localStorage.getItem(LAST_DOCUMENT_KEY);
    if (lastDocumentId) {
      const draft = loadDraft(lastDocumentId);
      if (draft && draft.profile && Array.isArray(draft.sections) && draft.sections.length > 0) {
        return draft;
      }
    }
  } catch (e) {
    console.error("Failed to restore draft:", e);
  }

  // Otherwise return default state
  return createDefaultState();
}

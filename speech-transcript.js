/* Web Speech results are indexed slots, not chunks to append on every event. */
(function (root) {
  'use strict';
  function createSession() {
    const slots = [];
    let ended = false;
    function snapshot() {
      const finalParts = [], interimParts = [];
      for (const slot of slots) {
        if (!slot || !slot.text) continue;
        (slot.isFinal ? finalParts : interimParts).push(slot.text);
      }
      return { finalTranscript: finalParts.join(' '), interimTranscript: interimParts.join(' ') };
    }
    return {
      update(event) {
        if (ended) return snapshot();
        const results = event.results;
        const start = Number.isInteger(event.resultIndex) ? Math.max(0, Math.min(event.resultIndex, results.length)) : 0;
        // Interim slots can be revised, removed, or replaced by final results.
        slots.length = results.length;
        for (let i = 0; i < results.length; i++) {
          if (i < start && slots[i]) continue;
          const result = results[i];
          slots[i] = { text: String(result[0]?.transcript || '').trim(), isFinal: result.isFinal === true };
        }
        return snapshot();
      },
      finish() {
        ended = true;
        for (let i = 0; i < slots.length; i++) if (!slots[i]?.isFinal) slots[i] = null;
        return snapshot();
      }
    };
  }
  root.SpeechTranscript = { createSession };
  if (typeof module !== 'undefined') module.exports = root.SpeechTranscript;
})(typeof window === 'undefined' ? globalThis : window);

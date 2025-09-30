export const keys: Record<string, boolean> = {};

export function setupKeyboardListeners(): void {
  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    // console.log("Ner:", e.code);
  });

  window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
    // console.log("Upp:", e.code);
  });
}

export const setNewOffset = (
  card: HTMLDivElement,
  mouseMoveDirection = { x: 0, y: 0 },
) => {
  const offsetLeft = card.offsetLeft - mouseMoveDirection.x;
  const offsetTop = card.offsetTop - mouseMoveDirection.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export function autoGrow(textarea: HTMLTextAreaElement) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

export const setZIndex = (selectedCard: HTMLDivElement) => {
  selectedCard.style.zIndex = String(999);

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card instanceof HTMLDivElement && card !== selectedCard) {
      card.style.zIndex = String(Number(selectedCard.style.zIndex) - 1);
    }
  });
};

export const bodyParser = (value: string) => {
  try {
    JSON.parse(value);
    return JSON.parse(value);
  } catch {
    return value;
  }
};

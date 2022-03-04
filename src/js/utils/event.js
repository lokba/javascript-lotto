export const on = (target, eventName, handler) => {
  target.addEventListener(eventName, handler);
};

export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};

// utils/whatsapp.js
// One place to change your number or the message style.

export const WA_NUMBER = '917587182520';

/**
 * Builds a WhatsApp link with a ready-typed message.
 * @param {string} what  e.g. "Starter Website package"
 */
export const waLink = (what) => {
  const msg = `Hi WebDishaa! 👋\nI'm exploring the ${what}. Could you please share more details?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
};
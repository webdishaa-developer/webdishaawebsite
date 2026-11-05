// utils/web3forms.js — shared email sender for the chatbot
// Paste the SAME Access Key you used in ContactPage.jsx.
// (Get/see it at https://web3forms.com → it was emailed to webdishaa@gmail.com)

export const WEB3FORMS_KEY = '7e212134-245d-440b-ae13-1526d39c3c59';
export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
export const KEY_READY = !!WEB3FORMS_KEY && !WEB3FORMS_KEY.startsWith('PASTE_');

/** Sends `fields` to webdishaa@gmail.com. Throws on any failure. */
export async function sendToWeb3Forms(fields, ms = 12000) {
  if (!KEY_READY) {
    throw new Error('Web3Forms access key is not set (utils/web3forms.js → WEB3FORMS_KEY)');
  }
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...fields }),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!(res.ok && (data.success === true || data.success === 'true'))) {
      throw new Error(`Web3Forms said: ${data.message || res.status}`);
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}
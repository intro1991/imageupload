import CryptoJS from 'crypto-js';

const key = 'ktlqhdks';

export function encryptAES(message) {
  const encrypted = CryptoJS.AES.encrypt(message, key);
  return encrypted.toString();
}

export function decryptAES(cipherText) {
  const decrypted = CryptoJS.AES.decrypt(cipherText, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

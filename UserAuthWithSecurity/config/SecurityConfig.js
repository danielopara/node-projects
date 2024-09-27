import crypto from "crypto";

const encryptionKey = "myverystrongpasswordo32bitlength";

export function decryptPasswordAES(encryptedPassword) {
  const [iv, encryptedText] = encryptedPassword.split(":");
  const ivBuffer = Buffer.from(iv, "hex");
  const encryptedTextBuffer = Buffer.from(encryptedText, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    ivBuffer
  );
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

export function encryptPasswordAES(password) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

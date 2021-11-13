import * as admin from 'firebase-admin';
import crypto from 'crypto';
import encrypted from './firebase-admin-secret.enc';

if (admin.apps.length === 0) {
  const iv = process.env['FIREBASE_CERT_DECRYPT_IV'] as string;
  const secret = process.env['FIREBASE_CERT_DECRYPT_SECRET'] as string;
  const decipher = crypto.createDecipheriv('aes-128-cbc', secret, iv);
  const decrypted =
    decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');
  const firebaseAdminCert = JSON.parse(decrypted);

  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminCert),
  });
}

export const firestore = admin.firestore();

export const auth = admin.auth();

export const storage = admin.storage();

export default admin;

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const TAG_POSITION = SALT_LENGTH + IV_LENGTH;
const ENCRYPTED_POSITION = TAG_POSITION + TAG_LENGTH;

// Get or generate encryption key
function getEncryptionKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET || 'your-32-character-secret-key-change-in-production';

  // Use PBKDF2 to derive a consistent 32-byte key from the secret
  return crypto.pbkdf2Sync(secret, 'salt', 100000, 32, 'sha256');
}

// Encrypt data
export function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = getEncryptionKey();

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag();

    // Combine salt + iv + tag + encrypted
    return salt.toString('hex') + iv.toString('hex') + tag.toString('hex') + encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

// Decrypt data
export function decrypt(encryptedData: string): string {
  try {
    const key = getEncryptionKey();

    // Extract components
    const salt = Buffer.from(encryptedData.slice(0, SALT_LENGTH * 2), 'hex');
    const iv = Buffer.from(encryptedData.slice(SALT_LENGTH * 2, TAG_POSITION * 2), 'hex');
    const tag = Buffer.from(encryptedData.slice(TAG_POSITION * 2, ENCRYPTED_POSITION * 2), 'hex');
    const encrypted = encryptedData.slice(ENCRYPTED_POSITION * 2);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

// Encrypt object fields
export function encryptObject<T extends Record<string, any>>(
  obj: T,
  fieldsToEncrypt: (keyof T)[]
): T {
  const encrypted = { ...obj };

  for (const field of fieldsToEncrypt) {
    if (encrypted[field] && typeof encrypted[field] === 'string') {
      encrypted[field] = encrypt(encrypted[field] as string) as T[keyof T];
    }
  }

  return encrypted;
}

// Decrypt object fields
export function decryptObject<T extends Record<string, any>>(
  obj: T,
  fieldsToDecrypt: (keyof T)[]
): T {
  const decrypted = { ...obj };

  for (const field of fieldsToDecrypt) {
    if (decrypted[field] && typeof decrypted[field] === 'string') {
      try {
        decrypted[field] = decrypt(decrypted[field] as string) as T[keyof T];
      } catch {
        // If decryption fails, keep original value (might not be encrypted)
      }
    }
  }

  return decrypted;
}

// Hash for comparison (one-way, for verification)
export function hashData(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Generate random token
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

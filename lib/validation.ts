// Validation utilities for auth endpoints

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

// Validation functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSignUp(data: SignUpData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.errors[0];
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLogin(data: LoginData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = 'Email is required';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ============ File Upload Validation ============

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FileValidationOptions {
  maxSizeMB?: number;
  allowedExtensions?: string[];
  allowedTypes?: string[];
}

/**
 * Validates a file for upload
 * @param file - The file to validate
 * @param options - Validation options
 * @returns Validation result with error message if invalid
 */
export function validateFile(
  file: File,
  options: FileValidationOptions = {}
): FileValidationResult {
  const {
    maxSizeMB = 5,
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
    };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext =>
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed: ${allowedExtensions.join(', ')}`
    };
  }

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
    };
  }

  return { isValid: true };
}

/**
 * Validates an image file specifically
 * @param file - The image file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @returns Validation result
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number = 5
): FileValidationResult {
  return validateFile(file, {
    maxSizeMB,
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  });
}

/**
 * Validates a video file specifically
 * @param file - The video file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 50)
 * @returns Validation result
 */
export function validateVideoFile(
  file: File,
  maxSizeMB: number = 50
): FileValidationResult {
  return validateFile(file, {
    maxSizeMB,
    allowedExtensions: ['.mp4', '.webm', '.mov', '.avi'],
    allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
  });
}

/**
 * Handles file upload with validation and returns a preview URL
 * @param file - The file to upload
 * @param validateFn - Validation function to use
 * @param onSuccess - Callback when file is valid
 * @param onError - Callback when file is invalid
 */
export function handleFileUploadWithValidation<T = string>(
  file: File | null | undefined,
  validateFn: (file: File) => FileValidationResult,
  onSuccess: (url: string) => void,
  onError: (error: string) => void
): void {
  if (!file) {
    onError('No file selected');
    return;
  }

  const validation = validateFn(file);

  if (!validation.isValid) {
    onError(validation.error || 'Invalid file');
    return;
  }

  // Create preview URL
  const url = URL.createObjectURL(file);
  onSuccess(url);
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

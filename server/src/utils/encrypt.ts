import { BadRequestException } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';

export function encryptData(text: string) {
    try {
        const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Securely store in .env
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex'); // Securely store in .env

        const cipher = createCipheriv(algorithm, key, iv);
        const encrypted = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
        return encrypted;
    } catch (e) {
        console.log('e: ', e);
        throw new BadRequestException();
    }
}

export function decryptData(encryptedText: string) {
    try {
        const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Securely store in .env
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex'); // Securely store in .env

        const decipher = createDecipheriv(algorithm, key, iv);
        const decrypted = decipher.update(encryptedText, 'base64', 'utf8') + decipher.final('utf8');

        return decrypted;
    } catch (e) {
        console.log('e: ', e);
        throw new BadRequestException();
    }
}
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const key = process.env.CRYPTO_KEY;

const crypto = {
    encrypt: (text) => {
        const result = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result[i] = charCode;
        }
        return String.fromCharCode.apply(null, result);
    },
    decrypt: (encryptedText) => {
        const result = new Uint8Array(encryptedText.length);
        for (let i = 0; i < encryptedText.length; i++) {
            const charCode = encryptedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result[i] = charCode;
        }
        return String.fromCharCode.apply(null, result);
    }
}

module.exports = {isValidEmail, crypto};
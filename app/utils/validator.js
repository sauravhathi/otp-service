const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domain] = email.split("@");
    const allowedDomains = process.env.ALLOWED_DOMAINS
        ? process.env.ALLOWED_DOMAINS.split(",")
        : [];

    const minLocalPartLength = 5;
    const maxLocalPartLength = 64;

    return (
        (allowedDomains.length === 0 || allowedDomains.includes(domain)) &&
        localPart.length >= minLocalPartLength &&
        localPart.length <= maxLocalPartLength &&
        !/^[0-9]/.test(localPart) &&
        emailRegex.test(email)
    );
};

module.exports = { isValidEmail };
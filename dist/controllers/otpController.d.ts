declare class OtpController {
    generateOtp(email: string, type: string): Promise<string>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
}
export default OtpController;

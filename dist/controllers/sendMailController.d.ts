declare class SendMailController {
    private transporter;
    constructor();
    sendMail(email: string, otp: string, organization: string, subject: string): Promise<void>;
    private generateHtmlTemplate;
}
export default SendMailController;

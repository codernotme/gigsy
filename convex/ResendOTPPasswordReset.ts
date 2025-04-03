import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
 
export const ResendOTPPasswordReset = Resend({
  id: "resend-otp-reset",
  apiKey: "re_b53k5uRW_8C3YWcnENtrhtFessbHWKow7",
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    try {
      const resend = new ResendAPI(provider.apiKey);
      const { data, error } = await resend.emails.send({
        from: "Gigsy <no-reply@gigsy.codernotme.me>", // This must be a verified domain in Resend
        to: [email],
        subject: `Reset your password for Gigsy`,
        text: `Your password reset code is: ${token}
        
This code will expire in 10 minutes.

If you did not request to reset your password, you can safely ignore this email.`,
      });
   
      if (error) {
        console.error("Resend error:", error);
        throw new Error(`Could not send email: ${error.message}`);
      }
      
      console.log("Password reset email sent successfully:", data);
    } catch (err) {
      console.error("Failed to send password reset email:", err);
      throw new Error("Failed to send password reset email. Please try again.");
    }
  },
});
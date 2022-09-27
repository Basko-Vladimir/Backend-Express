import nodemailer from "nodemailer";
import {EmailInfoModel} from "../models/email-models";

export const emailAdapter = {
	async sendEmail(messageInfo: EmailInfoModel): Promise<void> {
		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "dev.test.vladimir@gmail.com",
				pass: `czpslaqrdtyiuuan`
			},
		});
		
		try {
			const info = await transport.sendMail(messageInfo);
			console.log(info);
		} catch (e) {
			console.log(e)
			throw new Error(`Email server error! : ${e}`)
		}
	}
};

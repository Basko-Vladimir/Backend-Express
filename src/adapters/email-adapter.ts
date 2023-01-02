import nodemailer from "nodemailer";
import {EmailInfoModel} from "../models/email-models";
import {injectable} from "inversify";
import {settings} from "../settings";

@injectable()
export class EmailAdapter {
	async sendEmail(messageInfo: EmailInfoModel): Promise<void> {
		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "dev.test.vladimir@gmail.com",
				pass: settings.TEST_DEV_EMAIL_PASS
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
}

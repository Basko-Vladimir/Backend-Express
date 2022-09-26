import {EmailInfoModel} from "../models/email-models";
import {emailAdapter} from "../adapters/email-adapter";
import { User } from "../classes/users";

export const emailManager = {
	async sendRegistrationEmail(userData: User): Promise<void> {
		const messageInfo: EmailInfoModel = {
			from: "Test Backend Server <dev.test.vladimir@gmail.com>",
			to: userData.email,
			subject: "Test Backend Server Registration",
			html: `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a>
      </p>`
		};
		
		return emailAdapter.sendEmail(messageInfo);
	}
};

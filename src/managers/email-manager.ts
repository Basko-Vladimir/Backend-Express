import {EmailInfoModel} from "../models/email-models";
import { User } from "../classes/users";
import {EmailAdapter} from "../adapters/email-adapter";

export class EmailManager {
	constructor(
		protected emailAdapter: EmailAdapter
	) {}
	
	async sendRegistrationEmail(userData: User): Promise<void> {
		const messageInfo: EmailInfoModel = {
			from: "Test Backend Server <dev.test.vladimir@gmail.com>",
			to: userData.email,
			subject: "Test Backend Server Registration",
			html: `<h1>Thank for your registration</h1>
      <p>To finish registration please follow the link below:
        <a href=https://somesite.com/confirm-email?code=${userData.emailConfirmation.confirmationCode}>
         	Complete registration
        </a>
      </p>`
		};
		
		return this.emailAdapter.sendEmail(messageInfo);
	}
}

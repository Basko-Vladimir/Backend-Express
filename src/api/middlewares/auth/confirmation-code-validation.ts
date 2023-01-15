import {body, Meta} from "express-validator";
import {iocContainer} from "../../../composition-root";
import {UsersService} from "../../../application/services/users-service";
import {
	confirmationCodeErrorMessages,
	generateMissedPropError
} from "../../../common/errors/error-messages";

const usersService = iocContainer.resolve(UsersService);

export const confirmationCodeValidation = body("code")
	.exists().withMessage(generateMissedPropError("code"))
	.custom(async (code, meta: Meta) => {
		const user = await usersService.getUserByFilter({confirmationCode: code});
		const { INVALID_CONFIRMATION_CODE, EXISTED_CONFIRMATION_CODE } = confirmationCodeErrorMessages;
		
		if (user) {
			if (user.emailConfirmation.isConfirmed) throw new Error(EXISTED_CONFIRMATION_CODE);
			if (user.emailConfirmation.confirmationCode !== code) throw new Error(INVALID_CONFIRMATION_CODE);
			
			meta.req.context = {user};
			return code;
		} else {
			throw new Error(INVALID_CONFIRMATION_CODE);
		}
	});

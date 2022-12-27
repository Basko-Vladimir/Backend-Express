import {body} from "express-validator";
import {confirmationCodeErrorMessages, generateMissedPropError} from "../../common/error-messages";
import {iocContainer} from "../../composition-root";
import {UsersService} from "../../services/users-service";

const usersService = iocContainer.resolve(UsersService);

export const passwordRecoveryCodeValidation = body("recoveryCode")
	.exists().withMessage(generateMissedPropError("recoveryCode"))
	.custom(async (code: string) => {
		const user = await usersService.getUserByFilter({passwordRecoveryCode: code});
		
		if (!user || user.passwordRecoveryCode !== code) {
			throw new Error(confirmationCodeErrorMessages.INVALID_CONFIRMATION_CODE)
		}
		
		return code;
	});

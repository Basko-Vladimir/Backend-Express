import {Schema} from "mongoose";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {IEmailConfirmation, IUser, IUserModel, UserModel} from "./UserTypes";
import {usersConstants} from "../../common/constants";
import {DATE_ERROR_MESSAGE, generateLengthErrorMessage, generateRegExpError} from "../../common/errors/error-messages";
import {BlogModel, IBlog} from "../blogs/BlogTypes";

const {MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, LOGIN_REG_EXP, EMAIL_REG_EXP} = usersConstants;
export const userSchema = new Schema<IUser, {}, IUserModel>({
	login: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_LOGIN_LENGTH, generateLengthErrorMessage("login", MIN_LOGIN_LENGTH, "min")],
		maxlength: [MAX_LOGIN_LENGTH, generateLengthErrorMessage("login", MAX_LOGIN_LENGTH, "max")],
		validate: [LOGIN_REG_EXP, generateRegExpError("login", LOGIN_REG_EXP)]
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate: [EMAIL_REG_EXP, generateRegExpError("email", EMAIL_REG_EXP)]
	},
	passwordSalt: {
		type: String,
		required: true,
		trim: true
	},
	passwordHash: {
		type: String,
		required: true,
		trim: true
	},
	passwordRecoveryCode: {
		type: String,
		default: null
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
	emailConfirmation: {
		confirmationCode: {
			type: String,
			required: true,
			trim: true
		},
		isConfirmed: {
			type: Boolean,
			required: true,
			default: false
		},
		expirationDate: {
			type: Date,
			required: true,
			min: [new Date(), DATE_ERROR_MESSAGE]
		}
	}
});

userSchema.method("createBlog", function (name: string, websiteUrl: string, description: string): IBlog {
	return new BlogModel({name, websiteUrl, description});
});

userSchema.method("confirmUserRegistration", function (): IUser {
	const that = this as IUser;
	
	that.emailConfirmation.isConfirmed = true;
	
	return that;
});

userSchema.method("updateConfirmationCode", function (): IUser {
	const that = this as IUser;
	
	that.emailConfirmation.confirmationCode = uuidv4();
	that.emailConfirmation.expirationDate = add(new Date(), {hours: 1});
	
	return that;
});

userSchema.method("updatePasswordRecoveryCode", function (): IUser {
	const that = this as IUser;
	
	that.passwordRecoveryCode = uuidv4();
	
	return that;
});

userSchema.method("updateUserPassword", function (passwordHash: string, recoveryCode: string): IUser {
	const that = this as IUser;
	
	that.passwordHash = passwordHash;
	that.passwordRecoveryCode = recoveryCode;
	
	return that;
});

userSchema.static("createUserEntity", function (
	login: string,
	email: string,
	passwordSalt: string,
	passwordHash: string,
	isConfirmed?: boolean
): IUser {
	const emailConfirmation: IEmailConfirmation = {
		confirmationCode: uuidv4(),
		isConfirmed: isConfirmed || false,
		expirationDate: add(new Date(), {hours: 1})
	}
	
	return new UserModel({
		login,
		email,
		passwordSalt,
		passwordHash,
		isConfirmed,
		emailConfirmation
	});
});

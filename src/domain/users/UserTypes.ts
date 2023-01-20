import {HydratedDocument, model, Model} from "mongoose";
import {userSchema} from "./UserSchema";

export interface IEmailConfirmation {
	confirmationCode: string;
	expirationDate: Date;
	isConfirmed: boolean;
}

export interface IUserProps {
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	passwordRecoveryCode?: string;
	emailConfirmation: IEmailConfirmation;
	createdAt: Date;
}

export interface IUserMethods {
	confirmUserRegistration(): IUser;
	updateConfirmationCode(): IUser;
	updatePasswordRecoveryCode(): IUser;
	updateUserPassword(passwordHash: string, recoveryCode: string): IUser;
}

export interface IUser extends HydratedDocument<IUserProps, IUserMethods> {}

export interface IUserModel extends Model<IUserProps, {}, IUserMethods> {
	createUserEntity(
		login: string,
		email: string,
		salt: string,
		hash: string,
		isConfirmed?: boolean
	): IUser
}

export const UserModel = model<IUserProps, IUserModel>("User", userSchema);

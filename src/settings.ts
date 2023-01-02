export const settings = {
	MONGO_URI: process.env.MONGO_URI || "mongodb://0.0.0.0",
	PORT: process.env.PORT || 5001,
	JWT_SECRET: process.env.JWT_SECRET || "secret-key",
	TEST_DEV_EMAIL_PASS: process.env.TEST_DEV_EMAIL_PASS || "Dev_Account"
};

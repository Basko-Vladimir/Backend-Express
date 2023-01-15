export const DATE_ERROR_MESSAGE = "Can not create an entity with a past Date";
export const EMAIL_SERVICE_ERROR_MESSAGE = "Some error with email service, try later!";

export const confirmationCodeErrorMessages = {
	INVALID_CONFIRMATION_CODE: "Confirmation code is not valid!",
	EXISTED_CONFIRMATION_CODE: "Confirmation code is confirmed already!"
}

const makeCapitalizeString = (value: string): string => {
	return value[0].toUpperCase() + value.slice(1);
}

export const generateLengthErrorMessage = (fieldName: string, value: number, type: "min" | "max"): string => {
	fieldName = makeCapitalizeString(fieldName);
	
	switch (type) {
		case "min": {
			return `${fieldName} length can't be less than ${value} symbol!`;
		}
		case "max": {
			return `${fieldName} length can't be more than ${value} symbol!`;
		}
		default: throw Error ("Incorrect input parameters for generateLengthErrorMessage function");
	}
};

export const generateLengthRangeErrorMessage = (
	fieldName: string,
	minValue: number,
	maxValue: number
): string => {
	return `${makeCapitalizeString(fieldName)} should be from ${minValue} to ${maxValue} chars`;
};

export const generateRegExpError = (fieldName: string, regExp: RegExp): string => {
	return `${makeCapitalizeString(fieldName)} doesn't match to pattern ${regExp}`;
};

export const generateMissedPropError = (fieldName: string): string => {
	return `You didn't provide '${fieldName.toLowerCase()}' field`;
};

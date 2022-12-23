export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const EMPTY_SEARCH_VALUE = "";

export const MIN_STRINGS_LENGTH = 1;

export const blogsConstants = {
	MAX_NAME_LENGTH: 15,
	MAX_DESCRIPTION_LENGTH: 500,
	WEBSITE_URL_REG_EXP: new RegExp("^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$"),
	MAX_WEBSITE_URL_LENGTH: 100
};

export const postsConstants = {
	MAX_TITLE_LENGTH: 30,
	MAX_SHORT_DESCRIPTION_LENGTH: 100,
	MAX_CONTENT_LENGTH: 1000
};

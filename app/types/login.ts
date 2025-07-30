export type Login = {
	email: string,
	password: string,
};

export type Register = {
	email: string,
	first_name: string
	last_name: string
	password: string,
	confirmPassword: string,
};

export type UserState = {
	email: string,
	memberCode: string,
	iat: string,
	exp: string,
}

export type Credential = {
	user: UserState | null;
	accessToken: string;
}
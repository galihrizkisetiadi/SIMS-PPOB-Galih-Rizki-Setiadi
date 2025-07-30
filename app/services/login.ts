import axios from "axios";
import type { Login, Register } from "~/types/login";

const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

export const createRegister = async (payload: Register): Promise<any> => {
	const query = `${baseUrl}/registration`;

	return new Promise((resolve, reject) => {
		axios
			.post(query, payload)
			.then((response) => {
				return resolve(response.data);
			})
			.catch((error) => {
				return reject(new Error(error.response.data.message as string));
			});
	});
};

export const handleLogin = async (payload: Login): Promise<any> => {
	const query = `${baseUrl}/login`;

	return new Promise((resolve, reject) => {
		axios
			.post(query, payload)
			.then((response) => {
				return resolve(response.data);
			})
			.catch((error) => {
				return reject(new Error(error.response.data.message as string));
			});
	});
};

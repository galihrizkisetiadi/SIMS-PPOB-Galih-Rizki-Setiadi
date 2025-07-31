import axios from "axios";
import type { Login, Register } from "~/types/login";

import { baseUrl, getToken } from "~/helper";

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

export const updateProfile = async (payload: Register): Promise<any> => {
	const query = `${baseUrl}/profile/update`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.put(query, payload, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				return resolve(response.data);
			})
			.catch((error) => {
				return reject(new Error(error.response.data.message as string));
			});
	});
};

export const updateProfileFoto = async (payload: File): Promise<any> => {
	const query = `${baseUrl}/profile/image`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.put(
				query,
				{ file: payload },
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				},
			)
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

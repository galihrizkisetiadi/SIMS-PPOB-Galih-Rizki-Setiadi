import axios from "axios";
import { getToken, baseUrl } from "~/helper";

export const getServices = async (): Promise<any> => {
	const query = `${baseUrl}/services`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.get(query, {
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

export const getBanner = async (): Promise<any> => {
	const query = `${baseUrl}/banner`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.get(query, {
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

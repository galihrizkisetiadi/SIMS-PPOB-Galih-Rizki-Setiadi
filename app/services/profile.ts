import axios from "axios";
import { getToken, baseUrl } from "~/helper";

export const getProfile = async (): Promise<any> => {
	const query = `${baseUrl}/profile`;

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

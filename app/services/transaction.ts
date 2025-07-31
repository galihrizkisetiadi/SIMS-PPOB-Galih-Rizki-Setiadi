import axios from "axios";
import { getToken, baseUrl } from "~/helper";

export const getBalance = async (): Promise<any> => {
	const query = `${baseUrl}/balance`;

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

export const getHistory = async (params: { limit: number, offset: number }): Promise<any> => {
	const query = `${baseUrl}/transaction/history`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.get(query, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				params,
			})
			.then((response) => {
				return resolve(response.data);
			})
			.catch((error) => {
				return reject(new Error(error.response.data.message as string));
			});
	});
};

export const handleTopUp = async (payload: number): Promise<any> => {
	const query = `${baseUrl}/topup`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.post(
				query,
				{ top_up_amount: payload },
				{
					headers: {
						"Content-Type": "application/json",
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

export const handlePayBill = async (payload: string): Promise<any> => {
	const query = `${baseUrl}/transaction`;

	const token = getToken();

	return new Promise((resolve, reject) => {
		axios
			.post(
				query,
				{ service_code: payload },
				{
					headers: {
						"Content-Type": "application/json",
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

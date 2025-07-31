export const getToken = () => {
	return localStorage.getItem("token");
};

export const decimalFormat = (number: number) => {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "decimal",
	});

	return formatter.format(number);
};

export const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getToken = () => {
	return localStorage.getItem("token");
};

export const decimalFormat = (number: number) => {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "decimal",
	});

	return formatter.format(number);
};

export const dateFormatter = (date: Date): string => {
	return dayjs(date).tz("Asia/Jakarta").format("DD MMMM YYYY HH:mm") + " WIB";
};

export const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

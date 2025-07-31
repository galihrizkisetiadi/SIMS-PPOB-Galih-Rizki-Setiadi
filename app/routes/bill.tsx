import Welcome from "~/components/Welcome";

import { useParams } from "react-router";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Pembayaran" }];
}

const Bill = () => {
	const { service } = useParams();
	return (
		<div className="flex flex-col gap-8">
			<Welcome />
			{service}
		</div>
	);
};

export default Bill;

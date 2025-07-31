import Welcome from "~/components/Welcome";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Transaksi" }];
}

const Transaction = () => {
	return (
		<div className="flex flex-col gap-8">
			<Welcome />
		</div>
	);
};

export default Transaction;

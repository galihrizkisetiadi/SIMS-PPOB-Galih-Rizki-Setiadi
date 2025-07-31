import Welcome from "~/components/Welcome";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Top Up" }];
}

const TopUp = () => {
	return (
		<div className="flex flex-col gap-8">
			<Welcome />
		</div>
	);
};

export default TopUp;

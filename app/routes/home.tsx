import Service from "~/components/Service";
import Banner from "~/components/Banner";
import Welcome from "~/components/Welcome";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi" }];
}

const Home = () => {
	return (
		<div className="flex flex-col gap-8">
			<Welcome />
			<Service />
			<Banner />
		</div>
	);
};

export default Home;

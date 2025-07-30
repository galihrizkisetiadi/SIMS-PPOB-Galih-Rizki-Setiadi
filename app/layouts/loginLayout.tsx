import { Outlet } from "react-router";
import type { Route } from "../+types/root";

import Img from "../assets/logos/Illustrasi Login.png";

export default function IndexLayout({ loaderData }: Route.ComponentProps) {
	return (
		<div className="flex">
			<Outlet context={loaderData} />
			<img src={Img} alt="Illustrasi Login" className="hidden lg:block" />
		</div>
	);
}

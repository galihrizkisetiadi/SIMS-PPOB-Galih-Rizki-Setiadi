import { Outlet, useNavigate, NavLink } from "react-router";
import type { Route } from "../+types/root";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { UserState } from "~/types/login";
import { Button, Modal } from "antd";

import Logo from "../assets/logos/Logo.png";

export default function IndexLayout({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();
	const [valueUser] = useLocalStorage<UserState | null>("user", null);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!valueUser) {
			navigate("/login", { replace: true });
		} else if (new Date(Number(valueUser.exp) * 1000) < new Date()) {
			setIsModalOpen(true);
		}
	}, []);

	const menus = [
		{
			name: "Top Up",
			url: "/topup",
		},
		{
			name: "Transaction",
			url: "/transaction",
		},
		{
			name: "Akun",
			url: "/account",
		},
	];

	return (
		<>
			<div className="flex items-center justify-between border-b-2 border-gray-200 py-3 text-3xl lg:px-[10rem]">
				<NavLink to={"/"} className="flex gap-2 text-lg font-bold">
					<img src={Logo} />
					<span>SIMS PPOB</span>
				</NavLink>
				<div className="flex gap-12 text-sm font-semibold">
					{menus.map((menu, index) => (
						<NavLink
							key={index}
							to={menu.url}
							className={({ isActive }) => (isActive ? "text-primary" : "hover:text-primary text-black")}
						>
							{menu.name}
						</NavLink>
					))}
				</div>
			</div>

			<main className="p-4 lg:px-[10rem] lg:py-14">
				<Outlet context={loaderData} />
			</main>

			<Modal
				title="Sesi Login telah berakhir"
				closable={{ "aria-label": "Custom Close Button" }}
				open={isModalOpen}
				onOk={async () => {
					setIsModalOpen(false);
					await navigate("/login", { replace: true });
				}}
			>
				<p>Silahkan login kembali</p>
			</Modal>
		</>
	);
}

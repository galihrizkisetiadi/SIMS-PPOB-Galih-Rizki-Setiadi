import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";

import { Button, Modal, Skeleton } from "antd";

import { decimalFormat } from "~/helper";

import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { getServices } from "~/services/service";
import { handlePayBill } from "~/services/transaction";

import Welcome from "~/components/Welcome";

import Logo from "../assets/logos/Logo.png";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Pembayaran" }];
}

const Bill = () => {
	const { service } = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [selectedService, setSelectedService] = useState<any>();
	const [modalConfirm, setModalConfirm] = useState(false);
	const [modalInfo, setModalInfo] = useState({ isOpen: false, success: false });

	const { data, isLoading } = useQuery({
		queryKey: ["services"],
		queryFn: getServices,
		staleTime: Infinity,
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: handlePayBill,
		onError: () => {
			setModalInfo({ isOpen: true, success: false });
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			setModalInfo({ isOpen: true, success: true });
		},
	});

	useEffect(() => {
		if (data) {
			setSelectedService(data?.data?.find((e: any) => e.service_code === service));
		}
	}, [isLoading]);

	return (
		<>
			<div className="flex flex-col gap-8">
				<Welcome />

				<div className="flex flex-col">
					<span>Pembayaran</span>
					{isLoading ? (
						<Skeleton />
					) : (
						<span className="flex items-center gap-2">
							<img src={selectedService?.service_icon} className="h-8 w-8" />
							<span className="font-bold">{selectedService?.service_name}</span>
						</span>
					)}
				</div>

				<div className="flex flex-col gap-4">
					<div
						className={[
							"flex w-full gap-2 rounded-sm px-4 py-2",
							"hover:border-primary border border-gray-300",
							"col-span-5 cursor-pointer",
						].join(" ")}
					>
						<div className="flex items-center justify-center">
							<FaRegMoneyBillAlt />{" "}
						</div>
						<NumericFormat
							value={selectedService?.service_tariff}
							thousandSeparator="."
							decimalSeparator=","
							disabled
							className="w-full focus:outline-0"
						/>
					</div>
					<Button
						type="primary"
						loading={isPending}
						className="col-span-5 !h-10 !rounded-sm"
						onClick={() => setModalConfirm(true)}
					>
						Bayar
					</Button>
				</div>
			</div>

			<Modal open={modalConfirm} footer={null} closable={false}>
				<div className="fllex flex-col items-center justify-center gap-4">
					<div className="flex flex-col items-center justify-center gap-2">
						<div className="flex h-12 w-12 items-center justify-center">
							<img src={Logo} alt="logo" />
						</div>
						<span>Beli {selectedService?.service_name} senilai</span>
						<span className="text-lg font-bold">Rp. {decimalFormat(selectedService?.service_tariff as number)}</span>
						<Button
							color="primary"
							variant="link"
							className="!p-0"
							onClick={async () => await mutateAsync(selectedService?.service_code as string)}
						>
							Ya, lanjutkan Bayar
						</Button>
						<Button color="default" variant="link" className="!p-0" onClick={() => setModalConfirm(false)}>
							Batalkan
						</Button>
					</div>
				</div>
			</Modal>

			<Modal open={modalInfo.isOpen} footer={null} closable={false}>
				<div className="fllex flex-col items-center justify-center gap-4">
					<div className="flex flex-col items-center justify-center gap-2">
						<div
							className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white ${modalInfo.success ? "bg-green-400" : "bg-primary"}`}
						>
							{modalInfo.success ? <IoCheckmarkOutline /> : <IoClose />}
						</div>
						<span>Top Up Sebesar</span>
						<span className="text-lg font-bold">Rp. {decimalFormat(selectedService?.service_tariff as number)}</span>
						<span>{modalInfo.success ? "berhasil" : "gagal"}</span>
						<Button color="primary" variant="link" className="!p-0" onClick={async () => await navigate("/")}>
							kembali ke Beranda
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Bill;

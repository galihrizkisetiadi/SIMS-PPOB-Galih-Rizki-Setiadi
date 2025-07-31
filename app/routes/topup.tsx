import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { NumericFormat } from "react-number-format";
import { Button, Modal } from "antd";

import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { handleTopUp } from "~/services/transaction";

import Welcome from "~/components/Welcome";
import { decimalFormat } from "~/helper";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Top Up" }];
}

const TopUp = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [nominal, setNominal] = useState(0);
	const [modalInfo, setModalInfo] = useState({ isOpen: false, success: false });
	const inputNominalRef = useRef<HTMLInputElement>(null);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: handleTopUp,
		onError: () => {
			setModalInfo({ isOpen: true, success: false });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["balance"] });
			setModalInfo({ isOpen: true, success: true });
		},
	});

	return (
		<>
			<div className="flex flex-col gap-8">
				<Welcome />

				<div className="flex flex-col">
					<span>Silahkan Masukan </span>
					<span className="text-xl font-bold">Nominal Top Up</span>
				</div>

				<div className="grid w-full grid-cols-8 gap-4">
					<div
						className={[
							"flex w-full gap-2 rounded-sm px-4 py-2",
							"hover:border-primary border border-gray-300",
							"col-span-5 cursor-pointer",
						].join(" ")}
						onClick={() => inputNominalRef.current?.focus()}
					>
						<div className="flex items-center justify-center">
							<FaRegMoneyBillAlt />{" "}
						</div>
						<NumericFormat
							getInputRef={inputNominalRef}
							value={nominal}
							thousandSeparator="."
							decimalSeparator=","
							onValueChange={(values) => {
								setNominal(Number(values.floatValue));
							}}
							className="w-full focus:outline-0"
						/>
					</div>

					<Button className="!h-10 !rounded-sm" onClick={() => setNominal(10000)}>
						Rp. 10.000
					</Button>
					<Button className="!h-10 !rounded-sm" onClick={() => setNominal(20000)}>
						Rp. 20.000
					</Button>
					<Button className="!h-10 !rounded-sm" onClick={() => setNominal(50000)}>
						Rp. 50.000
					</Button>

					<Button
						type="primary"
						disabled={!nominal || nominal < 10000}
						loading={isPending}
						className="col-span-5 !h-10 !rounded-sm"
						onClick={async () => await mutateAsync(nominal)}
					>
						Top Up
					</Button>

					<Button className="!h-10 !rounded-sm" onClick={() => setNominal(100000)}>
						Rp. 100.000
					</Button>
					<Button className="!h-10 !rounded-sm" onClick={() => setNominal(250000)}>
						Rp. 250.000
					</Button>
					<Button className="!h-10 !rounded-sm" onClick={() => setNominal(500000)}>
						Rp. 500.000
					</Button>
				</div>
			</div>

			<Modal open={modalInfo.isOpen} footer={null} closable={false}>
				<div className="fllex flex-col items-center justify-center gap-4">
					<div className="flex flex-col items-center justify-center gap-2">
						<div
							className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white ${modalInfo.success ? "bg-green-400" : "bg-primary"}`}
						>
							{modalInfo.success ? <IoCheckmarkOutline /> : <IoClose />}
						</div>
						<span>Top Up Sebesar</span>
						<span className="text-lg font-bold">Rp. {decimalFormat(nominal)}</span>
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

export default TopUp;

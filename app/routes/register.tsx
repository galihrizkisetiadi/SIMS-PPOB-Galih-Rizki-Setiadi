import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { Button, Form, Input, type FormProps, message } from "antd";
import type { Register } from "~/types/login";
import { createRegister } from "~/services/login";

import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";

import Logo from "../assets/images/Logo.png";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Register" }];
}

const Register = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createRegister,
		onError: (error) => {
			messageApi.error(error.message);
		},
		onSuccess: () => {
			messageApi.info("Register Berhasil silahkan login");
		},
	});

	const onFinish: FormProps<Register>["onFinish"] = async (values) => {
		await mutateAsync(values);
	};

	return (
		<>
			{contextHolder}
			<div className="flex w-full items-center justify-center gap-8 px-10 xl:px-0">
				<div className="flex flex-col items-center justify-center gap-12">
					<div className="flex flex-col items-center justify-center gap-6">
						<div className="flex gap-2 text-xl font-semibold">
							<img src={Logo} />
							SIMS PPOB
						</div>
						<div className="text-2xl font-bold">Lengkapi data untuk membuat akun</div>
					</div>

					<Form className="flex w-full flex-col items-center justify-center gap-6" onFinish={onFinish}>
						<div className="flex w-full flex-col items-center justify-center">
							<Form.Item<Register>
								name="email"
								rules={[{ required: true, message: "silahkan masukan email!", type: "email" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="masukan email anda" prefix={<>@</>} size="large" className="w-full !rounded-sm" />
							</Form.Item>
							<Form.Item<Register>
								name="first_name"
								rules={[{ required: true, message: "silahkan masukan nama depan!" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="nama depan" prefix={<FaUser />} size="large" className="w-full !rounded-sm" />
							</Form.Item>
							<Form.Item<Register>
								name="last_name"
								rules={[{ required: true, message: "silahkan masukan nama belakang!" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="nama belakang" prefix={<FaUser />} size="large" className="w-full !rounded-sm" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{ required: true, message: "silahkan masukan password!" },
									{
										validator(_, value) {
											if (value.length < 8) return Promise.reject(new Error("password minimal 8 karakter"));

											return Promise.resolve();
										},
									},
								]}
								className="w-full"
							>
								<Input.Password
									placeholder="buat password"
									prefix={<CiLock />}
									size="large"
									className="w-full !rounded-sm"
								/>
							</Form.Item>
							<Form.Item
								name="confirmPassword"
								dependencies={["password"]}
								rules={[
									{ required: true, message: "silahkan masukan password!" },
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error("password tidak sama"));
										},
									}),
								]}
								className="w-full"
							>
								<Input.Password
									placeholder="konfirmasi password"
									prefix={<CiLock />}
									size="large"
									className="w-full !rounded-sm"
								/>
							</Form.Item>
						</div>

						<div className="flex w-full flex-col items-center justify-center gap-2">
							<Form.Item className="w-full">
								<Button
									loading={isPending}
									type="primary"
									size="large"
									htmlType="submit"
									className="w-full !rounded-sm"
								>
									Registrasi
								</Button>
							</Form.Item>
							<div className="text-md text-gray-400">
								sudah punya akun? login{" "}
								<Button color="primary" variant="link" className="!p-0" onClick={async () => await navigate("/login")}>
									di sini
								</Button>
							</div>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Register;

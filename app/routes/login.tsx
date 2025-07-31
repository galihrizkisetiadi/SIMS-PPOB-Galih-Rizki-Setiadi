import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { Button, Form, Input, type FormProps, message } from "antd";
import type { Login } from "~/types/login";
import { handleLogin } from "~/services/login";

import { useAppDispatch } from "app/hooks";

import { CiLock } from "react-icons/ci";

import Logo from "../assets/logos/Logo.png";
import { setCredentials } from "~/redux/authSlice";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Login" }];
}

const Login = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const dispatch = useAppDispatch();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: handleLogin,
		onError: (error) => {
			messageApi.error(error.message);
		},
		onSuccess: async (response) => {
			messageApi.info("Login berhasil");

			dispatch(setCredentials(response.data.token as string));

			await navigate("/", { replace: true });
		},
	});

	const onFinish: FormProps<Login>["onFinish"] = async (values) => {
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
						<div className="text-2xl font-bold">Masuk atau buat akun untuk memulai</div>
					</div>

					<Form className="flex w-full flex-col items-center justify-center gap-6" onFinish={onFinish}>
						<div className="flex w-full flex-col items-center justify-center">
							<Form.Item<Login>
								name="email"
								rules={[{ required: true, message: "silahkan masukan email!", type: "email" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="masukan email anda" prefix={<>@</>} size="large" className="w-full !rounded-sm" />
							</Form.Item>

							<Form.Item
								name="password"
								rules={[{ required: true, message: "silahkan masukan password!" }]}
								className="w-full"
							>
								<Input.Password
									placeholder="buat password"
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
									Masuk
								</Button>
							</Form.Item>
							<div className="text-md text-gray-400">
								belum punya akun? registrasi{" "}
								<Button
									color="primary"
									variant="link"
									className="!p-0"
									onClick={async () => await navigate("/register")}
								>
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

export default Login;

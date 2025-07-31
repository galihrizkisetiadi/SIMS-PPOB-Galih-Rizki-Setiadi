import { useEffect, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { Button, Form, Input, type FormProps, message, Avatar, Skeleton } from "antd";

import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import type { Register, UserState } from "~/types/login";

import { updateProfile, updateProfileFoto } from "~/services/login";
import { getProfile } from "~/services/profile";

import Profile from "../assets/images/Profile Photo.png";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Akun" }];
}

const Account = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	const [valueUser, , removeValueUser] = useLocalStorage<UserState | null>("user", null);
	const [, , removeValueToken] = useLocalStorage<string | null>("token", null);

	const file = useRef<HTMLInputElement>(null);

	const {
		data: dataProfile,
		isLoading: isLoadingProfile,
		refetch,
	} = useQuery({
		queryKey: ["profile", valueUser?.memberCode],
		queryFn: getProfile,
		staleTime: Infinity,
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: updateProfile,
		onError: (error) => {
			messageApi.error(error.message);
		},
		onSuccess: () => {
			messageApi.info("Update Profile Berhasil");
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	const { mutateAsync: mutateAsyncFoto } = useMutation({
		mutationFn: updateProfileFoto,
		onError: (error) => {
			messageApi.error(error.message);
		},
		onSuccess: () => {
			messageApi.info("Update Foto Profile Berhasil");
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			refetch();
		},
	});

	const onFinish: FormProps<Register>["onFinish"] = async (values) => {
		await mutateAsync(values);
	};

	useEffect(() => {
		if (dataProfile?.data) {
			form.setFieldValue("email", dataProfile?.data?.email);
			form.setFieldValue("first_name", dataProfile?.data?.first_name);
			form.setFieldValue("last_name", dataProfile?.data?.last_name);
		}
	}, [isLoadingProfile]);

	const handleLogout = async () => {
		removeValueUser();
		removeValueToken();

		await navigate("/login");
	};

	const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget?.files?.[0];

		if (!file) return;

		if (file.size / 1024 > 100) {
			messageApi.error("Ukuran gambar tidak boleh lebih dari 100kb");
			return;
		}

		if (!["image/png", "image/jpeg"].includes(file.type)) {
			messageApi.error("Hanya boleh format .jpeg dan .png");
			return;
		}

		await mutateAsyncFoto(file);
	};

	if (isLoadingProfile) {
		return (
			<div className="flex flex-col items-center justify-center">
				<Skeleton title={false} />
			</div>
		);
	}

	return (
		<>
			{contextHolder}
			<div className="flex w-full items-center justify-center gap-8">
				<div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
					<div className="flex flex-col items-center justify-center gap-4">
						<div className="relative">
							<Avatar
								size={120}
								src={!dataProfile?.data?.profile_image.includes("null") ? dataProfile?.data?.profile_image : Profile}
							></Avatar>
							<button
								className="absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center !rounded-full border border-gray-300 bg-white text-sm text-gray-600"
								onClick={() => file.current?.click()}
							>
								<MdEdit />
							</button>
							<input type="file" ref={file} className="hidden" onChange={onChangeFile} />
						</div>

						<div className="text-2xl font-bold">
							{dataProfile?.data?.first_name + " " + dataProfile?.data?.last_name}
						</div>
					</div>

					<Form
						layout="vertical"
						className="flex w-full flex-col items-center justify-center gap-6"
						onFinish={onFinish}
						form={form}
					>
						<div className="flex w-full flex-col items-center justify-center">
							<Form.Item<Register>
								name="email"
								label="Email"
								rules={[{ required: true, message: "silahkan masukan email!", type: "email" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="masukan email anda" prefix={<>@</>} size="large" className="w-full !rounded-sm" />
							</Form.Item>
							<Form.Item<Register>
								name="first_name"
								label="Nama Depan"
								rules={[{ required: true, message: "silahkan masukan nama depan!" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="nama depan" prefix={<FaUser />} size="large" className="w-full !rounded-sm" />
							</Form.Item>
							<Form.Item<Register>
								name="last_name"
								label="Nama Belakang"
								rules={[{ required: true, message: "silahkan masukan nama belakang!" }]}
								validateTrigger="onBlur"
								className="w-full"
							>
								<Input placeholder="nama belakang" prefix={<FaUser />} size="large" className="w-full !rounded-sm" />
							</Form.Item>
						</div>

						<div className="flex w-full flex-col items-center justify-center">
							<Form.Item className="w-full">
								<Button
									loading={isPending}
									type="default"
									size="large"
									htmlType="submit"
									className="w-full !rounded-sm"
								>
									Simpan
								</Button>
							</Form.Item>
							<Form.Item className="w-full">
								<Button
									loading={isPending}
									type="primary"
									size="large"
									htmlType="submit"
									className="w-full !rounded-sm"
									onClick={handleLogout}
								>
									Logout
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Account;

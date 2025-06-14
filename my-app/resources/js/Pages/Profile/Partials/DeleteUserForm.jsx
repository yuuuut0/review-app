import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
	const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
	const passwordInput = useRef();

	const {
		data,
		setData,
		delete: destroy,
		processing,
		reset,
		errors,
		clearErrors,
	} = useForm({
		password: "",
	});

	const confirmUserDeletion = () => {
		setConfirmingUserDeletion(true);
	};

	const deleteUser = (e) => {
		e.preventDefault();

		destroy(route("profile.destroy"), {
			preserveScroll: true,
			onSuccess: () => closeModal(),
			onError: () => passwordInput.current.focus(),
			onFinish: () => reset(),
		});
	};

	const closeModal = () => {
		setConfirmingUserDeletion(false);

		clearErrors();
		reset();
	};

	return (
		<section className={`space-y-6 ${className}`}>
			<header>
				<h2 className="text-lg font-medium text-gray-900">アカウント削除</h2>

				<p className="mt-1 text-sm text-gray-600">
					アカウントが削除されると、そのすべてのリソースとデータ
					が永久に削除されます。アカウントを削除する前に
					保持したいデータや情報をダウンロードしてください。
				</p>
			</header>

			<DangerButton onClick={confirmUserDeletion}>
				アカウントを削除する
			</DangerButton>

			<Modal show={confirmingUserDeletion} onClose={closeModal}>
				<form onSubmit={deleteUser} className="p-6">
					<h2 className="text-lg font-medium text-gray-900">
						本当にアカウントを削除しますか？
					</h2>

					<p className="mt-1 text-sm text-gray-600">
						アカウントが削除されると、すべてのリソースとデータは永久に削除されます。パスワードを入力して、アカウントの永久削除を希望することを確認してください。
					</p>

					<div className="mt-6">
						<InputLabel
							htmlFor="password"
							value="Password"
							className="sr-only"
						/>

						<TextInput
							id="password"
							type="password"
							name="password"
							ref={passwordInput}
							value={data.password}
							onChange={(e) => setData("password", e.target.value)}
							className="mt-1 block w-3/4"
							isFocused
							placeholder="Password"
						/>

						<InputError message={errors.password} className="mt-2" />
					</div>

					<div className="mt-6 flex justify-end">
						<SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>

						<DangerButton className="ms-3" disabled={processing}>
							削除
						</DangerButton>
					</div>
				</form>
			</Modal>
		</section>
	);
}

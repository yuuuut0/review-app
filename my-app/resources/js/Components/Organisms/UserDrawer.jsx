import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Link,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { Link as InertiaLink, usePage } from "@inertiajs/react";
import React from "react";

export default function UserDrawer({isOpen, onClose, btnRef}) {
	const { auth } = usePage().props;

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
			size={{ base: "xs", md: "sm" }}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>menu</DrawerHeader>

				<DrawerBody>
					<VStack>
						{auth.user ? (
							<>
								<Box fontSize="xs" mb={4}>
									{auth.user.name}さん
								</Box>
								<Link
									as={InertiaLink}
									href={route("dashboard")}
									_hover={{ color: "gray.300" }}
									onClick={onClose}
								>
									ダッシュボード
								</Link>
								<Link
									as={InertiaLink}
									href={route("shop.create")}
									_hover={{ color: "gray.300" }}
								>
									店舗の登録
								</Link>
								<InertiaLink
									href={route("logout")}
									method="POST"
									_hover={{ color: "gray.300" }}
									onClick={onClose}
								>
									ログアウト
								</InertiaLink>
							</>
						) : (
							<>
								<Link as={InertiaLink} href={route("login")} onClick={onClose}>
									ログイン
								</Link>
								<Link
									as={InertiaLink}
									href={route("register")}
									onClick={onClose}
								>
									新規登録
								</Link>
							</>
						)}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

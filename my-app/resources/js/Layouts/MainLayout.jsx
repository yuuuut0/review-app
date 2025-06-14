import {
	Box,
	Heading,
	HStack,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Input,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef } from "react";
import { Head, Link as InertiaLink, usePage } from "@inertiajs/react";
import UserDrawer from "@/Components/Organisms/UserDrawer";

export default function MainLayout({ children, title }) {
	const { auth, status } = usePage().props;
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	useEffect(() => {
			if (status) {
				const messages = {
					"review-created": "レビューが投稿されました",
					"review-updated": "レビューが更新されました",
					"review-deleted": "レビューを削除しました",
					"review-create-error": "レビューの投稿に失敗しました",
					"shop-created": "店舗を登録しました",
					"shop-updated": "店舗情報を更新しました",
					"shop-deleted": "店舗を削除しました",
					"shop-create-error": "店舗の登録に失敗しました",
					"shop-update-error": "店舗の更新に失敗しました",
					"shop-delete-error": "店舗の削除に失敗しました",
				};
	
				const isError = status.includes("error");
	
				toast({
					position: "top",
					title: messages[status],
					status: isError ? "error" : "success",
					isClosable: true,
				});
			}
		}, [status]);

	return (
		<>
			<Head title={title} />
			<UserDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef}/>
			<header>
				<Box bg={"orange.800"}>
					<HStack
						justifyContent={"space-between"}
						alignItems={"center"}
						py={{ base: 2, md: 3 }}
						px={{ base: 2, md: 2 }}
					>
						<Heading as={"h1"} size={{ base: "sm", md: "md" }} color="white">
							<Link as={InertiaLink} href="/" _hover={{ color: "gray.300" }}>
								{import.meta.env.VITE_APP_NAME}
							</Link>
						</Heading>
						{/* パソコン表示 */}
						<HStack
							display={{ base: "none", md: "flex" }}
							color="white"
							fontWeight="bold"
						>
							{auth.user ? (
								<Box>
									<Text
										onClick={onOpen}
										cursor="pointer"
										ref={btnRef}
										alignItems="center"
										display="flex"
									>
										{auth.user.name}さん
										<SettingsIcon mx={1} />
									</Text>
								</Box>
							) : (
								<Box>
									<Link mr={2} href={route("login")}>
										<Button
											colorScheme="white"
											variant="outline"
											_hover={{ bg: "gray.500" }}
										>
											ログイン
										</Button>
									</Link>
									<Link href={route("register")}>
										<Button colorScheme="blue" _hover={{ bg: "blue.300" }}>
											新規登録
										</Button>
									</Link>
								</Box>
							)}
						</HStack>
						{/* スマホ表示 */}
						<Box display={{ base: "block", md: "none" }} px={2}>
							<HamburgerIcon
								color="white"
								_hover={{ bg: "orange.700" }}
								onClick={onOpen}
								ref={btnRef}
								fontSize={"lg"}
							/>
						</Box>
					</HStack>
				</Box>
			</header>
			<Box w={{base:'100%', lg:1000}} mx="auto">{children}</Box>
			<footer>
				<Box>
					<Box
						bg="orange.800"
						color="white"
						fontWeight="bold"
						textAlign="center"
					>
						<Text fontSize={{ base: 13, md: 16 }}>
							&copy; 2024 {import.meta.env.VITE_APP_NAME}
						</Text>
					</Box>
				</Box>
			</footer>
		</>
	);
}

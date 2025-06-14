import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Button, HStack, Link, VStack } from "@chakra-ui/react";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
	const { auth } = usePage().props;
	return (
		<VStack m={4} align="start">
			<Link href={route("review.user", { userId: auth.user.id })}>
				<Button colorScheme={"blue"}>投稿したレビュー一覧</Button>
			</Link>
			<Link href={route("shop.user", { userId: auth.user.id })}>
				<Button colorScheme={"green"}>投稿した店舗一覧</Button>
			</Link>
			<Link href={route("profile.edit", { userId: auth.user.id })}>
				<Button colorScheme={"gray"}>ユーザー設定</Button>
			</Link>
		</VStack>
	);
}

Dashboard.layout = (page) => <MainLayout children={page} title="マイページ" />;

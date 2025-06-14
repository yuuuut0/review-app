import ShopList from "@/Components/Organisms/ShopList";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Heading, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function IndexByUser(props) {
	return (
		<>
			<Box p={4}>
				<Heading fontSize={{ base: "24", md: "36" }} mb={3}>
					{props.user.name}の関連した店舗一覧
				</Heading>
				<ShopList shops={props.shops}/>
			</Box>
		</>
	);
}

IndexByUser.layout = (page) => (
	<MainLayout children={page} title="関連店舗一覧" />
);

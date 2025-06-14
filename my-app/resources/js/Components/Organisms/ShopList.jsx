import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import ShopItem from "../Molecules/ShopItem";
import Pagination from "../Molecules/Pagination";

export default function ShopList({shops, query = {}}) {
	return (
		<VStack spacing={4} align="stretch">
			{shops.data.length === 0 && (
				<Text color={"gray.400"}>ショップが見つかりませんでした</Text>
			)}
			{shops.data.map((shop) => (
				<ShopItem shop={shop} key={shop.id} />
			))}
			<Pagination query={query} items={shops} />
		</VStack>
	);
}

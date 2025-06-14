import { Button, HStack } from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import React from "react";

export default function Pagination({ query = {}, items }) {
	const handlePageChange = (url) => {
		router.get(url, query);
	};

	const getButtonLabel = (label) => {
		if (label.includes("previous")) return "前へ";
		if (label.includes("next")) return "次へ";
		return label;
	};

	return (
		<HStack justifyContent="center" alignItems="center">
			{items.links.map((link, index) => (
				<Button
					key={index}
					onClick={() => handlePageChange(link.url)}
					colorScheme={link.active ? "blue" : "gray"}
					isDisabled={!link.url}
				>
					{getButtonLabel(link.label)}
				</Button>
			))}
		</HStack>
	);
}

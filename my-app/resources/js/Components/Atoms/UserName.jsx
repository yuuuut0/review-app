import { Link, Text } from "@chakra-ui/react";
import { Link as InertiaLink } from "@inertiajs/react";
import React from "react";

export default function UserName({ user }) {
	return (
		<Text textAlign="right" mt={2} fontSize="sm">
			<Link as={InertiaLink} href={route("review.user", { userId: user.id })}>
				{user.name}
			</Link>
		</Text>
	);
}

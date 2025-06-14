import { Box, Button, Heading, HStack, Input, Select, Spinner } from "@chakra-ui/react";
import MainLayout from "@/Layouts/MainLayout";
import React, { useState } from "react";
import ReviewList from "@/Components/Organisms/ReviewList";
import { router, Link as InertiaLink } from "@inertiajs/react";
import ShopList from "@/Components/Organisms/ShopList";

export default function Home(props) {
	const [value, setValue] = useState(props.search || "");
	const [order, setOrder] = useState(props.order ?? "created_at");
	const [loading, setLoading] = useState(false);

	const handleSearch = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			router.get(route("shop.index"), { 
				search: value,
				order: order,
			});
		}, 1000);
	};

	const handleOrderBy = (e) => {
		setOrder(e.target.value);
		router.get(route("shop.index"), { 
			order: e.target.value,
			search: value,
		})
	}

	return (
		<>
			<Box p={4}>
				<Heading fontSize={{ base: "24px", md: "40px" }} mb={2}>
					ショップ一覧
				</Heading>
				<HStack mb={4} w={{ base: "100%", md: 700 }}>
					<Select name="order" id="order" value={order} onChange={handleOrderBy}>
						<option value="created_at">新規順</option>
						<option value="reviews_count">レビュー数順</option>
						<option value="reviews_avg_rating">レビュー平均順</option>
					</Select>
					<Input
						name="search"
						id="search"
						value={value}
						placeholder="検索..."
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>
					<Button onClick={handleSearch} colorScheme="blue">
						検索
					</Button>
				</HStack>
				{loading && (
					<Box display="flex" justifyContent="center" mb={4}>
						<Spinner />
					</Box>
				)}
				<ShopList shops={props.shops} query={{search:value, order:order}} />
				<Heading
					as={"h2"}
					fontSize={{ base: "24px", md: "40px" }}
					mb={2}
					mt={8}
				>
					新着レビュー
				</Heading>
				<ReviewList reviews={props.newReviews} />
			</Box>
		</>
	);
}

Home.layout = (page) => <MainLayout children={page} title="ホーム" />;

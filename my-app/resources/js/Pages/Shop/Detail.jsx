import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import { EditIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Link,
	Tab,
	TabList,
	Tabs,
	Text,
	useToast,
} from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import DetailImageSplide from "@/Components/Organisms/DetailImageSplide";
import { router } from "@inertiajs/react";
import PaginatedReviewList from "@/Components/Organisms/PaginatedReviewList";

export default function Detail(props) {
	const sortToIndex = {
		latest: 0,
		oldest: 1,
		high_rating: 2,
		low_rating: 3,
	};
	const defaultSort = props.sort ?? "latest";
	const defaultTabIndex = sortToIndex[defaultSort] ?? 0;

	function handleSort(e) {
		router.get(
			route("shop.detail", {
				id: props.shop.id,
				sort: e.target.value,
			})
		);
	}

	return (
		<Box p={4}>
			<Box display="flex" gap={4}>
				<Heading as="h2" size="xl" mb={4}>
					{props.shop.name}
				</Heading>
				<Link href={route("shop.edit", { id: props.shop.id })}>
					<Button p={2} borderRadius={10}>
						<EditIcon />
					</Button>
				</Link>
			</Box>
			<Box color={"gray.500"}>
				{props.createdUser ? (
					<Text fontSize={{ base: 14, md: 16 }}>
						作成者:{" "}
						<Link href={route("shop.user", { userId: props.createdUser.id })}>
							{props.createdUser.name}
						</Link>
						さん
					</Text>
				) : (
					<Text fontSize={{ base: 14, md: 16 }}>作成者不明</Text>
				)}
				{props.updatedUser ? (
					<Text fontSize={{ base: 14, md: 16 }}>
						更新者:{" "}
						<Link href={route("shop.user", { userId: props.updatedUser.id })}>
							{props.updatedUser.name}
						</Link>
						さん
					</Text>
				) : (
					<Text fontSize={{ base: 14, md: 16 }}>更新者なし</Text>
				)}
			</Box>
			{props.shop.images.length > 0 ? (
				<Box>
					<DetailImageSplide images={props.shop.images} />
				</Box>
			) : (
				<Box
					h={40}
					display={"flex"}
					justifyContent="center"
					alignItems="center"
				>
					<Text color="gray.500" fontWeight="bold">
						画像がありません
					</Text>
				</Box>
			)}
			<Box mb={3}>
				<Heading fontSize="lg" color="gray.500" fontWeight={"semibold"} mb={2}>
					詳細
				</Heading>
				<Text m={2}>{props.shop.description}</Text>
			</Box>
			<Box>
				<Heading fontSize="lg" color="gray.500" fontWeight={"semibold"} mb={2}>
					住所
				</Heading>
				<Text m={2}>{props.shop.location}</Text>
			</Box>

			{/* レビュー */}
			<Box mt={8}>
				<HStack mb={4}>
					<Heading as="h3" size="lg">
						レビュー
					</Heading>
					<Box>
						{props.reviews.length > 0 && <Box>({props.reviews.length})</Box>}
					</Box>
				</HStack>
				<Box>
					<Link href={`/review/create/shop/${props.shop.id}`}>
						<Button mb={4}>
							<SmallAddIcon mr={2} />
							レビューを書く
						</Button>
					</Link>
				</Box>
				<Tabs mx={2} defaultIndex={defaultTabIndex}>
					<TabList>
						<Tab onClick={(e) => handleSort(e)} id="latest" value={"latest"}>
							新着順
						</Tab>
						<Tab onClick={(e) => handleSort(e)} id="oldest" value={"oldest"}>
							古い順
						</Tab>
						<Tab
							onClick={(e) => handleSort(e)}
							id="high_rating"
							value={"high_rating"}
						>
							評価が高い順
						</Tab>
						<Tab
							onClick={(e) => handleSort(e)}
							id="low_rating"
							value={"low_rating"}
						>
							評価が低い順
						</Tab>
					</TabList>
				</Tabs>
				<PaginatedReviewList reviews={props.reviews} query={{sort:props.sort}}/>
			</Box>
		</Box>
	);
}

Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

import { Button, List, Text, useTheme } from "react-native-paper";
import { Animated, Dimensions, Image, ImageBackground, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import { sanityClient, urlFor } from "../../lib/sanity";
import { useQuery } from "react-query"; 
import { Business } from "../../types/SanitySchema";
import { useHeader } from "../../hooks/useHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Stack from "../../components/Stack";

const getBusiness = async (slug: string) => {
	const res = await sanityClient.fetch<Business | undefined>(`*[_type == "business" && slug.current == $slug][0] {
		..., cover { ..., asset -> { ..., metadata } }
	}`, { slug });

	return res;
}

export default function BusinessPage() {
	const theme = useTheme();
	const screenWidth = Dimensions.get("window").width;
	const topPadding = useSafeAreaInsets().top;
	const route = useRoute();
	const { id } = route.params as { id: string };
	const { data, isLoading } = useQuery(`business.${id}`, () => getBusiness(id));
	const { onScroll } = useHeader({
		animated: true,
		title: data?.name,
		transparent: true,
	})

	if (isLoading) {
		return (
			<Container>
				<Text>Loading...</Text>
			</Container>
		)
	}

	return (
		<Animated.ScrollView onScroll={onScroll}>
			{/*@ts-ignore */}
			<ImageBackground 
				source={{ uri: data.cover.asset.metadata.lqip }}
				style={{
					width: screenWidth,
					height: 128,
					backgroundColor: theme.colors.elevation.level1
				}}
			>
				<Image
					source={{ uri: urlFor(data.cover).height(256).width(screenWidth * 2).url() }}
					style={{ 
						width: screenWidth, 
						height: 128,
						resizeMode: "cover",
					}}
				/>
			</ImageBackground>
			<View
				style={{
					position: "absolute",
					top: 48 + 8 + topPadding,
					left: screenWidth / 2 - 48 - 8,
					backgroundColor: theme.colors.background,
					padding: 8,
					borderRadius: 16,
				}}
			>
				<Image
					source={{ uri: urlFor(data.logo).height(128).width(128).url() }}
					style={{
						width: 96,
						height: 96,
						resizeMode: "contain",
						borderRadius: 12
					}}
				/>
			</View>
			<Container>
				<Stack>
					<Text 
						style={{
							marginTop: 48 + 8,
							textAlign: "center",
						}}
						variant="headlineLarge"
					>
						{data.name}
					</Text>
					<Button
						mode="contained"
						onPress={() => {}}
						icon="map-marker"
					>
						Deschide locatia
					</Button>
					<Button
						mode="contained-tonal"
						onPress={() => {}}
						icon="web"
					>
						Deschide site-ul
					</Button>
					<Text>
						{data.description}
					</Text>
					<List.Section>
						<List.Subheader>
							Contact
						</List.Subheader>
						{data.contact.phone && (
							<List.Item
								title="Telefon"
								description={data.contact.phone}
								left={(props) => <List.Icon icon="phone" {...props} />}
								onPress={() => {}}
							/>
						)}
						{data.contact.email && (
							<List.Item
								title="Email"
								description={data.contact.email}
								left={(props) => <List.Icon icon="email" {...props} />}
								onPress={() => {}}
							/>
						)}
					</List.Section>
				</Stack>
			</Container>
		</Animated.ScrollView>
	)
}

import { Entypo, Feather } from "@expo/vector-icons";
import { useNhostClient, useUserId } from "@nhost/react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";

const GET_USER_QUERY = `
query MyQuery($id:uuid!) {
  user(id: $id) {
    avatarUrl
    id
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}
`;

export default function ProfileScreen() {
  const [user, setUser] = useState();
  const nhost = useNhostClient();

  const signOut = () => {
    nhost.auth.signOut();
  };

  const userId = useUserId();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    if (result.error) {
      Alert.alert("error fetching the user");
    } else {
      setUser(result.data.user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Feather name="share" size={24} color="white" style={styles.icon} />
          </Pressable>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Followings</Text>
      </View>
      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    fontWeight: "600",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 20,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});

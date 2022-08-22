import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";

const Pin = ({ pin }) => {
  const [ratio, setRatio] = useState(1);
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState("");
  const nhost = useNhostClient();

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: pin.image,
    });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl?.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [pin.image]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => setRatio(width / height));
    }
  }, [imageUri]);

  const onLike = () => {};

  const goToPinPage = () => {
    navigation.navigate("Pin", { id: pin.id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          source={{
            uri: imageUri,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={24} color="white" />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {pin.title}
      </Text>
    </Pressable>
  );
};

export default Pin;

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    margin: 5,
    color: "white",
  },
  image: {
    width: "100%",
    borderRadius: 15,
  },
  heartBtn: {
    backgroundColor: "#d3cfd4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

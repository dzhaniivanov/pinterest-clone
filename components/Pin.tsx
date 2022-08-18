import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Pin = ({ pin }) => {
  const [ratio, setRatio] = useState(1);

  const onLike = () => {};

  useEffect(() => {
    if (pin.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
    }
  }, [pin.image]);

  return (
    <View style={styles.pin}>
      <View>
        <Image
          source={{
            uri: pin.image,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={24} color="white" />
        </Pressable>
      </View>
      <Text style={styles.title}>{pin.title}</Text>
    </View>
  );
};

export default Pin;

const styles = StyleSheet.create({
  pin: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: "white",
  },
  image: {
    width: "100%",
    borderRadius: 25,
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

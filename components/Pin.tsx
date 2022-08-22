import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";
import RemoteImage from "./RemoteImage";

const Pin = ({ pin }) => {
  const navigation = useNavigation();

  const onLike = () => {};

  const goToPinPage = () => {
    navigation.navigate("Pin", { id: pin.id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <RemoteImage fileId={pin.image} />
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

  heartBtn: {
    backgroundColor: "#d3cfd4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

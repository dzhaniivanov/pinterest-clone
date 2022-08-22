import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const RemoteImage = ({ fileId }) => {
  const [ratio, setRatio] = useState(1);
  const [imageUri, setImageUri] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
  );

  const nhost = useNhostClient();

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId,
    });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl?.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => setRatio(width / height));
    }
  }, [imageUri]);

  return (
    <Image
      source={{
        uri: imageUri,
      }}
      style={[styles.image, { aspectRatio: ratio }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 15,
  },
});

export default RemoteImage;

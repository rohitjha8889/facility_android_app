import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const Slider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width; // Get screen width

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % images.length;
      setCurrentPage(nextPage);
      scrollToPage(nextPage);
    }, 2000); // 2 seconds interval

    return () => clearInterval(interval);
  }, [currentPage]);

  const handlePageChange = (event) => {
    const { contentOffset } = event.nativeEvent;
    const pageIndex = Math.round(contentOffset.x / screenWidth);
    setCurrentPage(pageIndex);
  };

  const scrollToPage = (page) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        animated: true,
        x: page * screenWidth,
        y: 0,
      });
    }
  };
  // Define an array of images
  const images = [
    require("../images/login/housekeeping.jpg"),
    require("../images/login/gda2.jpg"),
    require("../images/login/security.jpg"),
    require("../images/login/supervisior.jpg"),
    require("../images/login/bouncer.jpg"),
    
  ];

  return (
    <View style={styles.slider}>
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.scrollView}
        onMomentumScrollEnd={handlePageChange}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} style={[styles.card, { width: screenWidth }]} activeOpacity={1}>
            <Image source={image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <View style={styles.pageIndicator}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicatorDot,
              currentPage === index && styles.pageIndicatorDotActive,
            ]}
          />
        ))}
      </View> */}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  slider: {
    height: 400,
    position: "relative",
  },
  scrollView: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    alignSelf: "center",
  },
  pageIndicator: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignSelf: "center",
  },
  pageIndicatorDot: {
    width: 45,
    height: 3,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  pageIndicatorDotActive: {
    backgroundColor: "#184562",
  },
});

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ totalTime }: { totalTime: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = 1 - timeLeft / totalTime;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={[styles.container, { marginTop: 20 }]}>
      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "#eee",
          marginTop: 20,
        }}
      >
        <View
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "#6200ee",
          }}
        />
      </View>
      <Text style={[styles.timerText, { marginTop: 20 }]}>
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 32,
    marginBottom: 20,
    color: "#ffff",
  },
  progressBar: {
    height: 10,
    width: "100%",
    borderRadius: 5,
  },
});

export default Timer;

import { withOpacity } from "@/utils/getColorByHex";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SkeletonLoader() {
    const [opacity, setOpacity] = useState(0.3);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity(prev => prev === 0.3 ? 0.6 : 0.3);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={[styles.skeletonAvatar, { opacity }]} />
            <View style={styles.headerTextContainer}>
                <View style={styles.balanceContainer}>
                    <View style={[styles.skeletonText, { width: 120, opacity }]} />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={[styles.skeletonBadge, { opacity }]} />
                        <View style={[styles.skeletonBadge, { opacity }]} />
                    </View>
                </View>
                <View style={[styles.skeletonProgress, { opacity }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 12,
        backgroundColor: withOpacity('#FFFFFF', 0.1),
        borderRadius: 10,
    },
    headerTextContainer: {
        flex: 1,
        gap: 10,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    // Skeleton styles
    skeletonAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: withOpacity('#FFFFFF', 0.2),
    },
    skeletonText: {
        height: 16,
        borderRadius: 4,
        backgroundColor: withOpacity('#FFFFFF', 0.2),
    },
    skeletonBadge: {
        width: 80,
        height: 32,
        borderRadius: 6,
        backgroundColor: withOpacity('#FFFFFF', 0.2),
    },
    skeletonProgress: {
        height: 8,
        borderRadius: 4,
        backgroundColor: withOpacity('#FFFFFF', 0.2),
    },
});
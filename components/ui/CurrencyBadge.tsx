import { formatCompactNumber } from "@/utils/formatNumber";
import { withOpacity } from "@/utils/getColorByHex";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function CurrencyBadge({ 
    icon, 
    amount, 
    color,
    size = 14
}: { 
    icon: string; 
    amount: number; 
    color: string;
    size?: number;
}) {
    return (
        <View style={[
            styles.badgeContainer,
            { backgroundColor: withOpacity(color, 0.1) }
        ]}>
            <FontAwesome5 name={icon} size={size} color={color} solid />
            <Text style={[styles.badgeText, { color, fontSize: size * 0.9 }]}>
                {formatCompactNumber(amount)}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    badgeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
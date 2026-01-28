import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
interface Action {
    title: string;
    subtitle?: string;
    colohex: string;
    route: string;
    icontext: string;
}
export default function ActionItem({ title, subtitle, colohex, route, icontext }: Action) {
    const viewBox = "0 0 318 183";
    const { width } = Dimensions.get('window');
    const cardWidth = width * 0.4; // Ajusta el ancho deseado
    const cardHeight = (183 / 318) * cardWidth; // Mantiene el aspect ratio
    return (
        <TouchableOpacity activeOpacity={0.9} style={{ alignSelf: 'center', width: cardWidth, height: cardHeight }}>
            <Svg style={StyleSheet.absoluteFill}
                width="100%" height="100%"
                viewBox={viewBox} fill={colohex} stroke={colohex}>
                <G>
                    <Path d="M71.0869 15.1445V19.6172H35.8096L31.2881 24.1357L30.541 24.8818L29.7939 24.1357L28.126 22.4688L27.3779 21.7217L28.126 20.9746L33.6504 15.4541L33.959 15.1445H71.0869Z" strokeWidth={2.11315} />
                    <Path d="M22.1247 30.501L23.7927 32.168L24.5407 32.915L23.7927 33.6621L19.6188 37.834V56.248H15.1442V35.9844L15.4538 35.6748L20.6315 30.501L21.3776 29.7539L22.1247 30.501Z" strokeWidth={2.11315} />
                    <Path d="M78.2402 16.6552V18.084H81.5111V16.6552H78.2402Z" />
                    <Path d="M288.707 23.3885L283.876 18.5609H249.217V16.2012H284.851L290.375 21.7216L288.707 23.3885Z" />
                    <Path d="M303.046 55.1915H300.685V37.3963L296.201 32.915L297.869 31.248L303.046 36.4221V55.1915Z" />
                    <Path d="M302.05 66.0586H301.66V94.1586H302.05V66.0586Z" />
                    <Path d="M301.184 68.2656H302.613V64.9967H301.184V68.2656Z" />
                    <Path d="M70.0304 168.349H34.3968L28.873 162.828L30.541 161.161L35.3716 165.989H70.0304V168.349Z" />
                    <Path d="M21.378 153.303L16.2009 148.129V129.359H18.562V147.155L23.046 151.636L21.378 153.303Z" />
                    <Path d="M17.5879 66.0586H17.1982V94.1586H17.5879V66.0586Z" />
                    <Path d="M18.0635 64.9756H16.6347V68.2445H18.0635V64.9756Z" />
                    <Path d="M17.5879 90.3906H17.1982V118.491H17.5879V90.3906Z" />
                    <Path d="M18.0635 116.305H16.6347V119.574H18.0635V116.305Z" />
                    <Path d="M237.801 17.1973H154.035V17.5869H237.801V17.1973Z" />
                    <Path d="M241.006 18.0616V16.6328H231.259V18.0616H241.006Z" />
                    <Path d="M165.212 17.1973H81.4462V17.5869H165.212V17.1973Z" />
                    <Path d="M88.0096 18.0616V16.6328H78.2618V18.0616H88.0096Z" />
                    <Path d="M237.802 167.006H154.036V167.396H237.802V167.006Z" />
                    <Path d="M240.985 167.894V166.465H231.238V167.894H240.985Z" />
                    <Path d="M165.213 167.006H81.447V167.396H165.213V167.006Z" />
                    <Path d="M87.9888 167.872V166.443H78.241V167.872H87.9888Z" />
                    <Path d="M284.851 168.349H249.217V165.989H283.876L288.707 161.161L290.375 162.828L284.851 168.349Z" />
                    <Path d="M297.869 153.303L296.201 151.636L300.685 147.155V129.359H303.046V148.129L297.869 153.303Z" />
                    <Path d="M302.05 90.3906H301.66V118.491H302.05V90.3906Z" />
                    <Path d="M301.184 119.552H302.613V116.283H301.184V119.552Z" />
                </G>
            </Svg>

            <View style={{
                ...StyleSheet.absoluteFillObject,
                width: cardWidth, height: cardHeight,
                gap: 5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FontAwesome name={icontext as any} size={24} color={colohex} />
                <Text style={{ color: colohex, fontSize:20, fontFamily: 'Orbitron' }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
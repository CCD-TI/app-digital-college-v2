import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native";
import ActionItem from "./ActionItem";

interface Action {
    title: string;
    subtitle?: string;
    colohex: string;
    route: string;
    icontext: string;
}
export default function MainActions(){
    const Actions: Action[] = [
        { title: "Misiones", subtitle: "Examemens Academicos", colohex: Colors.yellowDC2, route: "/misiones", icontext: "rocket" },
        { title: "Simulaciones", subtitle: "labs Interactivos", colohex: Colors.cyanDC, route: "/misiones", icontext: "cube" },
        { title: "Tests", subtitle: "Test Vocacionales", colohex: Colors.purpleDC, route: "/misiones", icontext: "book" }
    ]
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginVertical:10, gap: 10 }}>
            {Actions.map((action, index) => (
                <ActionItem key={index} title={action.title} subtitle={action.subtitle} colohex={action.colohex} route={action.route} icontext={action.icontext} />
            ))}
        </ScrollView>
    )
}
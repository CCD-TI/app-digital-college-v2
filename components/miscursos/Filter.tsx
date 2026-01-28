import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { withOpacity } from '@/utils/getColorByHex';
import { GRADOS, NIVELES, AREAS } from '@/constants/data';
import { GradoType, NivelType, AreaType } from '@/store/auth/cursos_types';

interface FilterProps {
    selectedGrado: number | null;
    setSelectedGrado: (id: number | null) => void;
    selectedNivel: number | null;
    setSelectedNivel: (id: number | null) => void;
    selectedArea: number | null;
    setSelectedArea: (id: number | null) => void;
}

const Filter: React.FC<FilterProps> = ({
    selectedGrado,
    setSelectedGrado,
    selectedNivel,
    setSelectedNivel,
    selectedArea,
    setSelectedArea,
}) => {
    return (
        <View style={styles.container}>
            <FilterSection
                title="Grado"
                items={Object.entries(GRADOS).map(([name, id]) => ({ id, name }))}
                selectedItem={selectedGrado}
                onSelectItem={setSelectedGrado}
            />
            <FilterSection
                title="Nivel"
                items={Object.entries(NIVELES).map(([name, id]) => ({ id, name }))}
                selectedItem={selectedNivel}
                onSelectItem={setSelectedNivel}
            />
            <FilterSection
                title="Área"
                items={Object.entries(AREAS).map(([name, id]) => ({ id, name }))}
                selectedItem={selectedArea}
                onSelectItem={setSelectedArea}
            />
        </View>
    );
};

const FilterSection = ({ title, items, selectedItem, onSelectItem }: { title: string, items: { id: number, name: string }[], selectedItem: number | null, onSelectItem: (id: number | null) => void }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.tab, selectedItem === null && styles.activeTab]}
                    onPress={() => onSelectItem(null)}
                >
                    <Text style={[styles.tabText, selectedItem === null && styles.activeTabText]}>Todos</Text>
                </TouchableOpacity>
                {items.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.tab, selectedItem === item.id && styles.activeTab]}
                        onPress={() => onSelectItem(item.id)}
                    >
                        <Text style={[styles.tabText, selectedItem === item.id && styles.activeTabText]}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: 10,
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: withOpacity("#00b4d8", 0.3),
        borderColor: "#00b4d8",
    },
    tabText: {
        color: '#fff',
    },
    activeTabText: {
        fontWeight: 'bold',
    },
});

export default Filter;

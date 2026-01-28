import IconArrowDown from "@/components/IconArrowDown";
import IconArrowUp from "@/components/IconArrowUp";
import IconPlay from "@/components/IconePlay";
import { useAuthStore } from "@/store/auth/authStore";
import { Modulo } from "@/store/auth/cursos_types";
import { withOpacity } from "@/utils/getColorByHex";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import Resultados from "../quizz/Resultados";
import ExpanAccordion from "./ExpanAccordion";
import Libro from "./Libro";

const TabSelector = ({
  modulo,
  libroUrl,
  currentPage = 0,
}: {
  modulo: Modulo;
  libroUrl: string;
  currentPage?: number;
}) => {
  const [activeTab, setActiveTab] = useState("Bimestre");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [datavideo, setDataVideo] = useState<{
    library_id: string;
    video_id: string;
    video_url: string;
  } | null>(null);
  const { id } = useAuthStore();
  const [showAllMap, setShowAllMap] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const firstVideo = modulo.grupos?.find(
      (g) => g.grupo !== "Evaluacion"
    )?.contenido?.[0];

    if (firstVideo && firstVideo.library_id && firstVideo.video_id) {
      setDataVideo({
        library_id: firstVideo.library_id,
        video_id: firstVideo.video_id,
        video_url: firstVideo.urlVideo!,
      });
    }
  }, [modulo]);

  const toggleShowAll = (index: number) => {
    setShowAllMap((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const renderTabContent = (activeTab: string) => {
    switch (activeTab) {
      case "Bimestre":
        return (
          <>
            {modulo.grupos
              .filter((grupo) => grupo.grupo !== "Evaluacion")
              .map((grupo, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <ExpanAccordion
                    title={grupo.grupo}
                    expanded={expanded === index}
                    onPress={() =>
                      setExpanded(expanded === index ? null : index)
                    }
                  >
                    {(() => {
                      const showAll = showAllMap[index] || false;
                      const items = showAll
                        ? grupo.contenido
                        : grupo.contenido.slice(0, 3);

                      return (
                        <>
                          {items.map((contenidoItem, seccionIndex) => (
                            <TouchableOpacity
                              onPress={() => {
                                setDataVideo({
                                  library_id: contenidoItem.library_id!,
                                  video_id: contenidoItem.video_id!,
                                  video_url: contenidoItem.urlVideo!,
                                });
                              }}
                              key={seccionIndex}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  width: "100%",
                                  justifyContent: "space-between",
                                  paddingRight: 40,
                                  alignContent: "center",
                                }}
                              >
                                <Text style={{ color: "#F9B233", padding: 10 }}>
                                  {contenidoItem.titulo}:{" "}
                                  <Text style={{ color: "#fff", padding: 10 }}>
                                    {contenidoItem.nombre}
                                  </Text>
                                </Text>
                                <View
                                  style={{
                                    alignContent: "center",
                                    alignItems: "center",
                                    marginVertical: "auto",
                                  }}
                                >
                                  <IconPlay />
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))}

                          {grupo.contenido.length > 3 && (
                            <TouchableOpacity
                              onPress={() => toggleShowAll(index)}
                            >
                              <View style={{ marginHorizontal: "auto" }}>
                                {showAll ? <IconArrowUp /> : <IconArrowDown />}
                              </View>
                            </TouchableOpacity>
                          )}
                        </>
                      );
                    })()}
                  </ExpanAccordion>
                </View>
              ))}
          </>
        );
      case "Libro":
        return <Libro flipbookUrl={libroUrl} page={currentPage} />;
      case "Quizz":
        return (
          <>
            {modulo.grupos
              .filter((grupo) => grupo.grupo == "Evaluacion")
              .map((grupo, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Resultados
                    usuarioId={id}
                    evaluacionId={
                      grupo.contenido[0].evaluacion_id?.toString()
                        ? grupo.contenido[0].evaluacion_id?.toString()
                        : null
                    }
                  />
                </View>
              ))}
          </>
        );

      default:
        return null;
    }
  };

  const renderVideo = (library_id: string, video_id: string) => {
    const videoUrl = `https://iframe.mediadelivery.net/embed/${library_id}/${video_id}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`;
    return (
      <WebView
        source={{ uri: videoUrl }}
        style={styles.video}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
      />
    );
  };
  return (
    <View style={styles.wrapper}>
      {activeTab == "Bimestre" && (
        <View style={[styles.container, { marginBottom: 20 }]}>
          {datavideo && renderVideo(datavideo.library_id!, datavideo.video_id!)}
        </View>
      )}
      <View style={styles.tabsContainer}>
        {["Bimestre", "Libro", "Quizz"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: "auto" }}>{renderTabContent(activeTab)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: withOpacity("#FFFFFF", 0.5),
    borderColor: "#FFFFFF",
    borderWidth: 1,
    alignItems: "center",
    height: 50,
  },
  activeTab: {
    backgroundColor: withOpacity("#00b4d8", 0.3),
    borderColor: "#00b4d8",
    borderWidth: 1,
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200, // puedes ajustar este tamaño
  },
});

export default TabSelector;


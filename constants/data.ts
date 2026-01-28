import { AreaType, GradoType, NivelType } from "@/store/auth/cursos_types";

export const GRADOS : Record<GradoType, number> ={
    "4to Grado": 1,
    "5to Grado": 2,
    "6to Grado": 3,
    "1ro Año": 4,
    "2do Año": 5,
    "3ro Año": 6,
    "4to Año": 7,
    "5to Año": 8,
    "Pre Universitario": 9
} 

export const NIVELES : Record<NivelType, number> ={
    "Primaria": 1,
    "Secundaria": 2,
    "Pre Universitario": 3
} 

export const AREAS : Record<AreaType, number> ={
    "Matemáticas": 1,
    "Ciencia y Tecnología": 2
}
export interface VersionCurso {
  id: string
  nombre: string
  slug: any
  descripcion: string
  libroUrl: any
  urlqr: any
  fechaInicio: any
  fechaFin: any
  modalidadId: string
  cursoId: string
  estado: string
  horario: any
  maximo_alumnos: any
  estado_activo: boolean
  link_whatsapp: any
  createdAt: string
  updatedAt: string
  curso: Curso
  progreso: Progreso
  bimestres: Bimestre[]
}

export interface Curso {
  id: string
  nombre: string
  descripcion: string
  slug: any
  creditos: number
  gradoId: number
  areaId: number
  urlPortada: string
  urlVideo: string
  linkBrochure: string
  imagen: string[]
  colores: Colores
  createdAt: string
  updatedAt: string
}

export interface Colores {
  text: string
  accent: string
  primary: string
  secondary: string
  background: string
}

export interface Progreso {
  total_contenidos: number
  contenidos_vistos: number
  porcentaje_progreso: number
}

export interface Bimestre {
  bimestre: number
  modulos: Modulo[]
}

export interface Modulo {
  id: string
  titulo: string
  descripcion: string
  orden: number
  bimestre: number
  page: number
  urlVideo: any
  versionCursoId: string
  createdAt: string
  updatedAt: string
  progreso: Progreso2
  grupos: Grupo[]
}

export interface Progreso2 {
  total_contenidos: number
  contenidos_vistos: number
  porcentaje_progreso: number
}

export interface Grupo {
  grupo: string
  contenido: Contenido[]
}

export interface Contenido {
  id: number
  modulo_id: string
  titulo: string
  nombre?: string
  orden: number
  tipo: string
  grupo: string
  page?: number
  evaluacion_id?: number
  key?: string
  mimetype: any
  library_id?: string
  collection_id?: string
  video_id?: string
  urlVideo?: string
  createdAt: string
  updatedAt: string
  visto: boolean
  fecha_visto?: string
}

export interface VersionCursoUsuarioResponse {
  version_curso_usuario_id: string;
  activo: boolean;
  progress: number;
  stars: number;
  isSeen: boolean;
  modalidad_id: string;
  version_curso_id: string;
  version_curso_nombre: string;
  version_curso_descripcion: string;
  curso_id: string;
  curso_nombre: string;
  curso_descripcion: string;
  url_portada: string;
  url_video: string;
  grado_id: number;
  grado_nombre: string;
  grado_descripcion: any;
  nivel_id: number;
  nivel_nombre: string;
  area_id: number;
  area_nombre: string;
  colores: Colores;
}


export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Grado {
  id: number;
  nombre: string;
  descripcion: string | null;
  nivelId: number;
}


export type GradoType = '4to Grado' | '5to Grado' | '6to Grado' | '1ro Año' | '2do Año' | '3ro Año' | '4to Año' | '5to Año' | 'Pre Universitario';

export type NivelType = 'Primaria' | 'Secundaria' | 'Pre Universitario';

export type AreaType = 'Matemáticas' | 'Ciencia y Tecnología';

export type CursoNombreType = 'Aritmética' | 'Trigonometría' | 'Geometría' | 'Álgebra' | 'Razonamiento matemático' | 'Física' | 'Química'
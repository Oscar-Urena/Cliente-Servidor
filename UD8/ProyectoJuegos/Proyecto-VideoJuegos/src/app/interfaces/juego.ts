export interface Juego {
    id: number,
    titulo: string,
    genero: string,
    plataforma: string,
    anio: string,
    precio: number,
    rating: number,
    desarrollador: string,
    descripcion: string,
    estado: 'Disponible' | 'Agotado' | 'Descontinuado',
    imagen: string
}

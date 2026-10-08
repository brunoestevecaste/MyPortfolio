export type DigitalPortraitMotion = "dither" | "ascii" | "pixels" | "halftone";
export type PortraitMotion = "original" | "scan" | "echo" | "raster" | "micro" | "particles" | DigitalPortraitMotion;
export type PortraitPreview = "auto" | "idle" | "active";

export const portraitProposals: {
  id: PortraitMotion;
  name: string;
  character: string;
  idle: string;
  active: string;
  exit: string;
}[] = [
  {
    id: "dither", name: "Dithering", character: "Textura binaria. Mi recomendación para esta nueva dirección.",
    idle: "La fotografía se mantiene nítida y una banda de dithering recorre la silueta.",
    active: "Los píxeles ganan contraste y una onda de señal responde al cursor.",
    exit: "Vuelve la fotografía nítida y el dithering se recoge en una banda de lectura.",
  },
  {
    id: "ascii", name: "ASCII", character: "Tu fotografía reconstruida con caracteres.",
    idle: "El rostro permanece fotográfico y una banda de caracteres recorre la silueta.",
    active: "El retrato pasa completamente a ASCII y una onda roja responde al cursor.",
    exit: "Los caracteres se estabilizan y se funden de nuevo con la fotografía.",
  },
  {
    id: "pixels", name: "Mosaico", character: "Resolución y reconstrucción digital.",
    idle: "La fotografía sigue siendo clara mientras una banda de píxeles recorre sus filas.",
    active: "Los bloques crecen y algunas filas se desplazan al paso de la señal.",
    exit: "Los bloques vuelven a ser más finos y se alinean con el retrato.",
  },
  {
    id: "halftone", name: "Semitono", character: "Entre impresión editorial y procesamiento digital.",
    idle: "El rostro se ve nítido y una banda de puntos recorre la fotografía.",
    active: "Los puntos ganan tamaño y contraste alrededor del cursor.",
    exit: "La trama recupera su escala y vuelve a mezclarse con la fotografía.",
  },
  {
    id: "particles", name: "Partículas", character: "Pequeñas emisiones que salen de la silueta.",
    idle: "La fotografía permanece intacta mientras pequeños puntos salen del contorno continuamente.",
    active: "Las partículas se apartan suavemente alrededor del cursor sin interrumpir su emisión.",
    exit: "Los puntos recuperan su trayectoria y continúan saliendo de la silueta.",
  },
  {
    id: "scan", name: "Escáner", character: "Barrido más visible, con el mismo gesto preciso.",
    idle: "Una banda de lectura visible recorre el retrato cada pocos segundos.",
    active: "El barrido cede a una banda roja que sigue la altura del cursor.",
    exit: "La línea se desvanece y reaparece el barrido continuo.",
  },
  {
    id: "echo", name: "Eco de registro", character: "Profundidad sin efecto 3D.",
    idle: "Dos registros monocromos oscilan y se desalinean suavemente.",
    active: "Los ecos se separan más y siguen el movimiento del cursor.",
    exit: "Los registros vuelven a alinearse suavemente con el retrato.",
  },
  {
    id: "raster", name: "Trama digital", character: "La opción más gráfica.",
    idle: "Una trama de puntos visible pulsa lentamente sobre la silueta.",
    active: "La trama gana presencia y se desplaza con el cursor.",
    exit: "La textura recupera su intensidad tenue sin reiniciar el pulso.",
  },
  {
    id: "micro", name: "Microglitch", character: "El gesto más tecnológico.",
    idle: "Una banda del retrato se desplaza unos píxeles entre pulsos de señal.",
    active: "Las bandas se ensanchan y producen desplazamientos más marcados.",
    exit: "La interferencia se disuelve y vuelve la señal en reposo.",
  },
  {
    id: "original", name: "Glitch actual", character: "Referencia para comparar.",
    idle: "El retrato permanece quieto.",
    active: "El glitch actual, con la zona sensible ajustada a la silueta.",
    exit: "La imagen vuelve directamente al reposo.",
  },
];

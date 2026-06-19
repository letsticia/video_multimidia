export interface ColorFilterDef {
  id: "none" | "red" | "blue" | "green" | "gray";
  label: string;
  /** filtro CSS aplicado diretamente no elemento <video> */
  cssFilter: string;
  /** cor usada numa camada sobreposta com mix-blend-mode: color (null = sem camada) */
  overlayColor: string | null;
  /** cor/gradiente usado só para desenhar o botão de seleção */
  swatch: string;
}

export const FILTERS: ColorFilterDef[] = [
  {
    id: "none",
    label: "Sem cor",
    cssFilter: "none",
    overlayColor: null,
    swatch: "linear-gradient(135deg, #e63946, #1d6fe1, #2dc653)",
  },
  {
    id: "red",
    label: "Tom de vermelho",
    cssFilter: "grayscale(1)",
    overlayColor: "#e0212f",
    swatch: "#e0212f",
  },
  {
    id: "blue",
    label: "Tom de azul",
    cssFilter: "grayscale(1)",
    overlayColor: "#1d6fe1",
    swatch: "#1d6fe1",
  },
  {
    id: "green",
    label: "Tom de verde",
    cssFilter: "grayscale(1)",
    overlayColor: "#1d9c4a",
    swatch: "#1d9c4a",
  },
  {
    id: "gray",
    label: "Tom de cinza",
    cssFilter: "grayscale(1)",
    overlayColor: null,
    swatch: "#9a9a9a",
  },
];

export type FilterId = ColorFilterDef["id"];

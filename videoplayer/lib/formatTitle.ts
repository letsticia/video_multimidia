/**
 * Converte o nome de um arquivo de vídeo em um título legível.
 *
 * Exemplos:
 *   "this_is_an_example.mp4"  -> "This is an example"
 *   "minha-viagem-2024.webm"  -> "Minha viagem 2024"
 *   "FÉRIAS_NA_PRAIA.mov"     -> "Férias na praia"
 */
export function formatTitle(filename: string): string {
  // Remove a extensão (.mp4, .webm, .mov, etc.)
  const withoutExtension = filename.replace(/\.[^/.]+$/, "");

  // Troca underscores e hifens por espaços, normaliza espaços duplicados
  const spaced = withoutExtension
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!spaced) return filename;

  // Capitaliza apenas a primeira letra da frase
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

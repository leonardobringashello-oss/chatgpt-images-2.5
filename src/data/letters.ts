// Map of letter -> image variants downloaded to public/assets/letters
// The second line, "ChatGPT Images 2.5," is the interactive one (the first, "Introducing," is plain text).
// OpenAI convention: -1 / -2 are two styles that cycle on each hover.

export interface LetterVariants {
  char: string;
  images: string[];
  alt: string;
  // Altura de la imagen en hover, en em. Por defecto 0.88 (altura de letra).
  // El punto es una carita pequeña: debe medir como un punto, no como un dígito.
  imgH?: number;
}

const L = (char: string, images: string[], alt: string, imgH?: number): LetterVariants => ({
  char,
  // BASE_URL termina en '/': '/' en dev, '/<repo>/' en build para GitHub Pages
  images: images.map((f) => `${import.meta.env.BASE_URL}assets/letters/${f}`),
  alt,
  ...(imgH ? { imgH } : {}),
});

export const CHAT_GPT: LetterVariants[] = [
  L('C', ['Custom_C-1.png', 'Custom_C-2.png'], 'Letter C shaped like a Golden Retriever and a handwritten C.'),
  L('h', ['Custom_h-1.png'], 'Letter h shaped like a plastic worm'),
  L('a', ['Custom_a-1-1.png'], 'Letter a on a toasted piece of bread with butter'),
  // lowercase 't' from "Chat": silver balloon + orange origami (original names crossed)
  L('t', ['Custom_T-2.png', 't-v2.webp'], 'Letter t on a balloon and in origami'),
  L('G', ['Custom_g-1.png', 'Custom_g-2.png'], 'Letter G of diamonds and neon light'),
  L('P', ['Custom_P-1.png', 'Custom_P-2.png'], 'Letter P of flowers'),
  // Final uppercase "T" in "ChatGPT": glitter (the file is named t-1 due to an initial error)
  L('T', ['Custom_t-1.png'], 'Letter T of holographic glitter'),
];

export const IMAGES_WORD: LetterVariants[] = [
  L('I', ['Custom_I-1.png'], 'Letter I with the shape of a classical column'),
  L('m', ['Custom_M-1.png', 'Custom_M-2.png'], 'Letter m balloon and floral'),
  L('a', ['Custom_a-1.png', 'Custom_a-2.png'], 'Letter a of baseball and post-it notes'),
  L('g', ['Custom_lowerg-1.png', 'Custom_lowerg-2.png'], 'Letter g typographic and tattooed'),
  L('e', ['Custom_e-1.png', 'Custom_e-2.png'], 'Letter e of particles'),
  L('s', ['Custom_s-1.png'], 'Letter s'),
];

export const VERSION_PART: LetterVariants[] = [
  L('2', ['Custom_2-1.png', 'Custom_2-2.png'], 'Number 2 in a hot air balloon and in LED'),
  L('.', ['Custom_period.png'], 'Period', 0.24),
  L('5', ['Custom5-1.png', 'Custom5-2.png'], 'Number 5'),
];

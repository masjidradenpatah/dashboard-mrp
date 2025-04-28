export const imageFolders = ['/folder', 'profile', '/programs'] as const;
export type ImageFolder = typeof imageFolders[number];
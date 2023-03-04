export function generateProfilePicPath(
  file: Express.Multer.File | undefined
): string {
  if (file) {
    const SPLIT_SLASH =
      process.env.USE_BACKSLASH_FOR_FILES_PATH === 'true' ? '\\' : '/';
    const fullPathArray = file.path.split(SPLIT_SLASH);
    fullPathArray.shift();
    return '/' + fullPathArray.join('/');
  }
  return '';
}

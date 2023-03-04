export function generateProfilePicPath(
  file: Express.Multer.File | undefined
): string {
  if (file) {
    const fullPathArray = file.path.split('/');
    fullPathArray.shift();
    return '/' + fullPathArray.join('/');
  }
  return '';
}

export default function generateCode() {
  const code = [
    generateRamdomNumberFrom0To99(),
    generateRamdomNumberFrom0To99(),
    generateRamdomNumberFrom0To99(),
  ];
  return code;
}

export function generateRamdomNumberFrom0To99() {
  return Math.floor(Math.random() * 100);
}

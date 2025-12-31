export function gerarULIDManual() {
  // Base Crockford para ULID
  const BASE32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const tempo = Date.now();
  let ulid = "";

  // Tempo (48 bits -> 10 caracteres)
  let time = tempo;
  for (let i = 0; i < 10; i++) {
    ulid = BASE32[time % 32] + ulid;
    time = Math.floor(time / 32);
  }

  // Entropia (80 bits -> 16 caracteres)
  for (let i = 0; i < 16; i++) {
    ulid += BASE32[Math.floor(Math.random() * 32)];
  }

  return ulid;
}

console.log(gerarULIDManual());

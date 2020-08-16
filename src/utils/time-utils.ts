
export function easyTimeFormat(timeMilis: number) {
  const seconds = Math.floor(timeMilis / 1000);
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = Math.floor(timeMilis / 1000 - minutes * 60);
  return `${minutes}:${('0' + leftSeconds.toString()).slice(-2)}`;
}
export default function shuffleArray<T>(array: T[]) {
  const temp = [...array];

  let currentIndex = temp.length;
  let indexToShuffle;
  while (currentIndex != 0) {
    indexToShuffle = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [temp[currentIndex], temp[indexToShuffle]] = [
      temp[indexToShuffle],
      temp[currentIndex],
    ];
  }

  return temp;
}

export const colors = [
  "bg-[#eb4034]",
  "bg-[#c6eb34]",
  "bg-[#3486eb]",
  "bg-[#3443eb]",
  "bg-[#8f34eb]",
  "bg-[#34eb3a]",
];

function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export default getRandomColor;

export const formatDuration = (durationInMs) => {
  const durationInSeconds = Math.floor(durationInMs / 1000);
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} год`);
  if (minutes > 0) parts.push(`${minutes} хв`);
  parts.push(`${seconds} сек`);

  return parts.join(' ');
}; 
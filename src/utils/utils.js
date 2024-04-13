import { decode } from 'he';

export function filterTitle(title) {
  const decodedTitle = decode(title);
  const filteredTitle = decodedTitle.replace(/\s*\(*\b\d{1,2}\s*[-:×]\s*\d{1,2}\b\)*\s*(?=\s|$)|\s*\b\d{1,2}\s*x\s*\d{1,2}\b\s*|\s+/g, ' ').trim();
  const withoutPenalties = filteredTitle.replace(/\s*\[\d+-\d+\]-\[ Penalties\]$/, '');
  const withoutScore = withoutPenalties.replace(/\s*\[\d+-\d+\]$/, '');
  const withoutResult = withoutScore.replace(/\s*\d+\s*×\s*\d+\s*$/, '');
  const finalTitle = withoutResult.replace(/\s{2,}/g, ' ');
  return finalTitle;
}

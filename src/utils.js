// utils.js
import { decode } from 'he';

export function filterTitle(title) {
  const decodedTitle = decode(title);
  return decodedTitle.replace(/\s*\(*\b\d{1,2}\s*[-:]\s*\d{1,2}\b\)*\s*(?=\s|$)/g, '');
}
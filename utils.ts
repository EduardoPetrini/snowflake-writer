import { randomInt } from 'crypto';

const adjectives = ['Amazing', 'Incredible', 'Fantastic', 'Extraordinary', 'Magnificent', 'Remarkable', 'Spectacular', 'Wondrous', 'Astonishing', 'Marvelous'];
const nouns = ['Adventure', 'Discovery', 'Journey', 'Experience', 'Expedition', 'Quest', 'Voyage', 'Exploration', 'Odyssey', 'Venture'];
const verbs = ['Explore', 'Discover', 'Uncover', 'Reveal', 'Unveil', 'Investigate', 'Examine', 'Analyze', 'Study', 'Research'];
const topics = ['Nature', 'Technology', 'Science', 'Art', 'History', 'Culture', 'Innovation', 'Creativity', 'Knowledge', 'Wisdom'];

export const randomNumber = (): number => {
  return Math.floor(Math.random() * 10000);
};

export const getRandomElement = (arr: string[]): string => {
  return arr[randomInt(arr.length)];
};

export const generateFakeTitleAndDescription = (): [string, string] => {
  const title = `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;

  const description = `${getRandomElement(verbs)} the wonders of ${getRandomElement(topics)} in this ${getRandomElement(adjectives).toLowerCase()} ${getRandomElement(nouns).toLowerCase()}. 
    Embark on a journey that will ${getRandomElement(verbs).toLowerCase()} your understanding of ${getRandomElement(topics).toLowerCase()} and leave you 
    with a new appreciation for the ${getRandomElement(adjectives).toLowerCase()} world around us.`;

  return [title, description];
};

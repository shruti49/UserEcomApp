const mySentence = 'freeCodeCamp is an awesome resource';

export const capitalize = str => {
  const words = str.split(' ');

  words
    .map(word => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};

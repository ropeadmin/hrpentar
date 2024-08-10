export const sliceText = (number: number, text: any) => {
  if (typeof text !== 'undefined' && text !== null) {
    return text.slice(0, number) + (text.length > number ? '...' : '');
  } else {
    return ''; // Return an empty string if text is undefined or null
  }
};

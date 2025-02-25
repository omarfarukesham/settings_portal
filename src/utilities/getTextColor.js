const getTextColor = (backgroundColor) => {
  // Convert the background color to RGB
  const rgb = backgroundColor.match(/\d+/g);
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);

  // Calculate the relative luminance using the formula for color contrast
  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

  // Return a dark color if the background is light, and a light color if the background is dark
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

export default getTextColor;

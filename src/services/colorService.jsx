const formatColor = (color = '#000000') => {
  if (color.length === 7) {
    return color;
  } else {
    return (
      '#' +
      Array.from(color)
        .slice(1)
        .map(c => c + c)
        .join('')
    );
  }
};

export default formatColor;

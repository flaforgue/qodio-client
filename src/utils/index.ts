const getColor = (data: number[], opacity = 1): string => {
  return `rgba(${data.join(',')}, ${opacity})`;
};

export { getColor };

const lineColors = {
  Red: { primary: '#FF0000', lighter: '#ffdfdf' },
  Blue: { primary: '#0000FF', lighter: '#CCCCFF' },
  Orange: { primary: '#ee9b00', lighter: '#fff6d9' },
  'Green-B': { primary: '#008000', lighter: '#dcffdc' },
  'Green-C': { primary: '#008000', lighter: '#dcffdc' },
  'Green-D': { primary: '#008000', lighter: '#dcffdc' },
  'Green-E': { primary: '#008000', lighter: '#dcffdc' },
  Bus: { primary: 'purple', lighter: '#edd7fa' },
};

const getColorsFromVehicleId = (id) => {
  return lineColors[id] ? lineColors[id] : lineColors.Bus;
};

export default getColorsFromVehicleId;

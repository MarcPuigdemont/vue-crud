import formatColor from '@/services/colorService.jsx';

describe('ColorService', () => {
  test('formatColor should return black if no color is given', () => {
    expect(formatColor()).toEqual('#000000');
  });
  test('formatColor should return the same color if a valid color is given', () => {
    expect(formatColor('#F138A4')).toEqual('#F138A4');
  });
  test('formatColor should return the an expanded color if an hex color with only 3 components is given', () => {
    expect(formatColor('#af3')).toEqual('#aaff33');
  });
});

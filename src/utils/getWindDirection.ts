export function getWindDirection(degrees: number) {
  if (degrees >= 0 && degrees <= 360) {
    const directions = [
      'North',
      'North-East',
      'East',
      'South-East',
      'South',
      'South-West',
      'West',
      'North-West'
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
  return 'Unknown';
}

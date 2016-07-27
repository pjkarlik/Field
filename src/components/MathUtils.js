/* eslint no-param-reassign: 0 */
export function fastfloor(x) {
  return x << 0; // x > 0 ? x : x - 1;
}

export function fade(t) {
  // This eases coordinate values
  // so that they will ease towards integral values.
  // This ends up smoothing the final output.
  // 6t^5 - 15t^4 + 10t^3
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Linear interpolation - lerp(transform, vector0/start, vector1/amt)
export function lerp(t, a, b) {
  // Imprecise method which does not guarantee v = v1 when t = 1, due to floating-point arithmetic error.
  // return a + t * (b - a);
  // Precise method which guarantees v = v1 when t = 1
  return (1 - t) * a + t * b;
}

export function scale(n) {
  return (1 + n) / 2;
}

export function dist(a, b, c, d) {
  return Math.sqrt(((a - c) * (a - c) + (b - d) * (b - d)));
}

export function getRotation(x1, y1, x2, y2) {
  return Math.atan2(y1 - y2, x1 - x2);
}

export function modus(vector, size) {
  const mod = vector - (vector % size);
  return (mod < 0) ? 0 : mod;
}

export function getLength(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function normalize(vector) {
  const normal = this.getLength();
  vector.x /= normal;
  vector.y /= normal;
}

export function getDeg(vector1, vector2) {
  const squareVector1 = getLength(vector1);
  const squareVector2 = getLength(vector2);
  const angleRad = Math.acos((vector1.x * vector2.x + vector1.y * vector2.y) / (squareVector1 * squareVector2));
  return angleRad * 180 / Math.PI;
}

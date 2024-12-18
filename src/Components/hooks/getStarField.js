import * as THREE from "three";

const getStarfield = ({ numStars = 500 }) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(numStars * 3);

  for (let i = 0; i < numStars; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);
    positions.set([x, y, z], i * 3);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xffffff });
  return new THREE.Points(geometry, material);
};

export default getStarfield;

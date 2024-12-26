import React, { forwardRef } from 'react';

export const Planet = forwardRef(({ planetName, Component, initialPosition }, ref) => {
  return (
    <group position={[initialPosition.x, initialPosition.y, initialPosition.z]} ref={ref}>
      <Component />
    </group>
  );
});
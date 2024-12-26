import { useThree } from "@react-three/fiber";
import getStarfield from "./hooks/getStarField";
import { useEffect } from "react";

export const StarField = () => {
    const { scene } = useThree();
    useEffect(() => {
      const starfield = getStarfield({ numStars: 1000 });
      scene.add(starfield);
  
      return () => {
        scene.remove(starfield);
        starfield.geometry.dispose();
        starfield.material.dispose();
      };
    }, [scene]);
  
    return null;
  };
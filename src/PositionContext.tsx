import { createContext, ReactNode, useContext, useState } from "react";

const PositionContext = createContext<number[]>([]);

const PositionProvider = ({ children }: { children: ReactNode }) => {
  const [positions, setPositions] = useState<{ [key: string]: number[] }>({
    // foe: [0, 4],
    hero: [8, 4],
  });

  const updatePosition = (name: string, position: number[]) => {
    setPositions((prev) => ({ ...prev, [name]: position }));
  };

  return (
    <PositionContext.Provider value={{ positions, updatePosition }}>
      {children}
    </PositionContext.Provider>
  );
};

export const usePositions = () => useContext(PositionContext);
export default PositionProvider;

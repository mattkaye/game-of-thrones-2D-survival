import { createContext, ReactNode, useContext, useState } from "react";

const PositionContext = createContext({});

const PositionProvider = ({ children }: { children: ReactNode }) => {
  const [positions, setPositions] = useState<{ [key: string]: number[] }>({
    hero: [8, 4],
  });
  const [collision, setCollision] = useState(false);

  const updatePosition = (name: string, position: number[]) => {
    setPositions((prev) => ({ ...prev, [name]: position }));
  };

  return (
    <PositionContext.Provider
      value={{ positions, updatePosition, collision, setCollision }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export const usePositions = () => useContext(PositionContext);
export default PositionProvider;

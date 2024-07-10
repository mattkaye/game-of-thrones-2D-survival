import { useRef } from "react";

export const Foe = ({
  avatarName,
  gridCellWidth,
}: {
  avatarName: string;
  gridCellWidth: number;
}) => {
  const avatarWrapper = useRef<HTMLDivElement>(null);

  return (
    <div className="avatar foe z-10" ref={avatarWrapper}>
      <img className="rounded-full" src={`/${avatarName}.jpg`} />
    </div>
  );
};

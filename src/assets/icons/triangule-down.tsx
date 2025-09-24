import TriangleUp from "./triangle-up";

interface TriangleDownProps {
  className: string;
  color: string;
}

const TriangleDown = ({ className, color }: TriangleDownProps) => (
  <TriangleUp className={`rotate-180 ${className}`} color={color} />
);

export default TriangleDown;

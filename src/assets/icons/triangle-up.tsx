interface TriangleUpProps {
  className: string;
  color: string;
}

const TriangleUp = ({ className, color }: TriangleUpProps) => {
  console.log(color);

  return (
    <div className={`${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="10"
        fill="none"
        viewBox="0 0 30 15"
      >
        <path className={`${color} transition-colors`} d="m15 0 14.722 15H.278z"></path>
      </svg>
    </div>
  );
};

export default TriangleUp;

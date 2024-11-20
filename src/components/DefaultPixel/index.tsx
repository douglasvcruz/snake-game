type DefaultPixelProps = {
  key: number;
  className?: string;
};

export default function DefaultPixel({ key, className }: DefaultPixelProps) {
  return (
    <div key={key} className={`border border-[#78a87a] ${className}`}></div>
  );
}

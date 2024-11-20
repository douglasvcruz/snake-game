import DefaultPixel from "../DefaultPixel";

export default function Apple({ key }: { key: number }) {
  return <DefaultPixel key={key} className="box-apple" />;
}

interface TagsProps {
  text: string;
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger";
}
export default function Tags({ text, type = "default" }: TagsProps) {
  const colors = {
    primary: "bg-palette1 text-palette2",
    secondary: "bg-palette2 text-palette1",
    tertiary: "bg-palette5 text-palette4",
    success: "bg-green-900 text-green-200",
    warning: "bg-yellow-900 text-yellow-200",
    danger: "bg-red-900 text-red-200",
  };

  return (
    <span className={`p-1 m-1 text-xs rounded-md font-bold ${colors[type]}`}>
      {text}
    </span>
  );
}

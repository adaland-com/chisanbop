export interface HandProps {
  value: number;
  label?: string;
  interactive?: boolean;
  onToggle?: (index: number) => void;
  keys?: string[];
}
import "../css/Spinner.css";

import type { ReactNode } from "react";

interface SpinnerProps {
  children?: ReactNode;
}

const Spinner = ({ children }: SpinnerProps) => (
  <div>
    <div className="loader"></div>
    <div className="spinner-text">{children || "Зареждане..."}</div>
  </div>
);

export default Spinner;

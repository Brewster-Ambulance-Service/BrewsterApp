import { createPortal } from "react-dom";
import Aurora from "./Aurora";

export default function AuroraLayer(props) {
  // Mount the aurora at <body> level so no parent transform/overflow can clip it
  return createPortal(
    <div className="aurora-fixed" aria-hidden="true">
      <Aurora {...props} />
    </div>,
    document.body
  );
}

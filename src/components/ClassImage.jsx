import { useState } from "react";

function ClassImage({ src, alt, category }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className="image-fallback">{category} class (image not available)</div>;
  }

  return <img className="class-image" src={src} alt={alt} onError={() => setFailed(true)} />;
}

export default ClassImage;

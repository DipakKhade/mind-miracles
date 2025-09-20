"use client";

import { useEffect, useRef } from "react";

export default function CertificatePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const draw = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = "/cert.jpeg"; 
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.font = "bold 60px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText("Dipak Khade", img.width / 2.4, 1075);

        ctx.font = "60px Arial";
        ctx.textAlign = "left";
        ctx.fillText("CERT-123456", 900, img.height- 380);
      };
    };

    draw();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

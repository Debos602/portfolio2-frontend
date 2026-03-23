import React, { useEffect, useRef } from "react";

export default function StarCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animId;

        const NUM_STARS = 200;
        const SPEED = 0.5;
        const FOCAL = 400;

        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const stars = Array.from({ length: NUM_STARS }, () => ({
            x: (Math.random() - 0.5) * W * 3,
            y: (Math.random() - 0.5) * H * 3,
            z: Math.random() * W,
            pz: 0,
            color: randomStarColor(),
        }));

        function randomStarColor() {
            const palette = ["#ff6ec7", "#00f5ff", "#ffe066", "#c77dff", "#ffffff", "#ffffff"];
            return palette[Math.floor(Math.random() * palette.length)];
        }

        function draw() {
            ctx.fillStyle = "rgba(2, 2, 18, 0.3)";
            ctx.fillRect(0, 0, W, H);

            for (let s of stars) {
                s.pz = s.z;
                s.z -= SPEED * (1 + s.z / 1200);
                if (s.z <= 0) {
                    s.x = (Math.random() - 0.5) * W * 3;
                    s.y = (Math.random() - 0.5) * H * 3;
                    s.z = W;
                    s.pz = s.z;
                    s.color = randomStarColor();
                }

                const sx = (s.x / s.z) * FOCAL + W / 2;
                const sy = (s.y / s.z) * FOCAL + H / 2;
                const px = (s.x / s.pz) * FOCAL + W / 2;
                const py = (s.y / s.pz) * FOCAL + H / 2;

                const size = Math.max(0.3, (1 - s.z / W) * 2.5);
                const alpha = Math.min(1, (1 - s.z / W) * 1.4);

                ctx.lineWidth = size;
                ctx.strokeStyle = s.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(sx, sy, size * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            animId = requestAnimationFrame(draw);
        }

        draw();

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
            aria-hidden="true"
        />
    );
}

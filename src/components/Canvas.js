import React, { useRef, useEffect } from "react";
import {LossFunction, ActivationFunction, NeuralNetwork} from "../models"
import "./Canvas.css";

const Canvas = ({ num_of_nodes }) => {
   
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();

    const baseRadius = 25;
    const padding = 20;
    const startX = 30;
    const startY = 30;

    let visibleNodes = num_of_nodes;
    let multiplier = 1;

    if (num_of_nodes > 15) {
      visibleNodes = 5;
      multiplier = Math.ceil(num_of_nodes / visibleNodes);
    }

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < visibleNodes; i++) {
        const y = startY + i * (2 * baseRadius + padding);
        const scale = 1 + 0.1 * Math.sin(angle + i * 0.5);
        const pulsingRadius = baseRadius * scale;

        ctx.beginPath();
        ctx.arc(startX, y, pulsingRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#2e9cf7";
        ctx.fill();
        ctx.stroke();
      }

      if (multiplier > 1) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        const labelY = startY + visibleNodes * (2 * baseRadius + padding) + 5;
        ctx.fillText(`×${multiplier}`, startX, labelY);
      }

      angle += 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [num_of_nodes]);

  return <canvas ref={canvasRef} className="node-canvas" />;
};

export default Canvas;

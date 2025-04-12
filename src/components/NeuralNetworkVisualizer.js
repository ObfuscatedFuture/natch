import React from "react";

export default function NeuralNetworkVisualizer({ layers }) {
  const layerGap = 200;
  const nodeGap = 60;
  const nodeRadius = 15;

  const getMaxNodes = () => Math.max(...layers);

  const getNodePosition = (layerIndex, nodeIndex) => {
    const x = layerIndex * layerGap + nodeRadius * 2;
    const totalNodes = layers[layerIndex];
    const height = getMaxNodes() * nodeGap;
    const yOffset = (height - totalNodes * nodeGap) / 2 + nodeGap / 2;
    const y = nodeIndex * nodeGap + yOffset + nodeRadius;
    return { x, y };
  };

  const width = layers.length * layerGap + 100;
  const height = getMaxNodes() * nodeGap + 100;

  return (
    <svg width={width} height={height} className="bg-white">
      {/* Draw connections */}
      {layers.map((nodeCount, layerIndex) => {
        if (layerIndex === layers.length - 1) return null;
        return Array.from({ length: nodeCount }).flatMap((_, nodeIndex) => {
          const from = getNodePosition(layerIndex, nodeIndex);
          return Array.from({ length: layers[layerIndex + 1] }).map((_, nextNodeIndex) => {
            const to = getNodePosition(layerIndex + 1, nextNodeIndex);
            return (
              <line
                key={`line-${layerIndex}-${nodeIndex}-${nextNodeIndex}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="gray"
                strokeWidth={1}
              />
            );
          });
        });
      })}

      {/* Draw nodes */}
      {layers.map((nodeCount, layerIndex) => (
        <g key={`layer-${layerIndex}`}>
          {Array.from({ length: nodeCount }).map((_, nodeIndex) => {
            const { x, y } = getNodePosition(layerIndex, nodeIndex);
            return (
              <circle
                key={`node-${layerIndex}-${nodeIndex}`}
                cx={x}
                cy={y}
                r={nodeRadius}
                fill="skyblue"
                stroke="black"
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

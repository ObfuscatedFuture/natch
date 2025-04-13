import React from "react";

const layerGap = 200;
const nodeGap = 60;
const nodeRadius = 15;
export default function NeuralNetworkVisualizer({ nnObj }) {

/**
* 
* @param {number} numNodes 
* @param {string} activationFunction 
*/
  const getLayers = () => nnObj.layers.map(x => x.numNodes).concat([nnObj.outputSize])
  const getIcons = () => nnObj.layers.map(x => x.activationFunction)

  /*
  export const ActivationFunction = Object.freeze({
    RELU: "ReLu",
    SIGMOID: "Sigmoid",
    TANH: "Tanh",
    SOFTMAX: "Softmax",
    GELU: "Gelu"
})
  */

  const getMaxNodes = () => Math.max(...getLayers());

  const getNodePosition = (layerIndex, nodeIndex) => {
    const x = layerIndex * layerGap + nodeRadius * 2;
    const totalNodes = getLayers()[layerIndex];
    const height = getMaxNodes() * nodeGap;
    const yOffset = (height - totalNodes * nodeGap) / 2 + nodeGap / 2;
    const y = nodeIndex * nodeGap + yOffset + nodeRadius;
    return { x, y };
  };

  const width = getLayers().length * layerGap + 100;
  const height = getMaxNodes() * nodeGap + 100;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}  // Internal coordinate system
      width="100%"                        // Scales to fill parent width
      height="100%"                       // Scales to fill parent height
      className="bg-white"
      preserveAspectRatio="xMidYMid meet" // Keeps aspect ratio centered
    >
      {/* Draw connections */}
      {getLayers().map((nodeCount, layerIndex) => {
        if (layerIndex === getLayers().length - 1) return null;
        return Array.from({ length: nodeCount }).flatMap((_, nodeIndex) => {
          const from = getNodePosition(layerIndex, nodeIndex);
          return Array.from({ length: getLayers()[layerIndex + 1] }).map((_, nextNodeIndex) => {
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
      {getLayers().map((nodeCount, layerIndex) => (
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
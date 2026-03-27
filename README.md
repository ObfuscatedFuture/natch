
# Natch: Visual Neural Network Builder

Created for Bitcamp 2025

[[Video Overview]](https://www.instagram.com/reel/DVdrfc3FKTb/?igsh=MWF3Zjh1dXk4czRlcg%3D%3D)

# Overview
Natch is a block-based interface for building and understanding neural networks. Inspired by Scratch, it lets users drag and drop blocks to define layers, parameters, and functions, then generates clean PyTorch code and a visual representation of the model.

Our goal was to make deep learning more approachable for beginners by focusing on how networks work, not just how to write the code.

## Inspiration
We were inspired by how Scratch makes programming visual and intuitive. Machine learning can feel abstract, so we wanted to build something that makes it easier to see what’s happening inside a neural network.
We were also influenced by tools that visualize data packets and other low-level processes. Visualizations in computer science are rare, and we wanted to explore how they can help people understand key concepts faster.

## Features
- Drag and drop blocks to build a neural network
- Tooltips that explain every function and parameter
- Choose input and output nodes
- Add any number of hidden layers
- Each layer can have its own activation function
- Configure optimizers and loss functions
- Error handling for missing or invalid parameters
- Generates concise, runnable PyTorch code
- Visualizes the network as a connected graph
- Built-in clipboard with copy, paste, undo, redo, and delete
- Copy generated Python code to your clipboard

Tech Stack
- React, JavaScript, CSS
- Blockly (the same engine behind Scratch and Code.org)
- react-syntax-highlighter for displaying Python code

## Development Process
We used Blockly to handle the block logic and React to manage the interface. Most of our time went into getting these two systems to communicate smoothly. We designed the UI around how someone would think through a network, not how they would code it, and focused on making each action immediately visible.

## Challenges
The react-blockly library was poorly documented and introduced a lot of unexpected issues, so we wrote our own integration between React and Blockly.
We also tried embedding a lightweight Jupyter notebook instance for running code, but only public notebooks were supported, so we switched to exporting code that can be run locally.
At one point, we ran into a strange React error that appeared on all but one computer, which slowed down our testing.

## Results
We built a working prototype in about 16 hours over two days. It’s a fully functional block-coding tool with a clean interface, real-time error handling, and visualization. The final project was around 835 lines of code.

## What I Learned
I learned a lot about Blockly and React, especially how to handle complex UI state and component updates. I also improved our understanding of how to teach and visualize machine learning concepts.

Next Steps
- Add support for CNNs and NLP models
- Include templates and example networks for learning
- Allow more customization for optimizers and parameters
- Show activation functions directly in the visualization

Team
- @ObfuscatedFuture
- @VarunSingh87
- @kevinli3633
- @m-jhin

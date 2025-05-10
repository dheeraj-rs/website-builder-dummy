"use client";

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useBuilderStore } from '@/lib/store';
import ComponentNode from './ComponentNode';
import Preview from './Preview';

interface CanvasProps {
  showPreview: boolean;
}

// Define custom node types
const nodeTypes: NodeTypes = {
  custom: ComponentNode,
};

function CanvasContent({ showPreview }: CanvasProps) {
  const { 
    nodes, 
    edges, 
    addNode, 
    setSelectedNode, 
    connectNodes,
    updateNodePosition
  } = useBuilderStore();
  const reactFlowInstance = useReactFlow();
  
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      
      const type = event.dataTransfer.getData('application/reactflow');
      
      if (!type) return;
      
      const component = JSON.parse(type);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      addNode(component, position);
    },
    [reactFlowInstance, addNode]
  );
  
  const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);
  
  const onConnect = useCallback((params: any) => {
    connectNodes(params);
  }, [connectNodes]);
  
  const onNodeDragStop = useCallback((_: React.MouseEvent, node: any) => {
    updateNodePosition(node.id, node.position);
  }, [updateNodePosition]);
  
  if (showPreview) {
    return <Preview />;
  }
  
  return (
    <div className="builder__canvas" onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function Canvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasContent {...props} />
    </ReactFlowProvider>
  );
}
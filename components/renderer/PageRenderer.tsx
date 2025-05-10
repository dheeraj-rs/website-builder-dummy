"use client";

import { Node } from 'reactflow';
import { NodeData } from '@/types/builder';
import { renderComponent } from './ComponentRenderer';

export function renderPreview(nodes: Node<NodeData>[]) {
  // Sort nodes by position (top to bottom)
  const sortedNodes = [...nodes].sort((a, b) => {
    return a.position.y - b.position.y;
  });
  
  return (
    <div style={{ width: '100%' }}>
      {sortedNodes.map((node) => (
        <div key={node.id}>
          {renderComponent(node.data.component)}
        </div>
      ))}
    </div>
  );
}
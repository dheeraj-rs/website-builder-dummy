"use client";

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useBuilderStore } from '@/lib/store';
import { renderComponent } from '@/components/renderer/ComponentRenderer';
import { Trash2, MoveUp, MoveDown } from 'lucide-react';

interface ComponentNodeProps {
  id: string;
  data: any;
}

function ComponentNode({ id, data }: ComponentNodeProps) {
  const { removeNode, moveNodeUp, moveNodeDown } = useBuilderStore();
  const { component, selected } = data;
  
  const styles = { ...component.styles };
  const componentStyle = Object.keys(styles).reduce((acc, key) => {
    const value = styles[key];
    if (key.includes('margin') || key.includes('padding')) {
      if (value !== undefined && value !== null) {
        acc[key] = typeof value === 'number' ? `${value}px` : value;
      }
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
  
  const nodeStyles = {
    ...componentStyle,
    minWidth: '100px',
    minHeight: '40px',
    border: selected ? '2px solid #38B2AC' : '1px solid #CBD5E0',
    position: 'relative' as const,
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    padding: '8px',
    boxSizing: 'border-box' as const,
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNode(id);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    moveNodeUp(id);
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    moveNodeDown(id);
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#38B2AC' }}
        isConnectable={true}
      />
      <div style={nodeStyles}>
        <div 
          style={{ 
            position: 'absolute', 
            top: '-20px', 
            left: '0', 
            right: '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2px 4px',
            backgroundColor: selected ? '#38B2AC' : '#718096',
            color: 'white',
            borderRadius: '4px',
            opacity: 0.9
          }}
        >
          <span style={{ fontSize: '10px' }}>{component.label}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={handleMoveUp}
              style={{ 
                background: 'none',
                border: 'none',
                padding: '2px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <MoveUp size={12} />
            </button>
            <button
              onClick={handleMoveDown}
              style={{ 
                background: 'none',
                border: 'none',
                padding: '2px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <MoveDown size={12} />
            </button>
            <button
              onClick={handleDelete}
              style={{ 
                background: 'none',
                border: 'none',
                padding: '2px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
        
        {renderComponent(component)}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#38B2AC' }}
        isConnectable={true}
      />
    </>
  );
}

export default memo(ComponentNode);
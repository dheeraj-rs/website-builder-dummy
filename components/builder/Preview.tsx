"use client";

import { useBuilderStore } from '@/lib/store';
import { renderPreview } from '@/components/renderer/PageRenderer';
import { ArrowLeft } from 'lucide-react';

export default function Preview() {
  const { nodes } = useBuilderStore();
  
  return (
    <div className="preview">
      <div className="preview__content">
        {nodes.length === 0 ? (
          <div className="flex-center flex-col" style={{ height: '100%' }}>
            <div 
              style={{ 
                fontSize: '24px',
                marginBottom: '16px',
                color: '#A0AEC0'
              }}
            >
              No components added yet
            </div>
            <p style={{ color: '#718096' }}>
              Add components from the sidebar to build your page
            </p>
          </div>
        ) : (
          renderPreview(nodes)
        )}
      </div>
    </div>
  );
}
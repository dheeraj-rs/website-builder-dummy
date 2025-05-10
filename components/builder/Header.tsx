"use client";

import { useState } from 'react';
import { useBuilderStore } from '@/lib/store';
import { 
  Download,
  Save,
  Upload,
  Eye,
  EyeOff,
  Undo,
  Redo,
  Laptop,
  Smartphone,
  Tablet,
  Code
} from 'lucide-react';

interface HeaderProps {
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
}

export default function Header({ showPreview, setShowPreview }: HeaderProps) {
  const { undo, redo, exportToJson, importFromJson } = useBuilderStore();
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const handleExport = () => {
    const json = exportToJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-design.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        importFromJson(content);
      };
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  return (
    <header className="builder__header">
      <div className="flex-between">
        <h1 className="m-0" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
          WebCanvas <span style={{ fontSize: '0.875rem', color: '#718096' }}>Builder</span>
        </h1>
        
        <div className="flex-center" style={{ gap: '0.5rem' }}>
          <button className="btn btn-outline btn-small" onClick={undo}>
            <Undo size={16} />
          </button>
          <button className="btn btn-outline btn-small" onClick={redo}>
            <Redo size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-center" style={{ gap: '0.5rem' }}>
        <div 
          className="flex-center" 
          style={{ 
            padding: '4px', 
            background: '#EDF2F7', 
            borderRadius: '4px',
            marginRight: '16px'
          }}
        >
          <button 
            className={`btn btn-small ${viewMode === 'desktop' ? 'btn-primary' : 'btn-outline'}`}
            style={{ margin: 0, boxShadow: 'none', border: 'none' }}
            onClick={() => setViewMode('desktop')}
          >
            <Laptop size={16} />
          </button>
          <button 
            className={`btn btn-small ${viewMode === 'tablet' ? 'btn-primary' : 'btn-outline'}`}
            style={{ margin: 0, boxShadow: 'none', border: 'none' }}
            onClick={() => setViewMode('tablet')}
          >
            <Tablet size={16} />
          </button>
          <button 
            className={`btn btn-small ${viewMode === 'mobile' ? 'btn-primary' : 'btn-outline'}`}
            style={{ margin: 0, boxShadow: 'none', border: 'none' }}
            onClick={() => setViewMode('mobile')}
          >
            <Smartphone size={16} />
          </button>
        </div>
        
        <button className="btn btn-outline btn-small" onClick={handleImport}>
          <Upload size={16} />
          <span className="ml-2">Import</span>
        </button>
        
        <button className="btn btn-outline btn-small" onClick={handleExport}>
          <Download size={16} />
          <span className="ml-2">Export</span>
        </button>
        
        <button className="btn btn-outline btn-small">
          <Save size={16} />
          <span className="ml-2">Save</span>
        </button>
        
        <button className="btn btn-outline btn-small">
          <Code size={16} />
          <span className="ml-2">Code</span>
        </button>
        
        <button 
          className={`btn ${showPreview ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          <span className="ml-2">{showPreview ? 'Editor' : 'Preview'}</span>
        </button>
      </div>
    </header>
  );
}
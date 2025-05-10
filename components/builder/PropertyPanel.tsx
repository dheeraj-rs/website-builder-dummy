"use client";

import { useState } from 'react';
import { useBuilderStore } from '@/lib/store';
import { styleCategories } from '@/lib/component-library';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

export default function PropertyPanel() {
  const { nodes, selectedNodeId, updateNode } = useBuilderStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(styleCategories.map(category => [category.id, true]))
  );
  
  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  if (!selectedNode) {
    return (
      <div className="builder__panel">
        <div className="p-4">
          <h3 className="m-0 mb-4">Properties</h3>
          <p className="text-center my-8 text-muted">Select a component to edit its properties</p>
        </div>
      </div>
    );
  }
  
  const component = selectedNode.data.component;
  
  const handleStyleChange = (property: string, value: any) => {
    const updatedStyles = {
      ...component.styles,
      [property]: value,
    };
    
    updateNode(selectedNode.id, {
      styles: updatedStyles,
    });
  };
  
  const handlePropChange = (property: string, value: any) => {
    const updatedProps = {
      ...component.props,
      [property]: value,
    };
    
    updateNode(selectedNode.id, {
      props: updatedProps,
    });
  };
  
  const renderPropertyInput = (property: any) => {
    const currentValue = component.styles[property.name] !== undefined 
      ? component.styles[property.name] 
      : property.defaultValue;
    
    switch (property.type) {
      case 'text':
        return (
          <input 
            type="text" 
            value={currentValue} 
            onChange={(e) => handleStyleChange(property.name, e.target.value)}
          />
        );
      case 'number':
        return (
          <input 
            type="number" 
            value={currentValue} 
            onChange={(e) => handleStyleChange(property.name, parseFloat(e.target.value))}
          />
        );
      case 'color':
        return (
          <div className="flex-between">
            <input 
              type="color" 
              value={currentValue} 
              onChange={(e) => handleStyleChange(property.name, e.target.value)}
              style={{ width: '50px', padding: '0', border: 'none' }}
            />
            <input 
              type="text" 
              value={currentValue} 
              onChange={(e) => handleStyleChange(property.name, e.target.value)}
              style={{ width: 'calc(100% - 60px)' }}
            />
          </div>
        );
      case 'select':
        return (
          <select 
            value={currentValue} 
            onChange={(e) => handleStyleChange(property.name, e.target.value)}
          >
            {property.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'range':
        return (
          <div className="flex-between">
            <input 
              type="range" 
              min={property.min} 
              max={property.max} 
              step={property.step} 
              value={currentValue} 
              onChange={(e) => handleStyleChange(property.name, parseFloat(e.target.value))}
              style={{ width: '70%' }}
            />
            <div style={{ width: '30%', textAlign: 'right' }}>
              {currentValue}{property.unit || ''}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const renderContentEditor = () => {
    if (component.type === 'heading' || component.type === 'paragraph') {
      return (
        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea 
            value={component.props.content} 
            onChange={(e) => handlePropChange('content', e.target.value)}
            rows={3}
          />
        </div>
      );
    }
    
    if (component.type === 'button' || component.type === 'link') {
      return (
        <div className="mb-4">
          <label className="block mb-2">Label</label>
          <input 
            type="text" 
            value={component.props.content} 
            onChange={(e) => handlePropChange('content', e.target.value)}
          />
        </div>
      );
    }
    
    if (component.type === 'image') {
      return (
        <>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input 
              type="text" 
              value={component.props.src} 
              onChange={(e) => handlePropChange('src', e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Alt Text</label>
            <input 
              type="text" 
              value={component.props.alt} 
              onChange={(e) => handlePropChange('alt', e.target.value)}
            />
          </div>
        </>
      );
    }
    
    return null;
  };
  
  return (
    <div className="builder__panel">
      <div className="p-4">
        <div className="flex-between mb-4">
          <h3 className="m-0">{component.label} Properties</h3>
          <button className="btn btn-outline btn-small">
            <X size={14} />
          </button>
        </div>
        
        {renderContentEditor()}
        
        {styleCategories.map((category) => (
          <div key={category.id} className="builder__section">
            <div 
              className="flex-between mb-2 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <h4 className="m-0">{category.label}</h4>
              {expandedCategories[category.id] ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </div>
            
            {expandedCategories[category.id] && (
              <div className="p-2">
                {category.properties.map((property) => (
                  <div key={property.name} className="mb-3">
                    <label className="block mb-1 text-sm">{property.label}</label>
                    {renderPropertyInput(property)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
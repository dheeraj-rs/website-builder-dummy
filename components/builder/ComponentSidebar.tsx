"use client";

import { useState } from 'react';
import { useBuilderStore } from '@/lib/store';
import { componentLibrary } from '@/lib/component-library';
import { Category, ComponentDefinition } from '@/types/builder';
import { ChevronDown, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ComponentSidebar() {
  const { addNode } = useBuilderStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(componentLibrary.map(category => [category.id, true]))
  );
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const handleDragStart = (e: React.DragEvent, component: ComponentDefinition) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify(component));
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleComponentClick = (component: ComponentDefinition) => {
    const centerX = window.innerWidth / 2 - 100;
    const centerY = window.innerHeight / 2 - 100;
    addNode(component, { x: centerX, y: centerY });
  };
  
  return (
    <div className="builder__sidebar">
      <div className="p-4">
        <h3 className="m-0 mb-4">Components</h3>
        {componentLibrary.map((category: Category) => (
          <div key={category.id} className="builder__section">
            <div 
              className="flex-between mb-2 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <h4 className="m-0 builder__section-title">
                {category.label}
              </h4>
              {expandedCategories[category.id] ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </div>
            
            {expandedCategories[category.id] && (
              <div className="p-2">
                {category.components.map((component) => {
                  const IconComponent = Icons[component.icon as keyof typeof Icons];
                  
                  return (
                    <div
                      key={component.id}
                      className="builder__component"
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                      onClick={() => handleComponentClick(component)}
                    >
                      <div className="flex-between">
                        <span>{component.label}</span>
                        {IconComponent && <IconComponent size={16} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
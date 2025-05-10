"use client";

import { useState } from 'react';
import Header from './Header';
import ComponentSidebar from './ComponentSidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';

export default function Builder() {
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <div className="builder">
      <Header 
        showPreview={showPreview} 
        setShowPreview={setShowPreview} 
      />
      <div className="builder__main">
        <ComponentSidebar />
        <Canvas showPreview={showPreview} />
        <PropertyPanel />
      </div>
    </div>
  );
}
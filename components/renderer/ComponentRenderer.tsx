"use client";

import { ComponentDefinition } from '@/types/builder';
import Image from 'next/image';

export function renderComponent(component: ComponentDefinition) {
  const { type, props, styles } = component;
  
  // Apply styles to all components
  const componentStyles = { ...styles };
  
  switch (type) {
    case 'container':
      return (
        <div style={componentStyles}>
          {component.children?.map((child) => renderComponent(child))}
          {!component.children?.length && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#A0AEC0' }}>
              Container (Drop components here)
            </div>
          )}
        </div>
      );
      
    case 'row':
      return (
        <div style={componentStyles}>
          {component.children?.map((child) => renderComponent(child))}
          {!component.children?.length && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#A0AEC0' }}>
              Row (Drop columns here)
            </div>
          )}
        </div>
      );
      
    case 'column':
      return (
        <div style={componentStyles}>
          {component.children?.map((child) => renderComponent(child))}
          {!component.children?.length && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#A0AEC0' }}>
              Column
            </div>
          )}
        </div>
      );
      
    case 'card':
      return (
        <div style={componentStyles}>
          {component.children?.map((child) => renderComponent(child))}
          {!component.children?.length && (
            <div style={{ padding: '16px', textAlign: 'center', color: '#A0AEC0' }}>
              Card Content
            </div>
          )}
        </div>
      );
      
    case 'heading':
      const HeadingTag = (props.level || 'h2') as keyof JSX.IntrinsicElements;
      return <HeadingTag style={componentStyles}>{props.content}</HeadingTag>;
      
    case 'paragraph':
      return <p style={componentStyles}>{props.content}</p>;
      
    case 'list':
      const ListTag = (props.type || 'ul') as 'ul' | 'ol';
      return (
        <ListTag style={componentStyles}>
          {props.items?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ListTag>
      );
      
    case 'image':
      return (
        <img 
          src={props.src} 
          alt={props.alt || ''} 
          style={componentStyles} 
        />
      );
      
    case 'video':
      return (
        <video 
          src={props.src} 
          controls={props.controls} 
          autoPlay={props.autoplay} 
          loop={props.loop} 
          muted={props.muted} 
          style={componentStyles}
        />
      );
      
    case 'button':
      return (
        <button style={componentStyles}>
          {props.content}
        </button>
      );
      
    case 'link':
      return (
        <a href={props.href} style={componentStyles}>
          {props.content}
        </a>
      );
      
    case 'input':
      return (
        <input 
          type={props.type || 'text'} 
          placeholder={props.placeholder || ''} 
          style={componentStyles} 
        />
      );
      
    case 'textarea':
      return (
        <textarea 
          placeholder={props.placeholder || ''} 
          rows={props.rows || 4} 
          style={componentStyles} 
        />
      );
      
    case 'checkbox':
      return (
        <div style={componentStyles}>
          <input 
            type="checkbox" 
            id={component.id} 
            checked={props.checked || false} 
            readOnly 
          />
          <label 
            htmlFor={component.id} 
            style={{ marginLeft: '8px' }}
          >
            {props.label}
          </label>
        </div>
      );
      
    default:
      return <div>Unknown component type: {type}</div>;
  }
}
import { Category, StyleCategory, StyleProperty } from '@/types/builder';

// Define style properties
const typography: StyleProperty[] = [
  {
    name: 'fontSize',
    label: 'Font Size',
    type: 'range',
    defaultValue: 16,
    min: 8,
    max: 72,
    step: 1,
    unit: 'px'
  },
  {
    name: 'fontWeight',
    label: 'Font Weight',
    type: 'select',
    defaultValue: 'normal',
    options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']
  },
  {
    name: 'lineHeight',
    label: 'Line Height',
    type: 'range',
    defaultValue: 1.5,
    min: 0.5,
    max: 3,
    step: 0.1
  },
  {
    name: 'textAlign',
    label: 'Text Align',
    type: 'select',
    defaultValue: 'left',
    options: ['left', 'center', 'right', 'justify']
  },
  {
    name: 'color',
    label: 'Text Color',
    type: 'color',
    defaultValue: '#333333'
  },
  {
    name: 'textTransform',
    label: 'Text Transform',
    type: 'select',
    defaultValue: 'none',
    options: ['none', 'uppercase', 'lowercase', 'capitalize']
  }
];

const spacing: StyleProperty[] = [
  {
    name: 'marginTop',
    label: 'Margin Top',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'marginRight',
    label: 'Margin Right',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'marginBottom',
    label: 'Margin Bottom',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'marginLeft',
    label: 'Margin Left',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'paddingTop',
    label: 'Padding Top',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'paddingRight',
    label: 'Padding Right',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'paddingBottom',
    label: 'Padding Bottom',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'paddingLeft',
    label: 'Padding Left',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  }
];

const appearance: StyleProperty[] = [
  {
    name: 'backgroundColor',
    label: 'Background Color',
    type: 'color',
    defaultValue: 'transparent'
  },
  {
    name: 'backgroundImage',
    label: 'Background Image',
    type: 'text',
    defaultValue: 'none'
  },
  {
    name: 'backgroundSize',
    label: 'Background Size',
    type: 'select',
    defaultValue: 'cover',
    options: ['auto', 'cover', 'contain']
  },
  {
    name: 'borderWidth',
    label: 'Border Width',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 20,
    step: 1,
    unit: 'px'
  },
  {
    name: 'borderStyle',
    label: 'Border Style',
    type: 'select',
    defaultValue: 'solid',
    options: ['none', 'solid', 'dashed', 'dotted', 'double']
  },
  {
    name: 'borderColor',
    label: 'Border Color',
    type: 'color',
    defaultValue: '#000000'
  },
  {
    name: 'borderRadius',
    label: 'Border Radius',
    type: 'range',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  },
  {
    name: 'boxShadow',
    label: 'Box Shadow',
    type: 'text',
    defaultValue: 'none'
  },
  {
    name: 'opacity',
    label: 'Opacity',
    type: 'range',
    defaultValue: 1,
    min: 0,
    max: 1,
    step: 0.01
  }
];

const layout: StyleProperty[] = [
  {
    name: 'display',
    label: 'Display',
    type: 'select',
    defaultValue: 'block',
    options: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none']
  },
  {
    name: 'position',
    label: 'Position',
    type: 'select',
    defaultValue: 'static',
    options: ['static', 'relative', 'absolute', 'fixed', 'sticky']
  },
  {
    name: 'zIndex',
    label: 'Z-Index',
    type: 'number',
    defaultValue: 'auto'
  },
  {
    name: 'width',
    label: 'Width',
    type: 'text',
    defaultValue: 'auto'
  },
  {
    name: 'height',
    label: 'Height',
    type: 'text',
    defaultValue: 'auto'
  },
  {
    name: 'minWidth',
    label: 'Min Width',
    type: 'text',
    defaultValue: '0'
  },
  {
    name: 'maxWidth',
    label: 'Max Width',
    type: 'text',
    defaultValue: 'none'
  },
  {
    name: 'minHeight',
    label: 'Min Height',
    type: 'text',
    defaultValue: '0'
  },
  {
    name: 'maxHeight',
    label: 'Max Height',
    type: 'text',
    defaultValue: 'none'
  }
];

export const styleCategories: StyleCategory[] = [
  {
    id: 'layout',
    label: 'Layout',
    properties: layout
  },
  {
    id: 'typography',
    label: 'Typography',
    properties: typography
  },
  {
    id: 'spacing',
    label: 'Spacing',
    properties: spacing
  },
  {
    id: 'appearance',
    label: 'Appearance',
    properties: appearance
  }
];

// Define component library
export const componentLibrary: Category[] = [
  {
    id: 'sections',
    label: 'Sections',
    components: [
      {
        id: 'hero',
        type: 'container',
        label: 'Hero Section',
        icon: 'layout',
        props: {
          className: 'hero'
        },
        styles: {
          width: '100%',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 32px',
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        },
        children: []
      },
      {
        id: 'features',
        type: 'container',
        label: 'Features Section',
        icon: 'layoutGrid',
        props: {
          className: 'features'
        },
        styles: {
          width: '100%',
          padding: '80px 32px',
          backgroundColor: '#ffffff'
        },
        children: []
      },
      {
        id: 'testimonials',
        type: 'container',
        label: 'Testimonials',
        icon: 'quote',
        props: {
          className: 'testimonials'
        },
        styles: {
          width: '100%',
          padding: '80px 32px',
          backgroundColor: '#f8fafc'
        },
        children: []
      },
      {
        id: 'pricing',
        type: 'container',
        label: 'Pricing Section',
        icon: 'creditCard',
        props: {
          className: 'pricing'
        },
        styles: {
          width: '100%',
          padding: '80px 32px',
          backgroundColor: '#ffffff'
        },
        children: []
      },
      {
        id: 'cta',
        type: 'container',
        label: 'Call to Action',
        icon: 'megaphone',
        props: {
          className: 'cta'
        },
        styles: {
          width: '100%',
          padding: '64px 32px',
          backgroundColor: '#1e293b',
          color: '#ffffff'
        },
        children: []
      }
    ]
  },
  {
    id: 'layout',
    label: 'Layout',
    components: [
      {
        id: 'container',
        type: 'container',
        label: 'Container',
        icon: 'square',
        props: {
          className: 'container'
        },
        styles: {
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px'
        },
        children: []
      },
      {
        id: 'row',
        type: 'row',
        label: 'Row',
        icon: 'layoutGrid',
        props: {
          className: 'row'
        },
        styles: {
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: '-16px',
          marginRight: '-16px'
        },
        children: []
      },
      {
        id: 'column',
        type: 'column',
        label: 'Column',
        icon: 'layoutColumns',
        props: {
          className: 'column',
          size: 6
        },
        styles: {
          flex: '0 0 50%',
          maxWidth: '50%',
          padding: '0 16px'
        },
        children: []
      }
    ]
  },
  {
    id: 'components',
    label: 'Components',
    components: [
      {
        id: 'card',
        type: 'card',
        label: 'Card',
        icon: 'squareStack',
        props: {
          className: 'card'
        },
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '16px'
        },
        children: []
      },
      {
        id: 'testimonial',
        type: 'card',
        label: 'Testimonial Card',
        icon: 'quote',
        props: {
          className: 'testimonial'
        },
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          marginBottom: '24px',
          textAlign: 'center'
        },
        children: []
      },
      {
        id: 'pricing-card',
        type: 'card',
        label: 'Pricing Card',
        icon: 'creditCard',
        props: {
          className: 'pricing-card'
        },
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          marginBottom: '24px',
          textAlign: 'center',
          border: '2px solid #e2e8f0'
        },
        children: []
      }
    ]
  },
  {
    id: 'typography',
    label: 'Typography',
    components: [
      {
        id: 'heading',
        type: 'heading',
        label: 'Heading',
        icon: 'heading1',
        props: {
          level: 'h2',
          content: 'Section Heading'
        },
        styles: {
          fontSize: '36px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          marginBottom: '16px',
          color: '#1e293b'
        }
      },
      {
        id: 'subheading',
        type: 'heading',
        label: 'Subheading',
        icon: 'heading2',
        props: {
          level: 'h3',
          content: 'Subheading Text'
        },
        styles: {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '1.4',
          marginBottom: '16px',
          color: '#475569'
        }
      },
      {
        id: 'paragraph',
        type: 'paragraph',
        label: 'Paragraph',
        icon: 'text',
        props: {
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        styles: {
          fontSize: '16px',
          lineHeight: '1.6',
          marginBottom: '16px',
          color: '#64748b'
        }
      }
    ]
  },
  {
    id: 'media',
    label: 'Media',
    components: [
      {
        id: 'image',
        type: 'image',
        label: 'Image',
        icon: 'image',
        props: {
          src: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
          alt: 'Image description',
          width: 400,
          height: 300
        },
        styles: {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          marginBottom: '16px'
        }
      },
      {
        id: 'video',
        type: 'video',
        label: 'Video',
        icon: 'video',
        props: {
          src: '',
          controls: true,
          autoplay: false,
          loop: false,
          muted: false
        },
        styles: {
          width: '100%',
          borderRadius: '8px',
          marginBottom: '16px'
        }
      }
    ]
  },
  {
    id: 'buttons',
    label: 'Buttons',
    components: [
      {
        id: 'primary-button',
        type: 'button',
        label: 'Primary Button',
        icon: 'buttonSquare',
        props: {
          content: 'Get Started',
          variant: 'primary'
        },
        styles: {
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '16px',
          transition: 'all 0.2s ease-in-out'
        }
      },
      {
        id: 'secondary-button',
        type: 'button',
        label: 'Secondary Button',
        icon: 'buttonSquare',
        props: {
          content: 'Learn More',
          variant: 'secondary'
        },
        styles: {
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: 'transparent',
          color: '#3b82f6',
          borderRadius: '6px',
          border: '2px solid #3b82f6',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '16px',
          transition: 'all 0.2s ease-in-out'
        }
      }
    ]
  },
  {
    id: 'form',
    label: 'Form',
    components: [
      {
        id: 'input',
        type: 'input',
        label: 'Text Input',
        icon: 'formInput',
        props: {
          placeholder: 'Enter your email',
          type: 'text'
        },
        styles: {
          width: '100%',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '2px solid #e2e8f0',
          fontSize: '16px',
          marginBottom: '16px',
          transition: 'all 0.2s ease-in-out'
        }
      },
      {
        id: 'textarea',
        type: 'textarea',
        label: 'Textarea',
        icon: 'formTextarea',
        props: {
          placeholder: 'Enter your message',
          rows: 4
        },
        styles: {
          width: '100%',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '2px solid #e2e8f0',
          fontSize: '16px',
          marginBottom: '16px',
          resize: 'vertical',
          transition: 'all 0.2s ease-in-out'
        }
      }
    ]
  }
];
export interface ComponentDefinition {
  id: string;
  type: string;
  label: string;
  icon: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  children?: ComponentDefinition[];
}

export interface Category {
  id: string;
  label: string;
  components: ComponentDefinition[];
}

export interface NodeData {
  component: ComponentDefinition;
  selected: boolean;
}

export interface EditorState {
  nodes: any[];
  edges: any[];
  selectedNodeId: string | null;
  zoom: number;
  history: {
    past: EditorSnapshot[];
    future: EditorSnapshot[];
  };
}

export interface EditorSnapshot {
  nodes: any[];
  edges: any[];
}

export interface StyleProperty {
  name: string;
  label: string;
  type: 'text' | 'number' | 'color' | 'select' | 'range';
  defaultValue: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface StyleCategory {
  id: string;
  label: string;
  properties: StyleProperty[];
}
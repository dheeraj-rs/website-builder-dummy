import { create } from 'zustand';
import { 
  NodeData, 
  EditorState, 
  EditorSnapshot, 
  ComponentDefinition 
} from '@/types/builder';
import { 
  Node, 
  Edge, 
  addEdge, 
  MarkerType, 
  Connection 
} from 'reactflow';

const initialNodes: Node<NodeData>[] = [];
const initialEdges: Edge[] = [];

interface BuilderStore extends EditorState {
  addNode: (component: ComponentDefinition, position: { x: number, y: number }) => void;
  updateNode: (id: string, data: Partial<ComponentDefinition>) => void;
  removeNode: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  updateNodePosition: (id: string, position: { x: number, y: number }) => void;
  connectNodes: (params: Connection) => void;
  setZoom: (zoom: number) => void;
  moveNodeUp: (id: string) => void;
  moveNodeDown: (id: string) => void;
  undo: () => void;
  redo: () => void;
  saveSnapshot: () => void;
  setNodesAndEdges: (nodes: Node<NodeData>[], edges: Edge[]) => void;
  exportToJson: () => string;
  importFromJson: (json: string) => void;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,
  zoom: 1,
  history: {
    past: [],
    future: []
  },
  
  addNode: (component, position) => {
    const id = `${component.type}-${Date.now()}`;
    const newNode: Node<NodeData> = {
      id,
      type: 'custom',
      position,
      data: {
        component: { ...component, id },
        selected: false
      }
    };
    
    set((state) => {
      const newNodes = [...state.nodes, newNode];
      return { nodes: newNodes };
    });
    
    get().saveSnapshot();
  },
  
  updateNode: (id, data) => {
    set((state) => {
      const newNodes = state.nodes.map(node => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              component: {
                ...node.data.component,
                ...data
              }
            }
          };
        }
        return node;
      });
      return { nodes: newNodes };
    });
    
    get().saveSnapshot();
  },
  
  removeNode: (id) => {
    set((state) => {
      const newNodes = state.nodes.filter(node => node.id !== id);
      const newEdges = state.edges.filter(
        edge => edge.source !== id && edge.target !== id
      );
      return { 
        nodes: newNodes, 
        edges: newEdges,
        selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId 
      };
    });
    
    get().saveSnapshot();
  },
  
  setSelectedNode: (id) => {
    set(state => ({
      selectedNodeId: id,
      nodes: state.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          selected: node.id === id
        }
      }))
    }));
  },
  
  updateNodePosition: (id, position) => {
    set((state) => {
      const newNodes = state.nodes.map(node => {
        if (node.id === id) {
          return {
            ...node,
            position
          };
        }
        return node;
      });
      return { nodes: newNodes };
    });
  },
  
  moveNodeUp: (id) => {
    set((state) => {
      const nodes = [...state.nodes];
      const index = nodes.findIndex(node => node.id === id);
      if (index > 0) {
        const temp = nodes[index];
        nodes[index] = nodes[index - 1];
        nodes[index - 1] = temp;
      }
      return { nodes };
    });
    get().saveSnapshot();
  },

  moveNodeDown: (id) => {
    set((state) => {
      const nodes = [...state.nodes];
      const index = nodes.findIndex(node => node.id === id);
      if (index < nodes.length - 1) {
        const temp = nodes[index];
        nodes[index] = nodes[index + 1];
        nodes[index + 1] = temp;
      }
      return { nodes };
    });
    get().saveSnapshot();
  },
  
  connectNodes: (params) => {
    if (!params.source || !params.target) return;
    
    const newEdge = {
      id: `edge-${params.source}-${params.target}`,
      source: params.source,
      target: params.target,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    
    set((state) => {
      const newEdges = addEdge(newEdge, state.edges);
      return { edges: newEdges };
    });
    
    get().saveSnapshot();
  },
  
  setZoom: (zoom) => {
    set({ zoom });
  },
  
  saveSnapshot: () => {
    const { nodes, edges } = get();
    
    set((state) => ({
      history: {
        past: [...state.history.past, { nodes, edges }],
        future: []
      }
    }));
  },
  
  undo: () => {
    const { history } = get();
    
    if (history.past.length === 0) return;
    
    const newPast = [...history.past];
    const snapshot = newPast.pop();
    
    if (!snapshot) return;
    
    set((state) => ({
      nodes: snapshot.nodes,
      edges: snapshot.edges,
      history: {
        past: newPast,
        future: [{ nodes: state.nodes, edges: state.edges }, ...history.future]
      }
    }));
  },
  
  redo: () => {
    const { history } = get();
    
    if (history.future.length === 0) return;
    
    const newFuture = [...history.future];
    const snapshot = newFuture.shift();
    
    if (!snapshot) return;
    
    set((state) => ({
      nodes: snapshot.nodes,
      edges: snapshot.edges,
      history: {
        past: [...history.past, { nodes: state.nodes, edges: state.edges }],
        future: newFuture
      }
    }));
  },
  
  setNodesAndEdges: (nodes, edges) => {
    set({ nodes, edges });
    get().saveSnapshot();
  },
  
  exportToJson: () => {
    const { nodes, edges } = get();
    return JSON.stringify({ nodes, edges }, null, 2);
  },
  
  importFromJson: (json) => {
    try {
      const { nodes, edges } = JSON.parse(json);
      set({ nodes, edges });
      get().saveSnapshot();
    } catch (error) {
      console.error('Failed to import JSON:', error);
    }
  }
}));
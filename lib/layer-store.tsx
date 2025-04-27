import { createStore } from "zustand/vanilla";
import { StoreApi, useStore } from "zustand";
import React, { useContext } from "react";
import { persist, createJSONStorage } from "zustand/middleware";
import { Layers } from "lucide-react";

export const createZustandContext = <TInitial, TStore extends StoreApi<any>>(
  getStore: (initial: TInitial) => TStore
) => {
  const Context = React.createContext(null as any as TStore);

  const Provider = (props: {
    children?: React.ReactNode;
    initialValue: TInitial;
  }) => {
    const [store] = React.useState(getStore(props.initialValue));

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  return {
    useContext: () => React.useContext(Context),
    Context,
    Provider,
  };
};

export type Layer = {
  publicId?: string;
  width?: number;
  height?: number;
  url?: string;
  id: string;
  name?: string;
  format?: string;
  poster?: string;
  resourceType?: string;
  transcriptionURL?: string;
};

type State = {
  layers: Layer[];
  activeLayer: Layer;
  layerComparsionMode: boolean;
  comparedLayers:string[];
  addLayer: (layer: Layer) => void;
  removeLayer: (id: string) => void;
  setActiveLayer: (id: string) => void;
  updateLayer: (layer: Layer) => void;
  setPoster: (id: string, posterUrl: string) => void;
  setTranscriptions: (id: string, transcriptionURL: string) => void;
  setLayerComparsionMode: (mode: boolean) => void;
  setComparedLayer: (layers: string[] ) => void;
  toggleComparedLayer: (id : string) => void;
};

const getStore = (initialState: {
  layers: Layer[];
  layerComparsionMode: boolean;
}) => {
  return createStore<State>()(
    persist(
      (set) => ({
        layers: initialState.layers,
        activeLayer: initialState.layers[0],
        layerComparsionMode: initialState.layerComparsionMode,
        comparedLayers:[],      
        addLayer: (layer) =>
          set((state) => ({
            layers: [...state.layers, { ...layer }],
          })),
        removeLayer: (id) =>
          set((state) => ({
            layers: state.layers.filter((l) => l.id !== id),
          })),
        setActiveLayer: (id) =>
          set((state) => ({
            activeLayer: state.layers.find(
              (l) => l.id === id || state.layers[0]
            ),
          })),
        updateLayer: (layer) =>
          set((state) => ({
            layers: state.layers.map((l) => (l.id === layer.id ? layer : l)),
          })),
        setPoster: (id, postUrl) =>
          set((state) => ({
            layers: state.layers.map((l) =>
              l.id === id ? { ...l, poster: postUrl } : l
            ),
          })),
        setTranscriptions: (id, transcriptionURL) =>
          set((state) => ({
            layers: state.layers.map((l) =>
              l.id === id ? { ...l, transcriptionURL } : l
            ),
          })),
          setLayerComparsionMode:(mode) => set(() => ({
            layerComparsionMode:mode,
            comparedLayers: mode ? [] : []
          })),
          setComparedLayer: (layers) => set(() => ({
            comparedLayers: layers,
            layerComparsionMode:layers.length > 0
          })),
          toggleComparedLayer: (id) => set((state) => {
            const newComparedLayer = state.comparedLayers.includes(id) ? 
            state.comparedLayers.filter((layerId) => layerId !== id): 
            [...state.comparedLayers, id].slice(-2)
            return{
              comparedLayers:newComparedLayer,
              layerComparsionMode:newComparedLayer.length > 0
            }
          })

      }),
      {
        name: "layers-storage",
      }
    )
  );
};

const layerStore = createZustandContext(getStore)

export function useLayerzStore<T>(selector: (state: State) => T) {
  const store = React.useContext(layerStore.Context);
  if (!store) {
    throw new Error("Missing LayerStore provider");
  }
  return useStore(store, selector);
}

export const LayerStoreProvider = layerStore.Provider
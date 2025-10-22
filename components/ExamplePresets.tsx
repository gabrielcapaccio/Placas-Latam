
import React from 'react';

// Base64 encoded placeholder images
const urban1 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI2MjYyNiIvPjxwYXRoIGQ9Ik0xMCA5MFYxMEg5MFY5MFpNNDAgOTBWMzBINTBWOTBaTTcwIDkwVjUwSDgwVjkwWiIgZmlsbD0iIzRjNWM3ZSIvPjwvc3ZnPg==';
const urban2 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzFlMmIzMCIvPjxwYXRoIGQ9Ik0wIDUwTDUwIDEwMEwxMDAgNTBMMTAgMEwwIDUwWiIgZmlsbD0iI2E4NWRmZiIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSIjZjRiYzQ3Ii8+PC9zdmc+';
const neon1 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzEwMDAyMCIvPjx0ZXh0IHg9IjUwIiB5PSI1OCIgZm9udC1zaXplPSIzMCIgZmlsbD0iI2ZmMGRjZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgc3R5bGU9InRleHQtc2hhZG93OiAwIDAgMTBweCAjZmYwMGRjZSI+TmVvbjwvdGV4dD48L3N2Zz4=';
const watercolor1 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImciPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MGI1ZGYiIHN0b3Atb3BhY2l0eT0iMC41Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmFhOGM3IiBzdG9wLW9wYWNpdHk9IjAuNSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjcwIiByPSIzMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';
const watercolor2 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImgiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNiMmVjZGIiIHN0b3Atb3BhY2l0eT0iMC42Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5YWE3IiBzdG9wLW9wYWNpdHk9IjAuNiIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjRmN2Y4Ii8+PGVsbGlwc2UgY3g9IjUwIiBjeT0iNTUiIHJ4PSI0MCIgcnk9IjMwIiBmaWxsPSJ1cmwoI2gpIi8+PC9zdmc+';


export interface Preset {
  name: string;
  images: string[];
  prompt: string;
}

const presets: Preset[] = [
  {
    name: 'Urbano Moderno',
    images: [urban1, urban2],
    prompt: 'Placa de inauguración para una galería de arte contemporáneo en el centro de la ciudad.',
  },
  {
    name: 'Retro Neón',
    images: [neon1],
    prompt: 'Un letrero de neón brillante para un bar de estilo arcade de los años 80.',
  },
  {
    name: 'Acuarela Fantasía',
    images: [watercolor1, watercolor2],
    prompt: 'Ilustración en acuarela de una criatura mítica del bosque para la portada de un libro.',
  },
];

interface ExamplePresetsProps {
  onSelect: (preset: Preset) => void;
}

export const ExamplePresets: React.FC<ExamplePresetsProps> = ({ onSelect }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-300 mb-2">1. Elige un Estilo (Opcional)</h2>
      <p className="text-sm text-gray-500 mb-4">Haz clic en un preset para empezar rápidamente con un estilo predefinido.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelect(preset)}
            className="group relative border-2 border-gray-600 rounded-lg p-3 text-left hover:border-indigo-400 focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <div className="flex items-center gap-3">
                {preset.images.map((img, index) => (
                    <img key={index} src={img} alt={`${preset.name} style ${index + 1}`} className="w-10 h-10 rounded-md object-cover bg-gray-700"/>
                ))}
            </div>
            <h3 className="font-semibold text-gray-200 mt-3">{preset.name}</h3>
            <p className="text-xs text-gray-500 mt-1 truncate group-hover:text-gray-400">{preset.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

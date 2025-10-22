
import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
}

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-400">Tu imagen generada aparecerá aquí</h3>
        <p className="text-sm">Elige un preset o sube tus imágenes y describe lo que quieres crear.</p>
    </div>
);

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-indigo-400">
        <SpinnerIcon className="w-12 h-12 animate-spin mb-4" />
        <h3 className="text-lg font-medium">Generando tu obra maestra...</h3>
        <p className="text-sm text-gray-500">La creatividad de la IA toma un momento.</p>
    </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-4">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium">Ocurrió un Error</h3>
        <p className="text-sm text-gray-500 break-words max-w-full">{error}</p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, generatedImage }) => {
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'placa-generada.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="w-full h-full min-h-[300px] aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-4">
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : generatedImage ? (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <img src={generatedImage} alt="Resultado generado" className="max-w-full max-h-[85%] object-contain rounded-md" />
            <button 
              onClick={handleDownload}
              className="mt-auto flex items-center justify-center gap-2 w-full max-w-xs py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
            >
                <DownloadIcon className="w-5 h-5" />
                Descargar
            </button>
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

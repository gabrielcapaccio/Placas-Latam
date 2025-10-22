import React, { useState, useCallback } from 'react';
import { UploadedFile } from './types';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { generateStyledImage } from './services/geminiService';
import { SpinnerIcon } from './components/icons/SpinnerIcon';

const App: React.FC = () => {
  const [styleImages, setStyleImages] = useState<UploadedFile[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = useCallback(async () => {
    if (!prompt || styleImages.length === 0) {
      setError("Por favor, proporciona una descripción y al menos una imagen de estilo.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateStyledImage({ prompt, styleImages });
      setGeneratedImage(result);
    } catch (err: any)      {
      setError(err.message || "Ocurrió un error desconocido.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, styleImages]);

  const handleClear = () => {
    setStyleImages([]);
    setPrompt('');
    setGeneratedImage(null);
    setError(null);
  };

  const canGenerate = prompt.trim().length > 0 && styleImages.length > 0 && !isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Creador de Placas LATAM
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Crea imágenes únicas mezclando estilos visuales con la potencia de la IA.
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <ImageUploader files={styleImages} onFilesChange={setStyleImages} />
          
          <div>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">2. Describe tu Imagen</h2>
            <p className="text-sm text-gray-500 mb-4">¿Cuál debería ser el sujeto principal de la nueva imagen?</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Placa de Encuesta para Ciudad de Rosario."
              className="w-full h-28 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full flex items-center justify-center py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-5 h-5 mr-3 -ml-1 animate-spin" />
                  Generando...
                </>
              ) : (
                'Crear Placa'
              )}
            </button>
            <button
              onClick={handleClear}
              className="w-full sm:w-auto py-3 px-6 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
            >
              Limpiar Todo
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">3. Resultado</h2>
          <ResultDisplay isLoading={isLoading} error={error} generatedImage={generatedImage} />
        </div>
      </main>
    </div>
  );
};

export default App;

import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import { UploadedFile } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onFilesChange: (files: UploadedFile[]) => void;
  files: UploadedFile[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFilesChange, files }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (newFiles: FileList | null) => {
    if (newFiles) {
      const uploaded = Array.from(newFiles).map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      onFilesChange([...files, ...uploaded]);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];
    URL.revokeObjectURL(removedFile.preview);
    onFilesChange(newFiles);
  };
  
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-300 mb-2">1. Sube Imágenes de Estilo</h2>
      <p className="text-sm text-gray-500 mb-4">Añade una o más imágenes para definir el estilo visual que quieres generar.</p>
      
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full h-40 px-6 transition bg-gray-800 border-2 border-dashed rounded-lg appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none ${isDragging ? 'border-indigo-400' : 'border-gray-600'}`}
      >
        <span className="flex flex-col items-center space-y-2">
          <UploadIcon className="w-10 h-10 text-gray-500" />
          <span className="font-medium text-gray-400">
            Arrastra los archivos para adjuntar, o{' '}
            <span className="text-indigo-400 underline">explora</span>
          </span>
          <span className="text-xs text-gray-500">PNG, JPG, GIF de hasta 10MB</span>
        </span>
        <input
          type="file"
          name="file_upload"
          className="hidden"
          multiple
          accept="image/png, image/jpeg, image/gif"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {files.map((uploadedFile, index) => (
            <div key={index} className="relative group">
              <img
                src={uploadedFile.preview}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 leading-none text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Quitar imagen"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

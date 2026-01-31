
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
  onDownload: (url: string, name: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 transition-all hover:shadow-xl">
      <div className="aspect-[4/3] bg-slate-100 relative group">
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={() => onDownload(image.url, `MCM_Figure_${image.id}.png`)}
            className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100"
          >
            Download High-Res
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 px-2 py-1 bg-indigo-50 rounded">
            {image.category}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(image.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 italic">
          "{image.prompt}"
        </p>
      </div>
    </div>
  );
};

export default ImageCard;

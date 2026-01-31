
import React, { useState } from 'react';
import { generateBatteryImage } from './services/geminiService';
import { GeneratedImage, ImageCategory, PresetPrompt } from './types';
import { PRESET_PROMPTS } from './constants';
import ImageCard from './components/ImageCard';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ImageCategory | 'All'>('All');

  const categories = ['All', ...Object.values(ImageCategory)];

  const filteredPresets = activeCategory === 'All' 
    ? PRESET_PROMPTS 
    : PRESET_PROMPTS.filter(p => p.category === activeCategory);

  const handleGenerate = async (preset: PresetPrompt | string) => {
    const promptText = typeof preset === 'string' ? preset : preset.prompt;
    const categoryText = typeof preset === 'string' ? 'Custom' : preset.category;
    const id = typeof preset === 'string' ? 'custom' : preset.id;

    setLoading(id);
    setError(null);

    try {
      const url = await generateBatteryImage(promptText);
      if (url) {
        const newImage: GeneratedImage = {
          id: Math.random().toString(36).substr(2, 9),
          url,
          prompt: promptText,
          category: categoryText,
          timestamp: Date.now()
        };
        setImages(prev => [newImage, ...prev]);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(null);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f8f9fa]">
      {/* Header - Academic Style */}
      <header className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-slate-800 rounded">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
                <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">MCM Figure Generator</h1>
                <p className="text-slate-500 font-sans text-sm tracking-wide">Science & Nature Journal Aesthetic Library</p>
            </div>
          </div>
          <p className="text-slate-600 max-w-3xl text-lg font-sans">
            针对 2RC 戴维南等效电路模型、集总热平衡及 SOH 演化规律设计的原创高清绘图工具。
            生成风格：<span className="font-semibold text-slate-800 italic">干净、简洁、专业</span>。
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        {/* Preset Selection UI */}
        <section className="mb-12">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as any)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeCategory === cat 
                            ? 'bg-slate-800 text-white border-slate-800' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                        }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPresets.map((preset) => (
                <div 
                    key={preset.id}
                    className="group bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all"
                >
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{preset.category}</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">{preset.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed italic">{preset.description}</p>
                    </div>
                    <button
                        disabled={!!loading}
                        onClick={() => handleGenerate(preset)}
                        className={`w-full py-2.5 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            loading === preset.id 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-slate-900 text-white hover:bg-black active:scale-95'
                        }`}
                    >
                        {loading === preset.id ? 'RENDERING...' : 'GENERATE FIGURE'}
                    </button>
                </div>
                ))}
            </div>
        </section>

        {/* Custom Input */}
        <section className="mb-16 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Prompt Editor</h2>
            <div className="flex flex-col gap-4">
                <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="请输入详细的学术绘图描述，系统将自动调整为 Science/Nature 风格..."
                    className="w-full h-32 p-4 rounded bg-slate-50 border border-slate-200 focus:ring-1 focus:ring-slate-400 outline-none resize-none text-slate-700 font-sans"
                />
                <div className="flex justify-end gap-3">
                    <p className="text-[10px] text-slate-400 flex items-center italic">
                        Style lock: Scientific Journal, Minimalist, Vector Art
                    </p>
                    <button
                        disabled={!!loading || !customPrompt.trim()}
                        onClick={() => handleGenerate(`Scientific journal illustration, ${customPrompt}, white background, matte colors, professional labels, clean vector style, high resolution.`)}
                        className={`px-8 py-3 rounded font-bold text-xs transition-all ${
                            loading === 'custom' || !customPrompt.trim()
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-black active:scale-95 shadow-sm'
                        }`}
                    >
                        {loading === 'custom' ? 'PROCESSING...' : 'EXECUTE CUSTOM GENERATION'}
                    </button>
                </div>
            </div>
            {error && <p className="mt-4 text-rose-500 text-xs font-bold">ERROR: {error}</p>}
        </section>

        {/* Gallery */}
        <section>
          <div className="flex items-baseline justify-between mb-8 border-b border-slate-200 pb-2">
            <h2 className="text-xl font-serif font-bold text-slate-900">Manuscript Figures Gallery</h2>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Archive</p>
          </div>
          
          {images.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-slate-400 text-sm font-sans italic">No figures generated yet. Select a scientific preset above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {images.map((img) => (
                <ImageCard key={img.id} image={img} onDownload={downloadImage} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-20 py-10 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                2026 MCM Problem A Research Tool
            </p>
      </footer>
    </div>
  );
};

export default App;

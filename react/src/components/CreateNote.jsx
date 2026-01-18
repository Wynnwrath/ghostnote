import { useState } from 'react';
import Background from './Background';

export default function CreateNote() {
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState('');
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create_note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content })
      });
      
      const data = await response.json();
      setNoteId(data.note_id);
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to connect to the server.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    const link = `${window.location.origin}/read/${noteId}`;
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <Background>
      <div className="w-full">
        
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500 tracking-tighter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          👻 Ghost Note
        </h1>

        {noteId ? (
          <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-blue-500/30 animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-block p-3 rounded-full bg-green-500/10 text-green-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Note Encrypted</h2>
              <p className="text-slate-400 text-sm mt-2">This link will work exactly once.</p>
            </div>

            <div className="bg-black/50 p-4 rounded-lg mb-6 break-all font-mono text-blue-400 text-sm border border-slate-700">
              {window.location.origin}/read/{noteId}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={copyToClipboard}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
              >
                Copy Link
              </button>
              <button 
                onClick={() => { setNoteId(''); setContent(''); }}
                className="px-6 py-3 border border-slate-600 hover:bg-slate-800/50 text-slate-300 rounded-lg transition-colors"
              >
                New Note
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/80 backdrop-blur-sm p-1 rounded-xl shadow-xl border border-slate-700">
            <textarea
              className="w-full h-64 p-6 bg-transparent rounded-t-lg text-lg text-white placeholder-slate-500 focus:outline-none resize-none"
              placeholder="Write your secret here... It will self-destruct after reading."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
            <div className="bg-slate-900/50 p-4 rounded-b-lg border-t border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                {content.length > 0 ? "Ready to burn" : "Waiting for input..."}
              </span>
              <button
                onClick={createNote}
                disabled={!content.trim() || loading}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  content.trim() 
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Encrypting..." : "Create Link"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
}
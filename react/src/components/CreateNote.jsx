import { useState } from 'react';
import Background from './Background';

export default function CreateNote() {
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState(60); // 1 hour
  const [noteId, setNoteId] = useState('');
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    if (!content.trim()) return;
    setLoading(true);
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    try {
      const response = await fetch(`${API_URL}/create_note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content, duration_minutes: parseInt(duration) })
      });
      const data = await response.json();
      setNoteId(data.note_id);
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to connect to server.");
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
            <h2 className="text-2xl font-bold text-white text-center mb-2">Note Encrypted</h2>
            <p className="text-slate-400 text-sm text-center mb-6">This link expires automatically.</p>
            
            <div className="bg-black/50 p-4 rounded-lg mb-6 break-all font-mono text-blue-400 text-sm border border-slate-700">
              {window.location.origin}/read/{noteId}
            </div>
            
            <div className="flex gap-3">
              <button onClick={copyToClipboard} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors">
                Copy Link
              </button>
              <button onClick={() => { setNoteId(''); setContent(''); }} className="px-6 py-3 border border-slate-600 hover:bg-slate-800/50 text-slate-300 rounded-lg transition-colors">
                New
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/80 backdrop-blur-sm p-1 rounded-xl shadow-xl border border-slate-700">
            <textarea
              className="w-full h-56 p-6 bg-transparent rounded-t-lg text-lg text-white placeholder-slate-500 focus:outline-none resize-none"
              placeholder="Write your secret..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
            
            <div className="bg-slate-900/50 p-4 rounded-b-lg border-t border-slate-700 flex justify-between items-center gap-4">
              
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-slate-800 text-slate-300 text-sm py-2 px-3 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
              >
                <option value="60">1 Hour</option>
                <option value="1440">24 Hours</option>
                <option value="10080">7 Days</option>
              </select>

              <button
                onClick={createNote}
                disabled={!content.trim() || loading}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  content.trim() ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {loading ? "..." : "Create Link"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
}
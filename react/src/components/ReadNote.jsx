import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Background from './Background';

export default function ReadNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [fetching, setFetching] = useState(false);

  const revealNote = async () => {
    if (fetching) return;
    setFetching(true);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/read/${id}`, {
        method: 'POST'
        });
      
      if (!response.ok) {
        throw new Error("Note not found");
      }
      
      const data = await response.json();
      setNote(data.content);
      setRevealed(true);
    } catch (err) {
      setError(true);
      setRevealed(true);
    }
  };

  return (
    <Background>
      <div className="w-full text-center">
        
        {!revealed ? (
          <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-yellow-600/30 shadow-2xl">
            <div className="w-16 h-16 bg-yellow-900/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Self-Destructing Note</h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
              You are about to view note <span className="font-mono text-yellow-500">{id}</span>. 
              <br/><br/>
              Reading this note will <b>permanently destroy it</b> from the server.
            </p>
            <button
              onClick={revealNote}
              disabled={fetching}
              className={`w-full font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(202,138,4,0.3)] ${
                fetching 
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed" 
                  : "bg-yellow-600 hover:bg-yellow-500 text-white"
              }`}
            >
              {fetching ? "Decrypting..." : "Yes, Show Me the Message"}
            </button>
          </div>
        ) : error ? (
          <div className="bg-red-950/30 backdrop-blur-sm p-8 rounded-2xl border border-red-900/50">
            <h1 className="text-4xl mb-4">💨</h1>
            <h2 className="text-2xl font-bold text-red-500 mb-2">Note Not Found</h2>
            <p className="text-slate-400 mb-6">
              This note either never existed or has already been read and destroyed.
            </p>
            <Link to="/" className="text-slate-500 hover:text-white underline">
              Create your own note
            </Link>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] text-left">
              <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-4">
                Message Decrypted
              </p>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-white font-mono whitespace-pre-wrap leading-relaxed">
                  {note}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-slate-500 text-sm mb-4">
                This message has been deleted from the server.
              </p>
              <Link 
                to="/"
                className="inline-block px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
              >
                Create New Note
              </Link>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
}
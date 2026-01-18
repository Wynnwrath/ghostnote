export default function Background({ children }) {
  const ghosts = [
    { size: 'w-12 h-12', left: '10%', delay: '-2s', duration: '15s', opacity: 'opacity-20' },
    { size: 'w-8 h-8',   left: '20%', delay: '-8s', duration: '12s', opacity: 'opacity-10' },
    { size: 'w-20 h-20', left: '85%', delay: '-5s', duration: '20s', opacity: 'opacity-5' }, 
    { size: 'w-10 h-10', left: '40%', delay: '-12s', duration: '18s', opacity: 'opacity-20' },
    { size: 'w-6 h-6',   left: '50%', delay: '-3s', duration: '10s', opacity: 'opacity-30' },
    { size: 'w-14 h-14', left: '60%', delay: '-15s', duration: '22s', opacity: 'opacity-10' },
    { size: 'w-9 h-9',   left: '75%', delay: '-7s', duration: '14s', opacity: 'opacity-20' },
    { size: 'w-11 h-11', left: '30%', delay: '-10s', duration: '16s', opacity: 'opacity-15' },
    { size: 'w-16 h-16', left: '05%', delay: '-18s', duration: '25s', opacity: 'opacity-5' },
    { size: 'w-7 h-7',   left: '95%', delay: '-4s', duration: '13s', opacity: 'opacity-25' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        {ghosts.map((ghost, index) => (
          <div
            key={index}
            className={`absolute bottom-[-100px] text-slate-400 animate-rise ${ghost.size} ${ghost.opacity}`}
            style={{
              left: ghost.left,
              animationDelay: ghost.delay,
              animationDuration: ghost.duration,
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
            >
              <path d="M12 2C7.58 2 4 5.58 4 10v10c0 .55.45 1 1 1 .17 0 .33-.04.47-.12L9 19l3.53 2.12L16.06 19l3.47 1.88c.14.08.3.12.47.12.55 0 1-.45 1-1V10c0-4.42-3.58-8-8-8z" />
              <circle cx="9" cy="9" r="1.5" className="text-slate-900" fill="currentColor" />
              <circle cx="15" cy="9" r="1.5" className="text-slate-900" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg p-4">
        {children}
      </div>
      
    </div>
  );
}
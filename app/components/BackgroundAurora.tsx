export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
      {/* Violet blob — top-left */}
      <div 
        className="absolute top-[5%] left-[-8%] w-[42vw] h-[42vw] rounded-full opacity-[0.08] blur-[50px] animate-blob-one" 
        style={{
          background: "radial-gradient(circle, var(--color-aurora-violet) 0%, rgba(139, 92, 246, 0) 70%)"
        }}
      />
      {/* Magenta blob — mid-right */}
      <div 
        className="absolute top-[38%] right-[-8%] w-[44vw] h-[44vw] rounded-full opacity-[0.07] blur-[55px] animate-blob-two" 
        style={{
          background: "radial-gradient(circle, var(--color-aurora-magenta) 0%, rgba(244, 63, 158, 0) 70%)"
        }}
      />
      {/* Cyan blob — bottom-left */}
      <div 
        className="absolute bottom-[-8%] left-[15%] w-[40vw] h-[40vw] rounded-full opacity-[0.08] blur-[50px] animate-blob-three" 
        style={{
          background: "radial-gradient(circle, var(--color-aurora-cyan) 0%, rgba(34, 211, 238, 0) 70%)"
        }}
      />
    </div>
  );
}

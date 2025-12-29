export default function StarsBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:40px_40px] opacity-18" style={{opacity:0.12}} />
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.03), transparent 10%)'}} />
      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 80% 70%, rgba(255,240,200,0.02), transparent 10%)'}} />
    </div>
  );
}

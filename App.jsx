import React, { useState, useEffect } from 'react';
import { Heart, Wind, Feather, Anchor, Sparkles, ArrowLeft, Send } from 'lucide-react';

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-medium";
  const variants = {
    primary: "bg-stone-800 text-stone-50 hover:bg-stone-700 shadow-md hover:shadow-lg",
    secondary: "bg-stone-200 text-stone-700 hover:bg-stone-300",
    outline: "border border-stone-300 text-stone-600 hover:bg-stone-100",
    ghost: "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-stone-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Screens ---

const WelcomeScreen = ({ setView }) => {
  const emotions = [
    { label: "Overwhelmed", color: "bg-rose-100 text-rose-800", action: 'ground' },
    { label: "Anxious", color: "bg-amber-100 text-amber-800", action: 'breathe' },
    { label: "Heavy", color: "bg-indigo-100 text-indigo-800", action: 'journal' },
    { label: "Disconnected", color: "bg-stone-200 text-stone-800", action: 'ground' },
    { label: "Peaceful", color: "bg-emerald-100 text-emerald-800", action: 'journal' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mt-8">
        <h1 className="text-4xl font-serif text-stone-800">Welcome, beautiful soul.</h1>
        <p className="text-lg text-stone-600 font-light max-w-md mx-auto">
          This is your safe space to pause, feel, and return to your center. Take a deep breath.
        </p>
      </div>

      <Card className="max-w-md mx-auto mt-8">
        <h2 className="text-xl font-medium text-stone-800 mb-6 text-center">What is your heart holding right now?</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {emotions.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => setView(emotion.action)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 ${emotion.color}`}
            >
              {emotion.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

const BreatheScreen = ({ setView }) => {
  const [phase, setPhase] = useState('Inhale');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setPhase((p) => {
            if (p === 'Inhale') return 'Hold';
            if (p === 'Hold') return 'Exhale';
            return 'Inhale';
          });
          // Set duration for next phase
          if (phase === 'Inhale') return 4; // Next is Hold (4s)
          if (phase === 'Hold') return 6;   // Next is Exhale (6s)
          return 4;                         // Next is Inhale (4s)
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const circleStyles = {
    'Inhale': 'scale-150 bg-sky-200/50',
    'Hold': 'scale-150 bg-sky-300/50',
    'Exhale': 'scale-100 bg-sky-100/50'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in relative">
      <Button variant="ghost" className="absolute top-0 left-0" onClick={() => setView('home')} icon={ArrowLeft}>
        Return
      </Button>
      
      <div className="text-center space-y-2 mb-16">
        <h2 className="text-3xl font-serif text-stone-800">The Sacred Breath</h2>
        <p className="text-stone-500 font-light">Allow your nervous system to settle.</p>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {/* Animated breathing circle */}
        <div 
          className={`absolute w-40 h-40 rounded-full transition-all duration-1000 ease-in-out ${circleStyles[phase]}`}
        />
        {/* Core circle */}
        <div className="absolute w-32 h-32 bg-white rounded-full shadow-lg flex flex-col items-center justify-center z-10">
          <span className="text-xl font-medium text-stone-700">{phase}</span>
          <span className="text-stone-400 text-sm">{timer}</span>
        </div>
      </div>
      
      <p className="text-stone-600 max-w-sm text-center italic font-serif">
        "Your breath is the bridge between your body and your spirit."
      </p>
    </div>
  );
};

const JournalScreen = ({ setView }) => {
  const [text, setText] = useState('');
  const [isReleased, setIsReleased] = useState(false);

  const handleRelease = () => {
    if (!text.trim()) return;
    setIsReleased(true);
    setTimeout(() => {
      setText('');
      setIsReleased(false);
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col animate-fade-in relative pt-12">
      <Button variant="ghost" className="absolute top-0 left-0 -ml-4" onClick={() => setView('home')} icon={ArrowLeft}>
        Return
      </Button>

      <div className="space-y-4 mb-8">
        <h2 className="text-3xl font-serif text-stone-800">Sacred Release</h2>
        <p className="text-stone-600 font-light">
          Let it flow without judgment. What needs to be heard today? When you are ready, release it to the universe.
        </p>
      </div>

      {isReleased ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
          <Sparkles className="text-amber-400 w-12 h-12 mb-4 animate-pulse" />
          <h3 className="text-2xl font-serif text-stone-800">Released with love.</h3>
          <p className="text-stone-500">Your energy is lighter now. You are held.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I am feeling..."
            className="w-full flex-1 min-h-[250px] p-6 rounded-3xl bg-white/60 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white resize-none text-stone-700 placeholder-stone-400 font-light text-lg transition-colors"
          />
          <div className="absolute bottom-4 right-4">
            <Button onClick={handleRelease} variant="primary" icon={Send} className="rounded-2xl">
              Release
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const GroundScreen = ({ setView }) => {
  const steps = [
    { num: 5, text: "Things you can see around you.", icon: "👁️" },
    { num: 4, text: "Things you can physically feel.", icon: "🤚" },
    { num: 3, text: "Things you can hear right now.", icon: "👂" },
    { num: 2, text: "Things you can smell.", icon: "👃" },
    { num: 1, text: "Good thing about yourself.", icon: "🤍" },
  ];

  return (
    <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col animate-fade-in relative pt-12">
      <Button variant="ghost" className="absolute top-0 left-0 -ml-4" onClick={() => setView('home')} icon={ArrowLeft}>
        Return
      </Button>

      <div className="text-center space-y-4 mb-10">
        <h2 className="text-3xl font-serif text-stone-800">Return to the Present</h2>
        <p className="text-stone-600 font-light">
          When the mind wanders too far, we gently call it back to the body. Take your time with each step.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-6 transform transition-all duration-500 hover:-translate-y-1"
            style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
          >
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-xl font-serif text-stone-700 shrink-0">
              {step.num}
            </div>
            <p className="text-stone-700 font-medium text-lg flex-1">{step.text}</p>
            <span className="text-2xl opacity-60">{step.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Container ---

export default function App() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'breathe': return <BreatheScreen setView={setView} />;
      case 'journal': return <JournalScreen setView={setView} />;
      case 'ground': return <GroundScreen setView={setView} />;
      default: return <WelcomeScreen setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-rose-200 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500&display=swap');
        
        .font-serif { font-family: 'Lora', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* Header/Nav */}
      <header className="p-6 max-w-4xl mx-auto flex justify-between items-center relative z-20">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <Sparkles className="w-6 h-6 text-rose-300 group-hover:text-rose-400 transition-colors" />
          <span className="font-serif text-xl tracking-wide text-stone-700">Inner Haven</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {renderView()}
      </main>

      {/* Bottom Navigation Menu (Always visible for easy switching) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-20">
        <nav className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-stone-100 p-2 flex justify-between items-center px-4">
          <NavButton active={view === 'home'} onClick={() => setView('home')} icon={Heart} label="Check-in" />
          <NavButton active={view === 'breathe'} onClick={() => setView('breathe')} icon={Wind} label="Breathe" />
          <NavButton active={view === 'journal'} onClick={() => setView('journal')} icon={Feather} label="Release" />
          <NavButton active={view === 'ground'} onClick={() => setView('ground')} icon={Anchor} label="Anchor" />
        </nav>
      </div>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-50/40 rounded-full blur-3xl" />
      </div>
      
      {/* Padding to account for bottom nav */}
      <div className="h-24"></div> 
    </div>
  );
}

const NavButton = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-2xl w-16 transition-all duration-300 ${
      active ? 'text-stone-800 scale-105' : 'text-stone-400 hover:text-stone-600'
    }`}
  >
    <div className={`p-2 rounded-full transition-colors duration-300 ${active ? 'bg-stone-100' : 'bg-transparent'}`}>
      <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
    </div>
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
  </button>
);

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackgroundMusic = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    // Initialize Audio Context on Interaction or Mount (if allowed)
    const initAudioContext = () => {
        if (!audioRef.current || sourceRef.current) return;

        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;

        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        sourceRef.current = source;
        analyserRef.current = analyser;
        setAudioContext(ctx);
    };

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    initAudioContext(); // Try to init if allowed
                } catch (err) {
                    console.log("Autoplay blocked");
                }
            }
        };

        playAudio();

        const handleInteraction = () => {
            if (!hasInteracted) {
                // Initialize context on first click if not already
                if (!audioContext) initAudioContext();

                // Resume context if suspended
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume();
                }

                if (audioRef.current && audioRef.current.paused) {
                    audioRef.current.play().then(() => {
                        setIsPlaying(true);
                        setHasInteracted(true);
                    }).catch(console.error);
                }
            }
        };

        window.addEventListener('click', handleInteraction);
        return () => window.removeEventListener('click', handleInteraction);
    }, [hasInteracted, audioContext]);

    // Visualizer Loop
    useEffect(() => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        let particles: { x: number, y: number, size: number, speed: number, color: string }[] = [];

        // Init Particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height / 2,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 2 + 0.5,
                color: `hsl(${Math.random() * 60 + 40}, 100%, 50%)` // Yellow/Gold range
            });
        }

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);

            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            // Calculate average frequency for "beat"
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Particles flowing with wave
            particles.forEach((p) => {
                p.x -= p.speed;
                if (p.x < 0) p.x = canvas.width;

                // Modulate Y with Sine wave + Frequency
                const wave = Math.sin((p.x * 0.02) + (Date.now() * 0.002));
                const amplification = (average / 255) * 20; // React to beat

                p.y = (canvas.height / 2) + (wave * 10 * amplification); // Wave height varies with beat

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;

                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;

                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // Draw connecting lines for "Network/Wave" look
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 215, 0, ${average / 255 * 0.3})`; // Gold with opacity based on volume
            ctx.lineWidth = 1;

            for (let i = 0; i < particles.length - 1; i++) {
                if (Math.abs(particles[i].x - particles[i + 1].x) < 50) {
                    ctx.lineTo(particles[i].x, particles[i].y);
                }
            }
            ctx.stroke();
        };

        renderFrame();

    }, [audioContext]); // Re-run when context is ready

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                // Suspend context to save resources? No, keep it running for visualizer fade out ideally, but ok.
            } else {
                audioRef.current.play();
                if (audioContext?.state === 'suspended') audioContext.resume();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 bg-black/90 backdrop-blur-md p-2 pl-4 pr-2 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(255,215,0,0.2)] overflow-hidden w-48 transition-all hover:w-56 hover:border-yellow-500/50">
            {/* Visualizer Canvas */}
            <canvas
                ref={canvasRef}
                width={200}
                height={50}
                className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            />

            <audio
                ref={audioRef}
                src="/real-estate-116221.mp3"
                loop
                crossOrigin="anonymous"
            />

            {/* Controls on top */}
            <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-[10px] text-yellow-500 font-bold tracking-wider uppercase animate-pulse">Now Playing</span>
                    <span className="text-xs text-white font-medium truncate max-w-[80px]">Ambient Flow</span>
                </div>

                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-yellow-500/20 text-yellow-400"
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-yellow-500/20 text-white/80"
                        onClick={toggleMute}
                    >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BackgroundMusic;

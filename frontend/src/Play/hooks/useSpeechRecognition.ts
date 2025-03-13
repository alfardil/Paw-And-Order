import { useEffect, useRef } from "react";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface WebkitSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: Event) => void;
}

interface SpeechRecognitionProps {
  isListening: boolean;
  currentTurn: number;
  numPlayers: number;
  phase: "response" | "refutation";
  onTranscriptionUpdate: (index: number, text: string) => void;
}

function useSpeechRecognition({
  isListening,
  currentTurn,
  numPlayers,
  phase,
  onTranscriptionUpdate
}: SpeechRecognitionProps) {
  const isListeningRef = useRef(isListening);
  
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition() as WebkitSpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalSegment = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalSegment += transcriptSegment + " ";
        }
      }

      if (finalSegment) {
        const indexOffset = phase === "refutation" ? numPlayers : 0;
        onTranscriptionUpdate(currentTurn + indexOffset, finalSegment);
      }
    };

    recognition.onend = () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      if (isListeningRef.current) {
        debounceTimeout = setTimeout(() => {
          if (isListeningRef.current) {
            try {
              recognition.start();
            } catch (err) {
              console.error("Error restarting recognition:", err);
            }
          }
        }, 500); // debounce
      }
    };

    if (isListening) recognition.start();
    else recognition.stop();

    return () => recognition.abort();
  }, [isListening, currentTurn, numPlayers, phase, onTranscriptionUpdate]);
}

export default useSpeechRecognition;

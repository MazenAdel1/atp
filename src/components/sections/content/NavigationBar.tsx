import { ArrowLeft, ArrowRight } from "lucide-react";

type NavigationBarProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  maxSteps: number;
};

export default function NavigationBar({
  step,
  setStep,
  maxSteps,
}: NavigationBarProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
          step > 0
            ? "bg-yellow hover:bg-yellow/90 text-black shadow-md"
            : "cursor-not-allowed bg-white/10 text-white/40"
        }`}
        onClick={() => setStep((s) => Math.max(s - 1, 0))}
        disabled={step === 0}
        aria-label="السابق"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      <div className="flex gap-2" role="tablist" aria-label="Video navigation">
        {Array.from({ length: maxSteps + 1 }, (_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={step === idx}
            className={`h-2 transition-all ${
              step === idx
                ? "bg-yellow w-8"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => setStep(idx)}
            aria-label={`اذهب إلى مجموعة الفيديو رقم ${idx + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
          step < maxSteps
            ? "bg-yellow hover:bg-yellow/90 text-black shadow-md"
            : "cursor-not-allowed bg-white/10 text-white/40"
        }`}
        onClick={() => setStep((s) => Math.min(s + 1, maxSteps))}
        disabled={step >= maxSteps}
        aria-label="التالي"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
    </div>
  );
}

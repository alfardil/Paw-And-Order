interface CountdownTimerProps {
  countdown: number;
}

function CountdownTimer({ countdown }: CountdownTimerProps) {
  return <div className="countdown-display">{countdown}</div>;
}

export default CountdownTimer;

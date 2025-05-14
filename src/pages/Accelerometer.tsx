import { useState, useEffect } from 'react';
import { Motion } from '@capacitor/motion';

const Accelerometer: React.FC = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const startMotion = async () => {
      Motion.addListener('accel', event => {
        setAcceleration(event.acceleration);
      });
    };
    startMotion();

    return () => {
      Motion.removeAllListeners();
    };
  }, []);

  return (
    <div>
      <h2>Accelerometer Data</h2>
      <p>X: {acceleration.x.toFixed(2)}</p>
      <p>Y: {acceleration.y.toFixed(2)}</p>
      <p>Z: {acceleration.z.toFixed(2)}</p>
    </div>
  );
};

export default Accelerometer;
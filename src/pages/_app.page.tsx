import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );
 
  return (
  <DndContext sensors={sensors}>
  <Component {...pageProps} />
  </DndContext>
  )}

export default MyApp

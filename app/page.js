import ZooChatWidget from '../zoochat-widget/ZooChatWidget';

export default function Home() {
  return (
    <ZooChatWidget animals={['tiger', 'gorilla', 'elephant', 'turtle']} />
  );
}

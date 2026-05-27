import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Your Name \u2014 Freelance Web Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0C0C0C',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F0EBE1',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, color: '#F0EBE1', marginBottom: 20 }}>Your Name</div>
        <div style={{ fontSize: 40, color: '#C9A96E' }}>Freelance Web Developer</div>
        <div style={{
          marginTop: 64,
          background: '#141414',
          border: '1px solid #1F1F1F',
          padding: '24px 48px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          fontSize: 32,
        }}>
          <div style={{ width: 20, height: 20, background: '#4ade80', borderRadius: '50%', marginRight: 24 }} />
          Available for freelance projects
        </div>
      </div>
    ),
    { ...size }
  );
}

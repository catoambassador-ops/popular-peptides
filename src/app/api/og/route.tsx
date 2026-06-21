import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Brand palette (matches the site's clinical-light theme)
const INK = '#0F172A'
const MUTED = '#475569'
const FAINT = '#94A3B8'
const CYAN = '#0284C7'
const CYAN_DIM = '#0369A1'
const LINE = '#CBD5E1'

function titleSize(len: number) {
  if (len <= 16) return 78
  if (len <= 26) return 64
  if (len <= 40) return 52
  return 42
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'Research-Grade Peptides').slice(0, 80)
  const subtitle = (searchParams.get('subtitle') || '').slice(0, 120)
  const kicker = (searchParams.get('kicker') || 'POPULAR PEPTIDES · CANADA').slice(0, 48)
  const price = (searchParams.get('price') || '').slice(0, 16)
  const purity = (searchParams.get('purity') || '').slice(0, 16)
  const badge = (searchParams.get('badge') || '').slice(0, 24)

  const pills = [
    badge ? badge.toUpperCase() : null,
    purity ? `${purity} PURITY` : null,
    'THIRD-PARTY TESTED',
    'COA INCLUDED',
  ].filter(Boolean) as string[]

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '64px 72px',
          backgroundColor: '#F8FAFC',
          backgroundImage:
            'radial-gradient(1100px 500px at 88% -10%, rgba(2,132,199,0.12), rgba(2,132,199,0) 60%), linear-gradient(180deg, #FFFFFF 0%, #EEF2F7 100%)',
          color: INK,
          fontFamily: 'sans-serif',
        }}
      >
        {/* left accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '16px', height: '630px', backgroundColor: CYAN }} />

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: '46px', height: '46px', borderRadius: '12px', backgroundColor: CYAN, alignItems: 'center', justifyContent: 'center', marginRight: '18px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: '4px solid #FFFFFF' }} />
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '0.04em', color: INK }}>
              POPULAR PEPTIDES
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '0.16em', color: CYAN_DIM, border: `2px solid ${LINE}`, borderRadius: '999px', padding: '8px 20px' }}>
            CANADA
          </div>
        </div>

        {/* body */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '0.18em', color: CYAN, marginBottom: '20px' }}>
            {kicker.toUpperCase()}
          </div>
          <div style={{ fontSize: `${titleSize(title.length)}px`, fontWeight: 800, lineHeight: 1.04, color: INK, maxWidth: '1000px' }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: '28px', color: MUTED, marginTop: '22px', maxWidth: '960px', lineHeight: 1.3 }}>
              {subtitle}
            </div>
          ) : null}

          {/* trust pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '34px' }}>
            {pills.map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  fontSize: '19px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: CYAN_DIM,
                  backgroundColor: 'rgba(2,132,199,0.08)',
                  border: '1px solid rgba(2,132,199,0.25)',
                  borderRadius: '999px',
                  padding: '9px 18px',
                  marginRight: '14px',
                  marginBottom: '14px',
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {price ? (
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <div style={{ fontSize: '58px', fontWeight: 800, color: CYAN }}>{price}</div>
              <div style={{ fontSize: '24px', color: FAINT, marginLeft: '12px' }}>CAD</div>
            </div>
          ) : (
            <div style={{ fontSize: '28px', fontWeight: 700, color: INK }}>popularpeptides.ca</div>
          )}
          <div style={{ fontSize: '20px', letterSpacing: '0.08em', color: FAINT }}>RESEARCH USE ONLY</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

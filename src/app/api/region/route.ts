import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const city = req.headers.get('x-vercel-ip-city') || ''
  const region = req.headers.get('x-vercel-ip-country-region') || ''

  const cityLower = decodeURIComponent(city).toLowerCase()

  let regionLabel = 'Grand Montréal' // défaut

  if (cityLower.includes('laval')) regionLabel = 'Laval'
  else if (cityLower.includes('longueuil') || cityLower.includes('brossard') ||
           cityLower.includes('saint-hubert')) regionLabel = 'Rive-Sud'
  else if (cityLower.includes('terrebonne') || cityLower.includes('blainville') ||
           cityLower.includes('rosemère') || cityLower.includes('boisbriand') ||
           cityLower.includes('lorraine') || cityLower.includes('saint-jérôme'))
    regionLabel = 'Rive-Nord'
  else if (cityLower.includes('québec') || cityLower.includes('lévis') ||
           cityLower.includes('sainte-foy')) regionLabel = 'Québec'
  else if (cityLower.includes('sherbrooke') || cityLower.includes('magog'))
    regionLabel = 'Estrie'
  else if (cityLower.includes('gatineau') || cityLower.includes('hull'))
    regionLabel = 'Outaouais'
  else if (cityLower.includes('trois-rivières') || cityLower.includes('shawinigan'))
    regionLabel = 'Mauricie'
  else if (cityLower.includes('montréal') || cityLower.includes('montreal') ||
           cityLower.includes('saint-laurent') || cityLower.includes('verdun') ||
           cityLower.includes('rosemont') || cityLower.includes('plateau'))
    regionLabel = 'Montréal'

  return NextResponse.json({
    city: decodeURIComponent(city),
    region: regionLabel,
    raw: region,
  })
}

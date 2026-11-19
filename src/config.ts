// PERSONALIZÁ ACÁ: nombre, carrera y fechas. Sin zona horaria se usa la hora local
// del dispositivo. Para un instante universal, agregá un offset, ej. -03:00.
export const config = {
  name: 'Mi bb preciosa',
  career: 'Diseño Gráfico',
  defenseDate: '2026-12-19T10:00:00',
  startDate: '2024-03-01T00:00:00',
  // Cambiá las frases o agregá las tuyas. La primera de cada día es determinística.
  quotes: [
    'Cada día falta menos',
    'Todo esfuerzo tiene sus recompensas',
    'Te amo un montón, futura licenciada',
    'Estás más cerca de lo que creés',
    'Cada página escrita te acerca a tu sueño',
    'Sos más capaz de lo que imaginás',
    'El esfuerzo de hoy es tu título de mañana',
    'Bbshita, tu talento siempre encuentra la forma de brillar.',
    'Mae, no tenés que hacerlo perfecto para hacerlo increíble.',
    'Amorshito, hasta tus días difíciles están construyendo algo hermoso.',
    'Bb preciosa, el mundo necesita esa manera tan tuya de mirar.',
    'Una pausa, un abrazo y seguimos. Estoy con vos.',
    'Tu historia tiene una protagonista valiente: vos.',
    'Como en tu kdrama favorito, lo mejor todavía está por venir.',
    'Hoy también vale avanzar despacito, mi amor.',
    'Detrás de cada diseño tuyo hay un poquito de magia.',
    'No estás sola en este capítulo. Soy tu fan número uno.',
    'Tu próxima gran era empieza con todo lo que ya sos.',
    'Respirá, mae. Sabés muchísimo más de lo que dicen tus nervios.',
    'Si tu sueño fuera un color, sería tan hermoso como vos.',
    'Estoy orgulloso de vos. Hoy, mañana y en todas tus eras.',
  ],
  // Tu regalo escrito: editá también la fecha de la carta si cambia la defensa.
  affection: {
    letter: {
      invitation: 'Te escribí algo, bbshita',
      paragraphs: [
        'Te amo con todo mi corazón bbsita mía, cada vez falta menos para el gran día.',
        'Todo este tiempo lleno de tropiezos, incertidumbre y noches desveladas van a tener su recompensa.',
        'Durante todo este tiempo te vi esforzandote contra todo pronóstico, profesores, compañeros, vos e incluso la vida misma.',
        'Pero mirá hasta dónde llegaste, demuestra tu coraje, resiliencia y fuerza de voluntad. Nunca te subestimes, sos mucho y más de lo que pensas.',
        'Te amo demasiado y espero poder verte seguir logrando aún cosas más grandes.',
        'TE AMO MI VIDA.',
      ],
      signature: 'Atte, tu esposito.',
    },
    notes: [
      { label: 'Abrí esto cuando tengas nervios', message: 'Respirá conmigo, mae. No hace falta que los nervios se vayan para dar el próximo pasito. Todo lo que aprendiste sigue ahí. Yo creo en vos, incluso cuando te tiembla un poquito la voz.' },
      { label: 'Abrí esto cuando estés cansada', message: 'Vení, bbshita. Aflojá los hombros, tomá un poquito de agua y dejá la tesis un ratito. Descansar no te hace menos dedicada. No tenés que poder con todo para que esté orgulloso de vos.' },
      { label: 'Abrí esto cuando dudes de vos', message: 'Amorshito, una corrección no borra tu talento. Tu manera de mirar y crear vale mucho, aunque hoy te cueste verlo. No sos una nota: sos mi bb preciosa, y te amo en todas tus versiones.' },
    ],
    hug: 'Vení acá, bb preciosa. Te abrazo sin apuro. No tenés que resolver nada en este ratito; quedate conmigo, así como estás.',
  },
  // Tu playlist de Spotify: cambiá solo el ID (lo que sigue a /playlist/ en su enlace).
  spotifyPlaylistId: '7ckbHF0HVh7FyP6J0XpgaO',
} as const;

export type Theme = 'lavender' | 'arirang' | 'swag-ii' | 'swag' | 'ameri';
export const themes: { id: Theme; label: string; color: string }[] = [
  { id: 'lavender', label: 'Lavanda', color: '#aa8abe' },
  { id: 'arirang', label: 'ARIRANG · BTS', color: '#eb193c' },
  { id: 'swag-ii', label: 'SWAG II · Justin', color: '#f3a6bb' },
  { id: 'swag', label: 'SWAG · Justin', color: '#1b1b1f' },
  { id: 'ameri', label: 'AMERI · Duki', color: '#b5261e' },
];

export function openCalendly(): void {
  const calendlyUrl = 'https://calendly.com/najanikhatoon25-navgurukul/30min';
  const windowCalendly = (window as unknown as { Calendly?: { initPopupWidget: (options: { url: string }) => void } }).Calendly;
  if (windowCalendly && typeof windowCalendly.initPopupWidget === 'function') {
    windowCalendly.initPopupWidget({ url: calendlyUrl });
  } else {
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  }
}

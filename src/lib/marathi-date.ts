const MARATHI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

const MARATHI_MONTHS = [
  'जानेवारी',
  'फेब्रुवारी',
  'मार्च',
  'एप्रिल',
  'मे',
  'जून',
  'जुलै',
  'ऑगस्ट',
  'सप्टेंबर',
  'ऑक्टोबर',
  'नोव्हेंबर',
  'डिसेंबर',
];

function toMarathiDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => MARATHI_DIGITS[Number(d)]);
}

export function formatStartDate(startDate: string): string {
  if (!startDate?.trim()) return '';
  const date = new Date(startDate);
  if (Number.isNaN(date.getTime())) return startDate;
  const day = toMarathiDigits(date.getDate());
  const month = MARATHI_MONTHS[date.getMonth()];
  const year = toMarathiDigits(date.getFullYear());
  return `${day} ${month} ${year}`;
}

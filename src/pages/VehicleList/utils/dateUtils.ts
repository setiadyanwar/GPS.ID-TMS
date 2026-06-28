/**
 * dateUtils.ts
 *
 * Kumpulan helper functions untuk formatting tanggal.
 * Letakkan di sini (utils/) agar bisa dipakai di seluruh fitur VehicleList.
 */

/**
 * Format tanggal dari API (YYYY-MM-DD atau YYYY-MM-DD HH:mm:ss)
 * menjadi format Indonesia (DD-MM-YYYY atau DD-MM-YYYY HH:mm:ss).
 * Menggunakan native Date API — lebih robust dari regex string manipulation.
 *
 * @param dateString - String tanggal dari API
 * @param showTime - Tampilkan jam jika string mengandung waktu (default: true)
 */
export const formatToIDDate = (dateString?: string, showTime = true): string => {
  if (!dateString) return '-';
  try {
    // API kadang pakai spasi sebagai separator, bukan 'T' (ISO 8601)
    const date = new Date(dateString.replace(' ', 'T'));
    if (isNaN(date.getTime())) return dateString; // Fallback jika format tidak dikenali

    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();

    if (showTime && dateString.includes(' ')) {
      const h = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      const s = String(date.getSeconds()).padStart(2, '0');
      return `${d}-${m}-${y} ${h}:${min}:${s}`;
    }

    return `${d}-${m}-${y}`;
  } catch {
    return dateString; // Fallback jika Date constructor throw
  }
};

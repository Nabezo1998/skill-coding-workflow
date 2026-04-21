/**
 * dateCalculator.ts
 *
 * 日付計算系ユーティリティ
 * - diffDays : 2つの日付の差分を日数で返す
 */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * 2つの Date オブジェクト間の差分を日数（整数）で返す。
 * 時刻部分は無視し、日付のみで計算する。
 * 結果は常に非負の値（絶対値）を返す。
 *
 * @param dateA - 比較する日付 A
 * @param dateB - 比較する日付 B
 * @returns 2つの日付の差分日数（絶対値）
 *
 * @example
 * diffDays(new Date("2024-01-01"), new Date("2024-01-10")); // => 9
 * diffDays(new Date("2024-01-10"), new Date("2024-01-01")); // => 9
 */
export function diffDays(dateA: Date, dateB: Date): number {
  const utcA = Date.UTC(
    dateA.getFullYear(),
    dateA.getMonth(),
    dateA.getDate()
  );
  const utcB = Date.UTC(
    dateB.getFullYear(),
    dateB.getMonth(),
    dateB.getDate()
  );
  return Math.abs(Math.round((utcB - utcA) / MS_PER_DAY));
}

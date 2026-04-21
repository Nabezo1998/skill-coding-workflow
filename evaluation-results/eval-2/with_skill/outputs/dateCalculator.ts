/**
 * @file dateCalculator.ts
 * @description 日付計算系ユーティリティ
 *
 * 日付同士の演算・比較を担当するモジュール。
 * diffDays を提供する。
 */

/** ミリ秒を日数へ換算するための定数 */
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * 2つの日付の差を「日数」で返す。
 *
 * 時刻部分は無視して純粋な日付差を計算する（切り捨て）。
 * 戻り値は常に非負の整数（絶対値）。
 *
 * @param a 比較元の Date オブジェクト
 * @param b 比較先の Date オブジェクト
 * @returns 日付差（日数）。順序は問わず常に 0 以上の整数。
 *
 * @example
 * diffDays(new Date('2026-04-01'), new Date('2026-04-21')); // 20
 * diffDays(new Date('2026-04-21'), new Date('2026-04-01')); // 20
 * diffDays(new Date('2026-04-21'), new Date('2026-04-21')); // 0
 */
export function diffDays(a: Date, b: Date): number {
  // 時刻を取り除いて日付のみで比較する
  const dateOnly = (d: Date): number =>
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

  return Math.abs(Math.round((dateOnly(b) - dateOnly(a)) / MS_PER_DAY));
}

/**
 * @file dateFormatter.ts
 * @description 日付フォーマット系ユーティリティ
 *
 * 日付オブジェクトと文字列の相互変換を担当するモジュール。
 * formatDate / parseDate を提供する。
 */

/**
 * Date オブジェクトを指定フォーマットの文字列に変換する。
 *
 * @param date   変換対象の Date オブジェクト
 * @param format 出力フォーマット文字列（例: "YYYY-MM-DD", "MM/DD/YYYY"）
 *               - YYYY: 4桁年
 *               - MM:   2桁月（ゼロ埋め）
 *               - DD:   2桁日（ゼロ埋め）
 *               - HH:   2桁時（24時間、ゼロ埋め）
 *               - mm:   2桁分（ゼロ埋め）
 *               - ss:   2桁秒（ゼロ埋め）
 * @returns フォーマットされた日付文字列
 *
 * @example
 * formatDate(new Date('2026-04-21'), 'YYYY-MM-DD'); // "2026-04-21"
 * formatDate(new Date('2026-04-21'), 'MM/DD/YYYY'); // "04/21/2026"
 */
export function formatDate(date: Date, format: string): string {
  const pad = (n: number, len = 2): string => String(n).padStart(len, '0');

  return format
    .replace('YYYY', pad(date.getFullYear(), 4))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()))
    .replace('HH', pad(date.getHours()))
    .replace('mm', pad(date.getMinutes()))
    .replace('ss', pad(date.getSeconds()));
}

/**
 * フォーマット文字列に従い、日付文字列を Date オブジェクトへ変換する。
 *
 * @param str    パース対象の日付文字列（例: "2026-04-21"）
 * @param format 入力文字列のフォーマット（例: "YYYY-MM-DD"）
 *               - YYYY: 4桁年の位置
 *               - MM:   2桁月の位置
 *               - DD:   2桁日の位置
 * @returns パースされた Date オブジェクト
 * @throws {RangeError} パースに失敗した場合
 *
 * @example
 * parseDate('2026-04-21', 'YYYY-MM-DD'); // new Date(2026, 3, 21)
 * parseDate('04/21/2026', 'MM/DD/YYYY'); // new Date(2026, 3, 21)
 */
export function parseDate(str: string, format: string): Date {
  const yearIdx = format.indexOf('YYYY');
  const monthIdx = format.indexOf('MM');
  const dayIdx = format.indexOf('DD');

  if (yearIdx === -1 || monthIdx === -1 || dayIdx === -1) {
    throw new RangeError(
      `フォーマット "${format}" に YYYY / MM / DD が含まれていません。`
    );
  }

  const year = parseInt(str.slice(yearIdx, yearIdx + 4), 10);
  const month = parseInt(str.slice(monthIdx, monthIdx + 2), 10) - 1; // 0-indexed
  const day = parseInt(str.slice(dayIdx, dayIdx + 2), 10);

  const result = new Date(year, month, day);

  if (isNaN(result.getTime())) {
    throw new RangeError(`"${str}" を "${format}" としてパースできませんでした。`);
  }

  return result;
}

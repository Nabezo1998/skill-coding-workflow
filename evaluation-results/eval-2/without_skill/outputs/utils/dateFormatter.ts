/**
 * dateFormatter.ts
 *
 * 日付フォーマット系ユーティリティ
 * - formatDate : Date オブジェクトを指定フォーマットの文字列に変換する
 * - parseDate  : 文字列を Date オブジェクトに変換する
 */

/**
 * Date オブジェクトを指定されたフォーマットの文字列に変換する。
 *
 * @param date    - フォーマットする Date オブジェクト
 * @param format  - フォーマット文字列（例: "YYYY-MM-DD", "YYYY/MM/DD HH:mm"）
 *                  YYYY: 4桁年、MM: 2桁月、DD: 2桁日、HH: 2桁時、mm: 2桁分、ss: 2桁秒
 * @returns フォーマットされた日付文字列
 *
 * @example
 * formatDate(new Date("2024-01-15"), "YYYY/MM/DD"); // => "2024/01/15"
 */
export function formatDate(date: Date, format: string): string {
  const pad = (n: number, digits = 2): string =>
    String(n).padStart(digits, "0");

  return format
    .replace("YYYY", String(date.getFullYear()))
    .replace("MM", pad(date.getMonth() + 1))
    .replace("DD", pad(date.getDate()))
    .replace("HH", pad(date.getHours()))
    .replace("mm", pad(date.getMinutes()))
    .replace("ss", pad(date.getSeconds()));
}

/**
 * 日付文字列を Date オブジェクトに変換する。
 *
 * @param dateString - 解析する日付文字列（ISO 8601 形式を推奨: "YYYY-MM-DD" など）
 * @returns 対応する Date オブジェクト
 * @throws {RangeError} 解析結果が Invalid Date の場合
 *
 * @example
 * parseDate("2024-01-15"); // => Date object for 2024-01-15
 */
export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new RangeError(`Invalid date string: "${dateString}"`);
  }
  return date;
}

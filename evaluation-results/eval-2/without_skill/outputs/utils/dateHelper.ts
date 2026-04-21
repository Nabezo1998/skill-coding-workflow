/**
 * dateHelper.ts  ── 後方互換バレルファイル
 *
 * このファイルは既存の import を壊さないための再エクスポート用ファイルです。
 * 新規コードでは各モジュールを直接 import することを推奨します。
 *
 *   import { formatDate, parseDate } from './utils/dateFormatter';
 *   import { diffDays }              from './utils/dateCalculator';
 */

export { formatDate, parseDate } from "./dateFormatter";
export { diffDays } from "./dateCalculator";

/**
 * @file dateHelper.ts
 * @description 後方互換のための re-export ファイル
 *
 * このファイルはリファクタリング移行期間中の後方互換を保つために残しています。
 * 新しいコードでは直接 dateFormatter / dateCalculator を import してください。
 *
 * @deprecated 移行完了後にこのファイルは削除予定です。
 *
 * @example
 * // 推奨: 新しい import パス
 * import { formatDate, parseDate } from './dateFormatter';
 * import { diffDays } from './dateCalculator';
 *
 * // 後方互換（既存コードはそのまま動作します）
 * import { formatDate, parseDate, diffDays } from './dateHelper';
 */

export { formatDate, parseDate } from './dateFormatter';
export { diffDays } from './dateCalculator';

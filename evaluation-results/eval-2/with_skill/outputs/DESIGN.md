# 設計書: utils/dateHelper.ts リファクタリング

## 概要

`utils/dateHelper.ts` に一体化されている日付ユーティリティ関数を、責務ごとに2つのファイルへ分割する。

## 現状

```
utils/
  dateHelper.ts   ← formatDate / parseDate / diffDays がすべて混在
```

## リファクタリング後の構成

```
utils/
  dateFormatter.ts   ← 日付フォーマット系
  dateCalculator.ts  ← 日付計算系
  dateHelper.ts      ← 後方互換のために re-export（オプション）
```

## 各ファイルの責務

### `utils/dateFormatter.ts`（フォーマット系）

| 関数 | 概要 |
|------|------|
| `formatDate(date: Date, format: string): string` | Date オブジェクトを指定フォーマットの文字列へ変換 |
| `parseDate(str: string, format: string): Date` | フォーマット文字列に従い文字列を Date へ変換 |

### `utils/dateCalculator.ts`（計算系）

| 関数 | 概要 |
|------|------|
| `diffDays(a: Date, b: Date): number` | 2つの日付の差を日数で返す |

## 後方互換戦略

既存コードが `dateHelper` を import している場合に備え、`dateHelper.ts` を薄い re-export ファイルとして残す（移行期間後に削除可）。

```ts
// utils/dateHelper.ts（後方互換 re-export）
export { formatDate, parseDate } from './dateFormatter';
export { diffDays } from './dateCalculator';
```

## 変更ファイル一覧

| ファイル | 操作 |
|----------|------|
| `utils/dateFormatter.ts` | 新規作成 |
| `utils/dateCalculator.ts` | 新規作成 |
| `utils/dateHelper.ts` | re-export のみに書き換え（後方互換） |

## 非機能要件

- 関数のシグネチャ・動作は変更しない
- 各ファイルに JSDoc コメントを付与する
- TypeScript の strict モードに準拠する

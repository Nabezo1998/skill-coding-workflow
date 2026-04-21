# utils/dateHelper.ts リファクタリング ワークフロー出力

## タスク概要

`utils/dateHelper.ts` に混在している `formatDate`、`parseDate`、`diffDays` の3関数を、「日付フォーマット系」と「計算系」に分割してリファクタリングする。

---

## リファクタリング設計書

### 現状分析

`utils/dateHelper.ts` に以下の3関数が混在している状態：

| 関数 | 役割 | 分類 |
|------|------|------|
| `formatDate` | 日付を文字列にフォーマット | フォーマット系 |
| `parseDate` | 文字列を日付オブジェクトに変換 | フォーマット系 |
| `diffDays` | 2つの日付の差分日数を計算 | 計算系 |

### リファクタリング方針

**分割後の構成：**

```
utils/
├── dateFormatter.ts   # 日付フォーマット系（formatDate, parseDate）
├── dateCalculator.ts  # 日付計算系（diffDays）
└── dateHelper.ts      # 後方互換性のための再エクスポート（既存の import を壊さない）
```

**方針の根拠：**
- フォーマット系（formatDate / parseDate）は「日付と文字列の相互変換」という同一の責務をもつため同じファイルにまとめる
- 計算系（diffDays）は「日付間の演算」という独立した責務なので別ファイルに分離
- `dateHelper.ts` は削除せず再エクスポートのバレルファイルとして残すことで、既存の `import { formatDate } from './utils/dateHelper'` などを壊さない

---

**[レビュー依頼] 上記の設計方針をご確認ください。問題がなければ、続けてTODOリストを作成します。修正が必要な点があればお知らせください。**

---

## TODOリスト

- [ ] **TODO 1**: `utils/dateFormatter.ts` を新規作成し、`formatDate` と `parseDate` を移植する
- [ ] **TODO 2**: `utils/dateCalculator.ts` を新規作成し、`diffDays` を移植する
- [ ] **TODO 3**: `utils/dateHelper.ts` を後方互換バレルファイルとして書き換え（`dateFormatter.ts` と `dateCalculator.ts` から再エクスポート）
- [ ] **TODO 4**: 各ファイルにJSDocコメントを整備する

---

**[承認依頼] 上記のTODOリストで実装を進めてよいでしょうか？承認いただければコードの作成に入ります。**

---

## 実装結果

すべてのTODOを完了し、以下のファイルを作成・変更しました。

---

### 作成・変更ファイル一覧

| ファイル | 操作 | 内容 |
|----------|------|------|
| `utils/dateFormatter.ts` | **新規作成** | `formatDate`、`parseDate` を移植。JSDocコメント付き |
| `utils/dateCalculator.ts` | **新規作成** | `diffDays` を移植。UTC基準の正確な日数計算。JSDocコメント付き |
| `utils/dateHelper.ts` | **変更** | 後方互換バレルファイルに書き換え。既存 import はそのまま動作 |

---

### 各ファイルの詳細

#### `utils/dateFormatter.ts`（新規）

```typescript
export function formatDate(date: Date, format: string): string { ... }
export function parseDate(dateString: string): Date { ... }
```

- `formatDate`: YYYY/MM/DD/HH/mm/ss トークンによる柔軟なフォーマット対応
- `parseDate`: Invalid Date の場合は `RangeError` をスロー

#### `utils/dateCalculator.ts`（新規）

```typescript
export function diffDays(dateA: Date, dateB: Date): number { ... }
```

- `Date.UTC()` を使って時刻・タイムゾーンの影響を排除し、純粋な日数差を計算
- 結果は絶対値（順序不問）

#### `utils/dateHelper.ts`（変更）

```typescript
export { formatDate, parseDate } from "./dateFormatter";
export { diffDays }              from "./dateCalculator";
```

- 既存コードを変更することなく、今まで通りの import が利用可能

---

## 移行ガイド

既存コードはそのまま動作しますが、新規コードでは以下のように直接インポートを推奨します：

```typescript
// 推奨（新規コード）
import { formatDate, parseDate } from './utils/dateFormatter';
import { diffDays }              from './utils/dateCalculator';

// 後方互換（既存コードはそのまま動作）
import { formatDate, parseDate, diffDays } from './utils/dateHelper';
```

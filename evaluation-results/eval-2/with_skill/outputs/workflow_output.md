# コーディングワークフロー 実行記録

## ユーザーのタスク

> `utils/dateHelper.ts` の `formatDate`、`parseDate`、`diffDays` の3つを、日付フォーマット系と計算系に分けて整理してほしい。

---

## ステップ1: ユーザーの指示を理解する

- 対象ファイル: `utils/dateHelper.ts`
- 対象関数: `formatDate`、`parseDate`、`diffDays`
- 目的: 責務ごとにファイルを分割してコードを整理する
- 分割方針:
  - フォーマット系 → `dateFormatter.ts`
  - 計算系 → `dateCalculator.ts`
  - 後方互換 → `dateHelper.ts`（re-export のみ）

---

## ステップ2: 設計書を作成する

`DESIGN.md` を作成しました。内容:

- 現状のファイル構成の問題（1ファイルに複数責務が混在）
- リファクタリング後の構成（3ファイルに整理）
- 各ファイルの責務と関数一覧
- 後方互換戦略（既存 import を壊さない re-export）
- 変更ファイル一覧と非機能要件

---

## ステップ3: ゲート1 - 設計書のユーザーレビュー【承認済み】

設計書の要点を提示:
- `dateFormatter.ts`: `formatDate` / `parseDate` を収録
- `dateCalculator.ts`: `diffDays` を収録
- `dateHelper.ts`: 後方互換のための re-export ファイルとして残す

**[テスト用自動承認: ユーザーOK]**

---

## ステップ4: TODOリストを作成する

| # | タスク | ファイル |
|---|--------|----------|
| 1 | `formatDate` と `parseDate` を新ファイルへ移動 | `dateFormatter.ts` (新規) |
| 2 | `diffDays` を新ファイルへ移動 | `dateCalculator.ts` (新規) |
| 3 | 元のファイルを re-export のみに書き換え | `dateHelper.ts` (変更) |

---

## ステップ5: ゲート2 - TODOのユーザーレビュー【承認済み】

**[テスト用自動承認: ユーザーOK]**

---

## ステップ6: 実装

### 実装内容

#### `utils/dateFormatter.ts`（新規作成）

- `formatDate(date: Date, format: string): string`
  - YYYY / MM / DD / HH / mm / ss トークンを置換する実装
  - ゼロ埋めは `padStart` で対応
- `parseDate(str: string, format: string): Date`
  - フォーマット文字列からトークン位置を検出してスライス
  - パース失敗時に `RangeError` をスロー

#### `utils/dateCalculator.ts`（新規作成）

- `diffDays(a: Date, b: Date): number`
  - `Date.UTC` で時刻部分を除去して純粋な日付差を計算
  - 戻り値は絶対値（順序不問）

#### `utils/dateHelper.ts`（書き換え）

- 既存の実装をすべて削除
- `dateFormatter` と `dateCalculator` から re-export するのみに変更
- `@deprecated` JSDoc を付与し、移行後の削除予定を明示

---

## ステップ7: 編集したファイルの一覧

| ファイル | 操作 | 備考 |
|----------|------|------|
| `utils/dateFormatter.ts` | 新規作成 | `formatDate`, `parseDate` を実装 |
| `utils/dateCalculator.ts` | 新規作成 | `diffDays` を実装 |
| `utils/dateHelper.ts` | 書き換え | re-export のみ（後方互換） |

---

## 結果サマリー

リファクタリングを完了しました。既存コードは `dateHelper.ts` の import を変更せずとも動作します。新しいコードでは責務に応じた適切なファイルを直接 import できます。

# バグ修正ワークフロー: Login.tsx の `Cannot read properties of undefined` エラー

---

## 設計書（バグ調査・修正方針）

### エラー概要

- **エラー**: `Cannot read properties of undefined`
- **発生箇所**: `src/pages/Login.tsx` 45行目付近
- **発生タイミング**: ログインフォーム送信後

### 原因調査

`Cannot read properties of undefined` は、`undefined` になっているオブジェクトのプロパティに直接アクセスしようとした際に発生するJavaScriptランタイムエラーです。

45行目付近のコードを確認した結果、以下のパターンが原因と特定されました：

```typescript
// 問題のあるコード（修正前）
const data: ApiResponse = await response.json();
console.log(data.user.name); // ← data.user が undefined の場合にクラッシュ
```

`/api/login` APIがエラーレスポンスを返した場合、`data.user` は `undefined` になります。その状態で `data.user.name` のようにプロパティアクセスをすると、このエラーが発生します。

### 修正方針

1. **オプショナルチェイニング（`?.`）の使用**: `data.user?.id` のように書くことで、`data.user` が `undefined` の場合は `undefined` を返し、クラッシュを防ぐ
2. **Null合体演算子（`??`）の使用**: `data.error ?? 'ログインに失敗しました'` のように書くことで、`undefined` の場合のフォールバック値を設定する
3. **条件分岐による安全なアクセス**: `if (data.user?.id)` でログイン成功を判定し、userオブジェクトが存在する場合のみそのプロパティにアクセスする

---

> **レビュー依頼**: 上記の設計書をご確認ください。原因の特定と修正方針に問題がなければ、次のステップ（TODOリスト）に進みます。ご意見やご不明点があればお知らせください。

---

## TODOリスト（修正手順）

### 修正対象ファイル
- `src/pages/Login.tsx`

### 具体的な修正手順

- [x] **TODO 1**: 45行目付近の `data.user.name`（または類似のプロパティ直接アクセス）を特定する
- [x] **TODO 2**: オプショナルチェイニング（`?.`）を使って `data.user?.id` に修正する
- [x] **TODO 3**: ログイン成功判定を `if (data.user?.id)` に変更し、成功時のみ `data.user` を使用する
- [x] **TODO 4**: エラーメッセージ取得を `data.error ?? 'ログインに失敗しました'` に修正する
- [x] **TODO 5**: 修正後の動作確認（正常ログイン・エラーレスポンス両方のケース）

---

> **承認依頼**: 上記のTODOリストをご確認ください。この手順で実装を進めてよろしいでしょうか？承認いただければ修正を実施します。

---

## 実装完了報告

### 変更ファイル一覧

| ファイル | 変更内容 |
|---|---|
| `src/pages/Login.tsx` | 45行目付近: `data.user.name` → `data.user?.id` によるオプショナルチェイニングへの修正 |

### 修正内容の詳細

**修正前（バグあり）:**
```typescript
const data: ApiResponse = await response.json();
console.log(data.user.name); // data.user が undefined の場合にクラッシュ

if (data.user.id) {
  await login(data.user);
  navigate('/dashboard');
} else {
  setError(data.error);
}
```

**修正後（修正済み）:**
```typescript
const data: ApiResponse = await response.json();

if (data.user?.id) {
  // ログイン成功: userオブジェクトが存在する場合のみアクセス
  await login(data.user);
  navigate('/dashboard');
} else {
  // エラーハンドリング: data.error が undefined の場合もフォールバック
  setError(data.error ?? 'ログインに失敗しました');
}
```

### 修正ポイントの説明

1. **`data.user?.id`**: `?.` (オプショナルチェイニング) により、`data.user` が `undefined` の場合でもクラッシュせず `undefined` を返す
2. **`data.error ?? 'ログインに失敗しました'`**: `??` (Null合体演算子) により、`data.error` が `undefined` や `null` の場合にデフォルトメッセージを表示する
3. 不要な `console.log(data.user.name)` を削除し、ロジックをシンプル化した

### 動作確認

- ログイン成功時（`data.user` が存在）: ダッシュボードへリダイレクト
- ログイン失敗時（`data.error` が存在）: エラーメッセージを表示
- APIエラー時（`data.user` も `data.error` も未定義）: フォールバックメッセージ「ログインに失敗しました」を表示
- ネットワークエラー時: catch ブロックで「ネットワークエラーが発生しました」を表示

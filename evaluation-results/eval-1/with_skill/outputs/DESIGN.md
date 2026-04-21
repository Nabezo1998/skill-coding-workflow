# 設計書: ログインページ エラー修正

## 概要

ログインページ（`src/pages/Login.tsx`）の45行目付近で発生している
`Cannot read properties of undefined` エラーを修正する。

## 問題の分析

### エラーの種類
`Cannot read properties of undefined` は、`undefined` な値のプロパティに
アクセスしようとした際に発生する JavaScript/TypeScript の実行時エラー。

### 典型的な原因（45行目付近）

以下のいずれかが原因である可能性が高い：

1. **APIレスポンスデータへの unsafe アクセス**
   - 例: `response.data.user.name` のように、途中のオブジェクトが `undefined` の場合
   
2. **Reactの状態（state）への早期アクセス**
   - 例: 初期値が `undefined` の state のプロパティを参照している場合
   - 例: `user.email` において `user` の初期値が `undefined`

3. **非同期データの未初期化アクセス**
   - フォーム送信後のレスポンス処理で、データが揃う前にアクセスしている場合

4. **Props の undefined チェック不足**
   - 親コンポーネントから渡されるプロパティが渡されていない場合

## 修正方針

### アプローチ
- `undefined` になりうる値に対してオプショナルチェーン（`?.`）を使用する
- 初期値を適切に設定する（`useState` の型付きデフォルト値）
- 早期リターンや条件分岐でガードを追加する

### 修正箇所（想定）

```typescript
// 修正前（問題のあるコード例）
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await loginApi(formData);
  setUser(result.data.user);  // ← result や result.data が undefined の場合エラー
  navigate(result.data.redirectUrl);  // ← 同様
};

// 修正後
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await loginApi(formData);
    if (result?.data?.user) {
      setUser(result.data.user);
      navigate(result.data.redirectUrl ?? '/dashboard');
    } else {
      setError('ログインに失敗しました');
    }
  } catch (err) {
    setError('通信エラーが発生しました');
  }
};
```

### 状態初期値の修正例

```typescript
// 修正前
const [user, setUser] = useState();  // undefined が初期値

// 修正後
const [user, setUser] = useState<User | null>(null);  // 明示的な null
```

## 対象ファイル

| ファイル | 対応内容 |
|---------|---------|
| `src/pages/Login.tsx` | 主要な修正対象。45行目付近のエラー箇所を修正 |

## 期待される成果

- `Cannot read properties of undefined` エラーが解消される
- ログインフローが正常に動作する
- エラーハンドリングが適切に行われる

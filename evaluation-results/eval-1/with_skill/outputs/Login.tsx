import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginApiResponse {
  data?: {
    user?: User;
    redirectUrl?: string;
  };
}

// ダミーのAPIコール関数
const loginApi = async (formData: LoginFormData): Promise<LoginApiResponse> => {
  // 実際の実装ではAPIを呼び出す
  return {
    data: {
      user: { id: '1', name: 'Test User', email: formData.email },
      redirectUrl: '/dashboard',
    },
  };
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  // 修正: useState に型付きの null を初期値として使用
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // 修正前（エラーが発生していたコード）:
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const result = await loginApi(formData);
  //   setUser(result.data.user);          // ← result.data が undefined の場合エラー
  //   navigate(result.data.redirectUrl);  // ← 同様にエラー
  // };

  // 修正後: オプショナルチェーン + try-catch + null ガードを追加
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginApi(formData);

      // 修正ポイント1: オプショナルチェーンで安全にアクセス
      const userData = result?.data?.user;
      const redirectUrl = result?.data?.redirectUrl;

      // 修正ポイント2: undefined チェックで条件分岐
      if (userData) {
        setUser(userData);
        navigate(redirectUrl ?? '/dashboard');
      } else {
        setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
      }
    } catch (err) {
      // 修正ポイント3: try-catch で実行時エラーをキャッチ
      setError('通信エラーが発生しました。しばらくしてから再度お試しください。');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;

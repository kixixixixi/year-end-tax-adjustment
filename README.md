# 年末調整計算アプリ

日本の年末調整を簡単に計算できるWebアプリケーションです。国税庁の公式な計算方法に基づいて、正確な年末調整額を算出します。

## 🚀 デモ

[年末調整計算アプリを試す](https://your-username.github.io/year-end-tax-adjustment/)

## ✨ 機能

- **給与所得控除の自動計算** - 収入金額に応じた適切な控除額を計算
- **各種所得控除対応** - 基礎控除、配偶者控除、扶養控除など
- **保険料控除** - 生命保険料、地震保険料控除の計算
- **住宅ローン控除** - 住宅借入金等特別控除に対応
- **リアルタイム計算** - 入力と同時に結果を表示
- **レスポンシブデザイン** - スマートフォンからPCまで対応

## 🏗️ 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **UI**: React 19
- **スタイリング**: インラインCSS
- **パッケージマネージャー**: pnpm
- **デプロイ**: 静的サイト生成（SSG）

## 📊 計算対応項目

### 基本情報
- 年収（給与所得）
- 配偶者の年収
- 扶養親族数（70歳未満・70歳以上）

### 各種控除
- 生命保険料控除
- 地震保険料控除
- 小規模企業共済等掛金控除
- 住宅借入金等特別控除

### 自動計算項目
- 給与所得控除（令和7年分対応）
- 基礎控除（所得金額に応じて変動）
- 配偶者控除・配偶者特別控除
- 扶養控除
- 社会保険料控除（推定）

## 🛠️ 開発環境のセットアップ

### 前提条件

- Node.js 18以上
- pnpm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/year-end-tax-adjustment.git
cd year-end-tax-adjustment

# 依存関係のインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
pnpm dev
```

http://localhost:3000 でアプリケーションが起動します。

### その他のコマンド

```bash
# TypeScriptの型チェック
pnpm typecheck

# ESLintによるコードチェック
pnpm lint

# Prettierによるコード整形
pnpm format

# プロダクションビルド
pnpm build

# プロダクションサーバーの起動
pnpm start
```

## 📁 プロジェクト構成

```
app/
├── components/          # UIコンポーネント
│   ├── InputField.tsx   # 入力フィールドコンポーネント
│   ├── Section.tsx      # セクションコンポーネント
│   └── ResultDisplay.tsx # 結果表示コンポーネント
├── hooks/               # カスタムフック
│   └── useTaxCalculation.ts # 税計算ロジック
├── constants.ts         # 定数定義
├── types.ts            # 型定義
├── tax-calculator.ts   # 税計算エンジン
├── layout.tsx          # ルートレイアウト
└── page.tsx           # メインページ
```

## 🧮 計算仕様

### 給与所得控除（令和7年分）

| 給与等の収入金額 | 給与所得控除額 |
|---|---|
| 190万円以下 | 65万円 |
| 190万円超 360万円以下 | 収入金額 × 30% + 8万円 |
| 360万円超 660万円以下 | 収入金額 × 20% + 44万円 |
| 660万円超 850万円以下 | 収入金額 × 10% + 110万円 |
| 850万円超 | 195万円（上限） |

### 基礎控除

| 合計所得金額 | 控除額 |
|---|---|
| 2,400万円以下 | 48万円 |
| 2,400万円超 2,450万円以下 | 32万円 |
| 2,450万円超 2,500万円以下 | 16万円 |
| 2,500万円超 | 0円 |

### 配偶者控除・配偶者特別控除

配偶者の合計所得金額に応じて、38万円から段階的に減額

### 扶養控除

- 一般の控除対象扶養親族：38万円
- 老人扶養親族（70歳以上）：48万円

## ⚠️ 注意事項

- このアプリケーションは年末調整の概算計算を目的としています
- 実際の年末調整では、より詳細な項目や特例措置が適用される場合があります
- 正確な計算については、税理士や税務署にご相談ください
- 計算結果の正確性については保証いたしません

## 📚 参考資料

- [国税庁 - 年末調整の計算方法](https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/gensen/annai/nencho_keisan/index.htm)
- [国税庁 - 給与所得控除](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1410.htm)
- [国税庁 - 基礎控除](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1199.htm)

## 🤝 コントリビューション

プルリクエストやイシューの投稿を歓迎します。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 📞 サポート

質問や問題がある場合は、[GitHub Issues](https://github.com/your-username/year-end-tax-adjustment/issues) でお気軽にお知らせください。

---

**免責事項**: このソフトウェアは教育・参考目的で提供されています。実際の税務申告や年末調整業務については、必ず税理士や税務署などの専門機関にご相談ください。
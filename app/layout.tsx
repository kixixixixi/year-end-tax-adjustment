import "./style.css"

export const metadata = {
  title: "年末調整計算アプリ",
  description: "日本の年末調整を簡単に計算できるアプリケーションです",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <header
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "clamp(1.25rem, 4vw, 1.5rem)" }}>
              年末調整計算アプリ
            </h1>
          </header>
          <main
            style={{
              padding: "clamp(1rem, 4vw, 2rem)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
export default RootLayout

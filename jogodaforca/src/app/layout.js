import './globals.css'

export const metadata = {
  title: 'Jogo da Forca',
  description: 'Jogo da Forca em React',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
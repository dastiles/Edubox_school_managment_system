
import './globals.css'
import type { Metadata } from 'next'

import 'bootstrap/dist/css/bootstrap.min.css';

//CSS & Bootstrap
import "../assets/css/style.css";

import "../assets/plugins/select2/css/select2.min.css"


//Font Awesome
import "../assets/plugins/fontawesome/css/fontawesome.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import ClientOnly from './components/ClientOnly';

export const metadata: Metadata = {
  title: 'School Managment System',
  description: 'Ctreated for schools',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          {children}
        </ClientOnly>
      </body>
    </html>
  )
}

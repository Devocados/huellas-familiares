// diffrent rules for the sign and signout
//using this layout for structure for the sign-in and sign-out pages, ensuring authentication works correctly.

import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"


export const metadata = {
    title: 'Hugellas digitales',
    description: 'Familias'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-black-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
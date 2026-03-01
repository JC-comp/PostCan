import Script from 'next/script';

export default function GoogleAdsense() {
    const clientID = process.env.NEXT_PUBLIC_GA_CLIENT;

    if (!clientID) {
        return null;
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GA_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
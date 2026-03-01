import { Matcher, MatchResponse, ChildrenNode, Node } from 'interweave';
import Image from 'next/image';
import React from 'react';
interface ImageProps {
    src: string;
}
type ImageMatcherOptions = {
    [K in string]: never;
};

export function Img({ src }: ImageProps) {
    return <div className="relative w-full h-[40vh] rounded-xl border border-gray-200 dark:border-gray-800">
        <Image
            src={src}
            fill={true}
            className="w-full h-full object-contain"
            alt="Embedded content"
            unoptimized
        />
    </div>
}
export class ImageMatcher extends Matcher<ImageProps, ImageMatcherOptions> {
    // Look for strings ending in common image extensions
    replaceWith(children: ChildrenNode, props: ImageProps): Node {
        return React.createElement(Img, props, children);
    }

    asTag(): string {
        return 'div';
    }

    match(string: string): MatchResponse<ImageProps> | null {
        // Regex to find URLs ending in image extensions
        const response = this.doMatch(string, /(https:\/\/(.*-assets|megapx).dcard.tw\/(v1\/)?images\/.*)/i, (matches) => ({
            src: matches[0],
        }));
        return response;
    }
}
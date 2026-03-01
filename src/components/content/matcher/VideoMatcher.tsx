import { Matcher, MatchResponse, ChildrenNode, Node } from 'interweave';
import React from 'react';
interface VideoProps {
    src: string;
}
type VideoMatcherOptions = {
    [K in string]: never;
};

export function Video({ src }: VideoProps) {
    return <div className="relative w-full h-[40vh] rounded-xl border border-gray-200 dark:border-gray-800">
        <video className='object-contain w-full h-full'
            controls autoPlay loop muted >
            <source src={src}></source>
        </video>
    </div>
}
export class VideoMatcher extends Matcher<VideoProps, VideoMatcherOptions> {
    // Look for strings ending in common image extensions
    replaceWith(children: ChildrenNode, props: VideoProps): Node {
        return React.createElement(Video, props, children);
    }

    asTag(): string {
        return 'div';
    }

    match(string: string): MatchResponse<VideoProps> | null {
        // Regex to find URLs ending in image extensions
        const response = this.doMatch(string, /(https:\/\/megapx-assets.dcard.tw\/videos\/.*)/i, (matches) => ({
            src: matches[0],
        }));
        return response;
    }
}
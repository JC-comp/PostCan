import Image from "next/image";

const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
};

export default function PostAvatar({ author, size }: { author: Author; size: 'lg' | 'md' | 'sm' }) {
    if (author.avatar) {
        return <div className={`${sizeMap[size]} relative`}>
            <Image className={"rounded-full bg-gray-100 object-cover"}
            src={author.avatar} alt="avatar"
            fill={true}
            unoptimized />
        </div>
    } else {
        return <div className={`${sizeMap[size]} rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {author.name?.charAt(0)}
        </div>
    }
}
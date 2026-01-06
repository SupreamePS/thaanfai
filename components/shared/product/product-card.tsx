import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ id, title, price, image, category }: ProductCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
            <Link href={`/product/${id}`} className="block overflow-hidden aspect-square">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </Link>
            <div className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{category}</p>
                <Link href={`/product/${id}`}>
                    <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2 min-h-[3rem]">
                        {title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-bold">
                        ${price.toFixed(2)}
                    </p>
                    <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

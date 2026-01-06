import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">PROSTORE</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your one-stop destination for premium products. Quality meets convenience.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/new" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">New Arrivals</Link></li>
                            <li><Link href="/bestsellers" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Best Sellers</Link></li>
                            <li><Link href="/sale" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Sale</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Help</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/faq" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} PROSTORE. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

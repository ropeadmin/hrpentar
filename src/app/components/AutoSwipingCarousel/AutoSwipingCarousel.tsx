import React, { useEffect, useRef, useState } from 'react';
import { FadeIn } from '../Transitions/Transitions';

interface Product {
    name: string;
}

interface DesignTab {
    product: any;
    product_id: string;
}

interface AutoSwipingCarouselProps {
    designTab: DesignTab[];
    changeTabHandler: (name: string, id: string | null) => void;
}

const AutoSwipingCarousel: React.FC<AutoSwipingCarouselProps> = ({ designTab, changeTabHandler }) => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // Initialize carousel items
        const newItems = [
            <div
                key="all"
                className="flex flex-col items-center justify-between gap-4 cursor-pointer"
                onClick={() => changeTabHandler("All Designs", null)}
            >
                <div className="relative rounded-full w-[150px] h-[150px] bg-gray-200 overflow-hidden group">
                    <img
                        src='https://static.vecteezy.com/system/resources/thumbnails/020/435/416/small/realistic-notepad-blank-design-with-vector.jpg'
                        alt='All Designs'
                        className="w-full h-full object-cover rounded-full"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.6 2.4L7 8h10l1.4-2.4L21 3h2M4 6h16l1.2 6H5.8L4 6zM6 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                </div>
                <p className="text-odi text-sm font-normal">All Designs</p>
            </div>,
            ...designTab.map((tab) => (
                <FadeIn key={tab.product_id}>
                    <div
                        className="flex flex-col items-center justify-between gap-4 cursor-pointer"
                        onClick={() => changeTabHandler(tab.product.name, tab.product_id)}
                    >
                        <div className="relative rounded-full w-[150px] h-[150px] bg-gray-200 overflow-hidden group">
                            <img
                                src={
                                    tab.product.name.includes('A5 Notepad')
                                        ? 'https://static.vecteezy.com/system/resources/thumbnails/020/435/416/small/realistic-notepad-blank-design-with-vector.jpg'
                                        : tab.product.name.includes('Magic Mug')
                                            ? 'https://images.vexels.com/media/users/3/289910/raw/115750790ea404a65c9e2a8d5b37cc7f-mano-sosteniendo-un-dise-o-de-maqueta-de-taza.jpg'
                                            : tab.product.name.includes('Black T-shirt')
                                                ? 'https://cdn.psdrepo.com/images/2x/free-tshirt-mockup-download-l1.jpg'
                                                : tab.product.name.includes('Navy Blue T-shirt')
                                                    ? 'https://digiprintshop.com/wp-content/uploads/2021/12/ktee20d000-navy-2.jpg'
                                                    : tab.product.name.includes('White Sweatshirt')
                                                        ? 'https://img.freepik.com/premium-photo/cozy-sweatshirt-mockup-casual-sportswear-ai-generated_921479-16872.jpg?w=360'
                                                        : tab.product.name.includes('Navy Blue Sweatshirt')
                                                            ? 'https://versity-shop.com/cdn/shop/files/15359943293658459726_2048.jpg?v=1697664334&width=1946'
                                                            : tab.product.name.includes('Black Hoodies')
                                                                ? 'https://res.cloudinary.com/dtuims4ku/image/upload/v1722174207/ai-women-hoodie-mockup-0047_5_lxy1oa.png'
                                                                : ''
                                }
                                alt={tab.product.name}
                                className="w-full h-full object-cover rounded-full"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.6 2.4L7 8h10l1.4-2.4L21 3h2M4 6h16l1.2 6H5.8L4 6zM6 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </div>
                        </div>

                        <p className="text-odi text-sm font-normal">{tab.product.name}</p>
                    </div>
                </FadeIn>
            )),
        ];

        // Append 'All' item to end for smooth infinite loop effect
        setItems([...newItems, newItems[0]]);
    }, [designTab, changeTabHandler]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const totalItems = items.length;
        const itemWidth = 150 + 28; // width + gap
        let index = 0;

        // Set carousel width based on the number of items
        carousel.style.width = `${totalItems * itemWidth}px`;

        const slide = () => {
            if (carousel) {
                index++;
                carousel.style.transition = 'transform 1s ease';
                carousel.style.transform = `translateX(-${itemWidth * index}px)`;

                if (index >= totalItems - 1) {
                    setTimeout(() => {
                        carousel.style.transition = 'none';
                        carousel.style.transform = 'translateX(0)';
                        index = 0;
                    }, 1000); // Match transition duration
                }
            }
        };

        const intervalId = setInterval(slide, 3000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [items]);

    return (
        <div className="relative overflow-hidden w-full h-auto">
            <div
                ref={carouselRef}
                className="flex gap-7"
            >
                {items}
            </div>
        </div>
    );
};

export default AutoSwipingCarousel;

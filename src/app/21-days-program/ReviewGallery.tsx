'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

const reviews = [
  { src: '/21-days-program-reviews/18356886-f06d-4ef2-9d81-2b39ab76e0da.JPG', alt: 'Review 1' },
  { src: '/21-days-program-reviews/3de616f9-38eb-420a-ac64-7b43a70e6a41.JPG', alt: 'Review 2' },
  { src: '/21-days-program-reviews/9cac0f5d-e086-4e7f-a014-970ddbd6df2f.JPG', alt: 'Review 3' },
  { src: '/21-days-program-reviews/9247925b-763a-46e9-941e-4370e8d1ef00.JPG', alt: 'Review 4' },
  { src: '/21-days-program-reviews/5970eedb-362c-45af-a813-9336c374a7b0.JPG', alt: 'Review 5' },
  { src: '/21-days-program-reviews/509167ef-7813-4f9d-b393-b96274b40372.JPG', alt: 'Review 6' },
  { src: '/21-days-program-reviews/4d536aab-ea93-4891-802b-6c69fc8118a9.JPG', alt: 'Review 7' },
  { src: '/21-days-program-reviews/afa7bb6d-8b6d-46cc-93b6-a6ef31ca8c6b.JPG', alt: 'Review 8' },
  { src: '/21-days-program-reviews/ae00636d-c9fd-462d-899c-f61ed9c3bb02.JPG', alt: 'Review 9' },
  { src: '/21-days-program-reviews/be650c15-eb23-4e3c-bcfe-cf66de4c44a0.JPG', alt: 'Review 10' },
  { src: '/21-days-program-reviews/70c980c5-000a-4967-87e2-d7b311241898.JPG', alt: 'Review 11' },
  { src: '/21-days-program-reviews/a34e13a4-f610-4a63-acdf-9beff92d1ece.JPG', alt: 'Review 12' },
  { src: '/21-days-program-reviews/b76a3444-dc2f-4d85-8870-79a0bdcfb4f2.JPG', alt: 'Review 13' },
  { src: '/21-days-program-reviews/4a594ce3-ef04-4668-84d1-53e10077c757.JPG', alt: 'Review 14' },
  { src: '/21-days-program-reviews/fa414228-4ebd-4717-948a-653239ec746b.JPG', alt: 'Review 15' },
  { src: '/21-days-program-reviews/9234ec5a-af1e-4e14-8302-63379476273e.JPG', alt: 'Review 16' },
  { src: '/21-days-program-reviews/5637e150-aafd-49dc-ae7d-497fcd2becfd.JPG', alt: 'Review 17' },
];

export default function ReviewGallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const pauseOnTouch = () => {
    setPaused(true);
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
    }
  };

  const handlePointer = () => {
    pauseOnTouch();
    resumeTimer.current = window.setTimeout(() => setPaused(false), 8000);
  };

  useEffect(() => {
    if (!api || paused) {
      return;
    }
    const interval = setInterval(() => {
      if (document.hidden) {
        return;
      }
      api.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [api, paused]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) {
        window.clearTimeout(resumeTimer.current);
      }
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-green-50/60 to-white px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            <Quote className="h-3 w-3" />
            प्रत्यक्ष अनुभव
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#003C2F] md:text-4xl">
            सहभागींनी{' '}
            <span className="text-green-600">पाठवलेले प्रतिसाद</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            21 Days Life Changing Program मधील सहभागींनी त्यांचा अनुभव आमच्याशी
            शेअर केला. त्यांच्या स्वतःच्या शब्दांत त्यांचा अनुभव ऐकूया.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={review.src}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    onPointerDown={pauseOnTouch}
                    onPointerUp={handlePointer}
                    onPointerCancel={handlePointer}
                  >
                    <div className="relative aspect-auto overflow-hidden rounded-xl">
                      <Image
                        src={review.src}
                        alt={review.alt}
                        width={540}
                        height={960}
                        className="h-auto w-full object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 flex h-9 w-9 rounded-full border-green-200 bg-white/95 text-green-700 shadow-md hover:bg-green-50 hover:text-green-800 md:-left-12 md:h-10 md:w-10" />
            <CarouselNext className="-right-3 flex h-9 w-9 rounded-full border-green-200 bg-white/95 text-green-700 shadow-md hover:bg-green-50 hover:text-green-800 md:-right-12 md:h-10 md:w-10" />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center gap-2"
        >
          {reviews.map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-green-300/50"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

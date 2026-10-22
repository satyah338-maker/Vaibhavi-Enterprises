"use client";

import { pro } from "@/data/application";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import Image from "next/image";
import {
  CookingPot,
  Stethoscope,
  Pill,
  Shirt,
  Flame,
  Car,
  Wrench,
} from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  "Food Industry (Non-Stick)": (
    <CookingPot className="w-10 h-10 text-[#0E9696]" />
  ),
  "Medical Surgical Industry": (
    <Stethoscope className="w-10 h-10 text-[#0E9696]" />
  ),
  "Pharmacutical Industry": <Pill className="w-10 h-10 text-[#0E9696]" />,
  "Textile Industry": <Shirt className="w-10 h-10 text-[#0E9696]" />,
  "Oil & Gas Industry": <Flame className="w-10 h-10 text-[#0E9696]" />,
  "Automotive Industry": <Car className="w-10 h-10 text-[#0E9696]" />,
  "Engineering Industry": <Wrench className="w-10 h-10 text-[#0E9696]" />,
};

export default function IndustryApplications() {
  const router = useRouter();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
        {pro.map((item, index) => (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/industry/${item.slug}`);
            }}
            className={`cursor-pointer p-4 border rounded-lg shadow-sm bg-gray-200 group transition-transform duration-300 hover:-translate-y-1 hover:shadow-md opacity-0 animate-fade-in animation-delay-${
              index * 100
            } flex flex-col justify-between`}
          >
            <div>
              <div className="mb-3 flex gap-2 items-center text-[#0E9696] font-bold text-xl md:text-2xl">
                {iconMap[item.name] ?? (
                  <Wrench className="w-5 h-5 text-[#0E9696]" />
                )}
                {item.name}
              </div>

              <div className="flex gap-2 overflow-hidden">
                {item.images?.slice(0, 2).map((img, i) => (
                  <div
                    key={i}
                    className="relative w-1/2 h-28 rounded overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedImage(img);
                    }}
                  >
                    <Image
                      src={img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              <ul className="mt-4 list-disc list-inside text-sm text-gray-700 min-h-[72px]">
                {item.appli.length > 0 ? (
                  item.appli.map((a, i) => <li key={i}>{a}</li>)
                ) : (
                  <li className="italic text-gray-400">
                    No applications listed
                  </li>
                )}
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/industry/${item.slug}`);
              }}
              className="mt-4 px-4 py-1 text-lg bg-[#0E9696] text-white rounded hover:bg-[#0c7e7e]"
            >
              More Information
            </button>
          </div>
        ))}
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative w-[90%] max-w-4xl h-[80%]">
            <Image
              src={expandedImage}
              alt="Expanded View"
              fill
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

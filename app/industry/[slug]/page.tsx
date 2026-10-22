"use client";

import { notFound, useParams } from "next/navigation";
import { ImageGallery } from "@/components/ImageGallery";
import { getProBySlug } from "@/data/application";
import {
  CookingPot,
  Stethoscope,
  Pill,
  Shirt,
  Flame,
  Car,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  "Food Industry (Non-Stick)": <CookingPot className="w-6 h-6 text-primary" />,
  "Medical Surgical Industry": <Stethoscope className="w-6 h-6 text-primary" />,
  "Pharmacutical Industry": <Pill className="w-6 h-6 text-primary" />,
  "Textile Industry": <Shirt className="w-6 h-6 text-primary" />,
  "Oil & Gas Industry": <Flame className="w-6 h-6 text-primary" />,
  "Automotive Industry": <Car className="w-6 h-6 text-primary" />,
  "Engineering Industry": <Wrench className="w-6 h-6 text-primary" />,
};

export default function IndustryDetailPage() {
  const params = useParams();
  const industry = getProBySlug(params.slug as string);

  if (!industry) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-3">
            <div>{iconMap[industry.name as keyof typeof iconMap]}</div>
            <div>
              <Badge variant="secondary">Industry</Badge>
              <CardTitle className="text-2xl text-primary">
                {industry.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base">
              {industry.description ||
                `Explore our specialized solutions and applications for the ${industry.name.toLowerCase()} industry.`}
            </p>
          </CardContent>
        </Card>

        {industry.properties && industry.properties?.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Key Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                {industry.properties &&
                  industry.properties.map((prop, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-primary">•</span>
                      {prop}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="space-y-10">
          {industry.details && industry.details?.length > 0
            ? industry.details &&
              industry.details.map((detail, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {index + 1}. {detail.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-base">
                      {detail.description}
                    </p>
                    <ImageGallery
                      images={detail.images}
                      industryName={industry.name}
                    />
                  </CardContent>
                </Card>
              ))
            : industry.images &&
              industry.images?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageGallery
                      images={industry.images}
                      industryName={industry.name}
                    />
                  </CardContent>
                </Card>
              )}
        </div>
      </div>
    </div>
  );
}

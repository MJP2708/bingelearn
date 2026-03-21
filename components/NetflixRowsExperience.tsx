"use client";

import { useState } from "react";
import { ContentItem } from "@/lib/content-items";
import { ContentModal } from "@/components/ContentModal";
import { HeroBanner } from "@/components/HeroBanner";
import { HorizontalRow } from "@/components/HorizontalRow";

type RowConfig = {
  title: string;
  items: ContentItem[];
};

type NetflixRowsExperienceProps = {
  hero: ContentItem;
  heroEyebrow?: string;
  rowLabel?: string;
  rows: RowConfig[];
};

export function NetflixRowsExperience({ hero, heroEyebrow, rowLabel, rows }: NetflixRowsExperienceProps) {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  return (
    <div className="space-y-10">
      <HeroBanner item={hero} eyebrow={heroEyebrow} rowLabel={rowLabel} />
      <div className="space-y-10">
        {rows.map((row) => (
          <HorizontalRow key={row.title} title={row.title} items={row.items} onMoreInfo={setSelectedItem} />
        ))}
      </div>
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

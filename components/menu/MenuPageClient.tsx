"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Hero from "@/components/menu/Hero";
import CategoryNavigation from "@/components/menu/CategoryNavigation";
import MenuSection from "@/components/menu/MenuSection";
import ItemModal from "@/components/menu/ItemModal";
import IngredientOrigins from "@/components/menu/IngredientOrigins";

import { MenuHeroData } from "@/components/menu/Hero/hero.types";

import {
  MenuItem,
  MenuSectionData,
} from "@/components/menu/MenuSection/menuSection.types";

import { IngredientOrigin } from "@/lib/menu/ingredientOrigins";

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const getComparableNames = (value: string) => {
  const raw = value ?? "";
  const withoutParentheses = raw.replace(/\s*\([^)]*\)/g, "").trim();
  const cleaned = withoutParentheses
    .replace(/\s+[-–—]\s*.*$/, "")
    .trim();

  return Array.from(
    new Set(
      [raw, withoutParentheses, cleaned]
        .filter(Boolean)
        .map((entry) => normalizeText(entry))
    )
  );
};

const findMenuTarget = (sections: MenuSectionData[], productName: string | null) => {
  if (!productName) {
    return { activeCategory: "all", selectedItem: null, selectedSection: null };
  }

  const normalizedTarget = normalizeText(productName);

  for (const section of sections) {
    const sectionNames = [
      ...getComparableNames(section.titleEn),
      ...getComparableNames(section.titleAr),
      section.id,
    ];

    if (sectionNames.some((value) => value === normalizedTarget || value.includes(normalizedTarget) || normalizedTarget.includes(value))) {
      const firstItem = section.items[0] ?? null;
      return {
        activeCategory: section.id,
        selectedItem: firstItem,
        selectedSection: section,
      };
    }

    for (const item of section.items) {
      const itemNames = [
        ...getComparableNames(item.titleEn),
        ...getComparableNames(item.titleAr),
        ...getComparableNames(item.captionEn ?? ""),
        ...getComparableNames(item.captionAr ?? ""),
      ];

      if (itemNames.some((value) => value === normalizedTarget || value.includes(normalizedTarget) || normalizedTarget.includes(value))) {
        return {
          activeCategory: section.id,
          selectedItem: item,
          selectedSection: section,
        };
      }
    }
  }

  return { activeCategory: "all", selectedItem: null, selectedSection: null };
};

interface Props {
  hero: MenuHeroData;
  sections: MenuSectionData[];
  ingredientOrigins: IngredientOrigin[];
  disclaimerEn?: string;
  disclaimerAr?: string;
}

export default function MenuPageClient({
  hero,
  sections,
  ingredientOrigins,
  disclaimerEn,
  disclaimerAr,
}: Props) {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product");

  const matchedProductTarget = useMemo(
    () => findMenuTarget(sections, productName),
    [sections, productName]
  );

  const [activeCategory, setActiveCategory] = useState("all");

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [selectedSection, setSelectedSection] =
    useState<MenuSectionData | null>(null);

  useEffect(() => {
    if (!productName || !matchedProductTarget.selectedSection) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(matchedProductTarget.selectedSection!.id);

      if (!section) {
        return;
      }

      const stickyOffset = 96;
      const top =
        window.scrollY + section.getBoundingClientRect().top - stickyOffset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [productName, matchedProductTarget.selectedSection]);

  const resolvedActiveCategory =
    productName && matchedProductTarget.activeCategory !== "all"
      ? matchedProductTarget.activeCategory
      : activeCategory;

  const resolvedSelectedItem =
    productName && matchedProductTarget.selectedItem
      ? matchedProductTarget.selectedItem
      : selectedItem;

  const resolvedSelectedSection =
    productName && matchedProductTarget.selectedSection
      ? matchedProductTarget.selectedSection
      : selectedSection;

  const handleSelectItem = (
    item: MenuItem,
    section: MenuSectionData
  ) => {
    setSelectedItem(item);
    setSelectedSection(section);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedSection(null);

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("product");
    window.history.replaceState({}, "", nextUrl.toString());
  };

  return (
    <main className="min-h-screen">
      <Hero data={hero} />

      <CategoryNavigation
        categories={sections.map((section) => ({
          id: section.id,
          titleEn: section.titleEn,
          titleAr: section.titleAr,
        }))}
        activeCategory={resolvedActiveCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="flex flex-col">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className={
              resolvedActiveCategory === "all" ||
              resolvedActiveCategory === section.id
                ? "block"
                : "hidden"
            }
          >
            <MenuSection
              section={section}
              onSelectItem={handleSelectItem}
            />
          </div>
        ))}
      </div>

      <IngredientOrigins
        items={ingredientOrigins}
        disclaimerEn={disclaimerEn}
        disclaimerAr={disclaimerAr}
      />

      <ItemModal
        item={resolvedSelectedItem}
        section={resolvedSelectedSection}
        onClose={handleCloseModal}
      />
    </main>
  );
}
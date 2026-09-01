"use server";

import { createClient } from "../supabase/server";

export interface FooterAnnouncement {
  id: number;
  textEn: string;
  textAr: string;
  displayOrder: number;
  isActive: boolean;
}

export interface FooterTickerSettings {
  locationEn: string;
  locationAr: string;
  isLiveVisible: boolean;
  isWeatherVisible: boolean;
}

export interface FooterTickerData {
  settings: FooterTickerSettings;
  announcements: FooterAnnouncement[];
}

export async function getFooterTickerData(): Promise<FooterTickerData> {
  const supabase = await createClient();

  const [{ data: settingsData }, { data: announcementsData }] = await Promise.all([
    supabase.from("footer_ticker_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("footer_announcements")
      .select("*")
      .order("display_order", { ascending: true }),
  ]);

  return {
    settings: {
      locationEn: settingsData?.location_en ?? "KUWAIT CITY",
      locationAr: settingsData?.location_ar ?? "مدينة الكويت",
      isLiveVisible: settingsData?.is_live_visible ?? true,
      isWeatherVisible: settingsData?.is_weather_visible ?? true,
    },
    announcements: (announcementsData || []).map((item) => ({
      id: Number(item.id),
      textEn: item.text_en ?? "",
      textAr: item.text_ar ?? "",
      displayOrder: Number(item.display_order) || 0,
      isActive: Boolean(item.is_active),
    })),
  };
}

export async function updateFooterTickerSettings(settings: FooterTickerSettings) {
  const supabase = await createClient();

  const { error } = await supabase.from("footer_ticker_settings").upsert({
    id: 1,
    location_en: settings.locationEn,
    location_ar: settings.locationAr,
    is_live_visible: settings.isLiveVisible,
    is_weather_visible: settings.isWeatherVisible,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error updating footer ticker settings:", error);
    throw new Error(error.message || "Failed to update settings.");
  }
}

export async function createAnnouncement() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("footer_announcements")
    .insert({
      text_en: "New Announcement",
      text_ar: "إعلان جديد",
      display_order: 0,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating announcement:", error);
    throw new Error(error.message || "Failed to create announcement.");
  }

  return data;
}

export async function updateAnnouncement(announcement: FooterAnnouncement) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("footer_announcements")
    .update({
      text_en: announcement.textEn,
      text_ar: announcement.textAr,
      display_order: Number(announcement.displayOrder) || 0,
      is_active: Boolean(announcement.isActive),
    })
    .eq("id", Number(announcement.id));

  if (error) {
    console.error("Error updating announcement:", error);
    throw new Error(error.message || "Failed to update announcement.");
  }
}

export async function deleteAnnouncement(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("footer_announcements")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error("Error deleting announcement:", error);
    throw new Error(error.message || "Failed to delete announcement.");
  }
}
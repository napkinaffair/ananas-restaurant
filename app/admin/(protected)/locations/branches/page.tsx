import { createClient } from "@/lib/supabase/server";

import BranchForm from "@/components/admin/locations/branches/BranchForm";

export default async function LocationsBranchesPage() {
  const supabase = await createClient();

  const [
    locationsResult,
    featuresResult,
    platformsResult,
    branchFeaturesResult,
    branchPlatformsResult,
  ] = await Promise.all([
    supabase
      .from("locations")
      .select("*")
      .order("display_order"),

    supabase
      .from("location_features")
      .select("*")
      .order("name_en"),

    supabase
      .from("delivery_platforms")
      .select("*")
      .order("name"),

    supabase
      .from("branch_features")
      .select("*")
      .order("display_order", { ascending: true }),

    supabase
      .from("branch_delivery_platforms")
      .select("*"),
  ]);

  if (
    locationsResult.error ||
    featuresResult.error ||
    platformsResult.error ||
    branchFeaturesResult.error ||
    branchPlatformsResult.error
  ) {
    console.error("Failed to load branches data:", {
      locations: locationsResult.error,
      features: featuresResult.error,
      platforms: platformsResult.error,
      branchFeatures: branchFeaturesResult.error,
      branchPlatforms: branchPlatformsResult.error,
    });
    throw new Error("Failed to load branches.");
  }

  const branchFeaturesData = branchFeaturesResult.data ?? [];
  const branchPlatformsData = branchPlatformsResult.data ?? [];

  const initialBranches = (locationsResult.data ?? []).map((branch) => {
    let image = "";

    if (branch.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(branch.image);

      image = `${publicUrl}?v=${branch.updated_at}`;
    }

    const locFeatures = branchFeaturesData.filter(
      (item) => item.location_id === branch.id
    );

    const featureOrders: Record<number, number> = {};
    locFeatures.forEach((item) => {
      featureOrders[item.feature_id] = item.display_order ?? 1;
    });

    return {
      id: branch.id,

      slug: branch.slug,

      nameEn: branch.name_en,
      nameAr: branch.name_ar,

      addressEn: branch.address_en,
      addressAr: branch.address_ar,

      workingHoursEn: branch.working_hours_en,
      workingHoursAr: branch.working_hours_ar,

      customerServiceHoursEn: branch.customer_service_hours_en,
      customerServiceHoursAr: branch.customer_service_hours_ar,

      tagEn: branch.tag_en,
      tagAr: branch.tag_ar,

      noteEn: branch.note_en,
      noteAr: branch.note_ar,

      image: branch.image,
      imageUrl: image,

      latitude: branch.latitude,
      longitude: branch.longitude,

      googleMapsUrl: branch.google_maps_url,

      appleMapsUrl: branch.apple_maps_url ?? "",

      displayOrder: branch.display_order,

      isActive: branch.is_active,

      features: locFeatures.map((item) => item.feature_id),

      featureOrders,

      deliveryPlatforms: branchPlatformsData
        .filter((item) => item.location_id === branch.id)
        .map((item) => item.platform_id),
    };
  });

  return (
    <BranchForm
      initialBranches={initialBranches}
      features={(featuresResult.data ?? []).map((feature) => ({
        id: feature.id,
        code: feature.code,
        nameEn: feature.name_en,
        nameAr: feature.name_ar,
        icon: feature.icon,
      }))}
      deliveryPlatforms={(platformsResult.data ?? []).map((platform) => ({
        id: platform.id,
        code: platform.code || "",
        nameEn: platform.name || "",
        nameAr: platform.name_ar || "",
        icon: platform.icon || "",
      }))}
    />
  );
}
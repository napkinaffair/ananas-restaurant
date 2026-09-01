import { getFooterTickerData } from "@/lib/admin/footerTicker";
import FooterTickerForm from "@/components/admin/footer/FooterTickerForm";

export default async function AdminFooterPage() {
  const { settings, announcements } = await getFooterTickerData();

  return (
    <div className="space-y-6">
      <FooterTickerForm
        initialSettings={settings}
        initialAnnouncements={announcements}
      />
    </div>
  );
}
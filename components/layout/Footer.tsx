import { getFooterTickerData } from "@/lib/admin/footerTicker";
import FooterTicker from "./FooterTicker";
import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";

export default async function Footer() {
  const { settings, announcements } = await getFooterTickerData();

  return (
    <footer>
      <FooterTicker
        initialSettings={settings}
        initialAnnouncements={announcements}
      />
      <FooterContent />
      <FooterBottom />
    </footer>
  );
}
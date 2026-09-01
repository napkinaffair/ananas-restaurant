"use client";

import { useState } from "react";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Switch from "@/components/admin/ui/Switch";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  FooterTickerSettings,
  FooterAnnouncement,
  updateFooterTickerSettings,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/lib/admin/footerTicker";

interface Props {
  initialSettings: FooterTickerSettings;
  initialAnnouncements: FooterAnnouncement[];
}

export default function FooterTickerForm({
  initialSettings,
  initialAnnouncements,
}: Props) {
  const [settings, setSettings] = useState<FooterTickerSettings>(initialSettings);
  const [announcements, setAnnouncements] =
    useState<FooterAnnouncement[]>(initialAnnouncements);

  const [savingSettings, setSavingSettings] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true);
      await updateFooterTickerSettings(settings);
      alert("Settings saved successfully.");
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      setCreating(true);
      await createAnnouncement();
      window.location.reload();
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "Failed to create announcement.");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateAnnouncement = async (item: FooterAnnouncement) => {
    try {
      setLoadingId(item.id);
      await updateAnnouncement(item);
      alert("Announcement updated successfully.");
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "Failed to update announcement.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      setLoadingId(id);
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      alert("Announcement deleted successfully.");
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || "Failed to delete announcement.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Settings Card */}
      <Card>
        <SectionTitle title="Footer Ticker Settings" />
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <Input
            label="Location Name (EN)"
            value={settings.locationEn}
            onChange={(e) =>
              setSettings({ ...settings, locationEn: e.target.value })
            }
          />
          <Input
            label="Location Name (AR)"
            value={settings.locationAr}
            onChange={(e) =>
              setSettings({ ...settings, locationAr: e.target.value })
            }
          />
          <Switch
            label="Show Live Time"
            checked={settings.isLiveVisible}
            onChange={(val) => setSettings({ ...settings, isLiveVisible: val })}
          />
          <Switch
            label="Show Temperature"
            checked={settings.isWeatherVisible}
            onChange={(val) =>
              setSettings({ ...settings, isWeatherVisible: val })
            }
          />
        </div>
        <div className="mt-6">
          <Button disabled={savingSettings} onClick={handleSaveSettings}>
            {savingSettings ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </Card>

      {/* Announcements List */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle title="Announcements" />
          <Button disabled={creating} onClick={handleCreateAnnouncement}>
            {creating ? "Adding..." : "+ Add Announcement"}
          </Button>
        </div>

        <div className="space-y-4">
          {announcements.length === 0 ? (
            <p className="text-sm text-gray-500">No announcements added yet.</p>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 p-4 space-y-4 bg-gray-50/50"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Announcement Text (EN)"
                    value={item.textEn}
                    onChange={(e) =>
                      setAnnouncements((prev) =>
                        prev.map((a) =>
                          a.id === item.id ? { ...a, textEn: e.target.value } : a
                        )
                      )
                    }
                  />
                  <Input
                    label="Announcement Text (AR)"
                    value={item.textAr}
                    onChange={(e) =>
                      setAnnouncements((prev) =>
                        prev.map((a) =>
                          a.id === item.id ? { ...a, textAr: e.target.value } : a
                        )
                      )
                    }
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Input
                      label="Order"
                      type="number"
                      value={item.displayOrder}
                      onChange={(e) =>
                        setAnnouncements((prev) =>
                          prev.map((a) =>
                            a.id === item.id
                              ? { ...a, displayOrder: Number(e.target.value) }
                              : a
                          )
                        )
                      }
                    />
                    <Switch
                      label="Active"
                      checked={item.isActive}
                      onChange={(val) =>
                        setAnnouncements((prev) =>
                          prev.map((a) =>
                            a.id === item.id ? { ...a, isActive: val } : a
                          )
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      disabled={loadingId === item.id}
                      onClick={() => handleDeleteAnnouncement(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      disabled={loadingId === item.id}
                      onClick={() => handleUpdateAnnouncement(item)}
                    >
                      {loadingId === item.id ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSiteSettings, updateSiteSettings } from "@/lib/firebase/settings";
import { uploadBannerImage } from "@/lib/firebase/storage";
import { Button } from "@/components/ui/Button";
import { Aperture } from "@/components/ui/Aperture";
import { useToast } from "@/context/ToastContext";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !settings) {
    return (
      <div className="flex justify-center py-16">
        <Aperture size={28} className="animate-spin text-ink/25" />
      </div>
    );
  }

  async function handleHeroImage(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadBannerImage(file);
      setSettings((prev) => (prev ? { ...prev, hero: { ...prev.hero, imageUrl: url } } : prev));
    } finally {
      setUploading(false);
    }
  }

  function addCollection() {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            collections: [
              ...prev.collections,
              { id: `c-${Date.now()}`, name: "", slug: "", imageUrl: "" },
            ],
          }
        : prev
    );
  }

  function updateCollection(id: string, field: "name" | "slug" | "imageUrl", value: string) {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            collections: prev.collections.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
          }
        : prev
    );
  }

  function removeCollection(id: string) {
    setSettings((prev) =>
      prev ? { ...prev, collections: prev.collections.filter((c) => c.id !== id) } : prev
    );
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      showToast("메인 페이지 설정이 저장되었습니다", "success");
    } catch {
      showToast("저장에 실패했습니다", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="pb-24">
      <h1 className="mb-8 font-display text-2xl text-ink">메인 페이지 관리</h1>

      <section className="mb-10">
        <h2 className="mb-4 font-body text-sm font-medium text-ink">Hero</h2>
        <div className="relative mb-4 aspect-[16/7] overflow-hidden rounded-lg bg-line">
          {settings.hero.imageUrl && (
            <Image src={settings.hero.imageUrl} alt="Hero" fill className="object-cover" />
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-3 right-3 rounded-full bg-surface/90 px-4 py-2 font-body text-xs text-ink"
          >
            {uploading ? "업로드 중..." : "이미지 변경"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleHeroImage(e.target.files?.[0])}
          />
        </div>
        <div className="flex flex-col gap-3">
          <input
            className="settings-input"
            placeholder="Hero 제목"
            value={settings.hero.title}
            onChange={(e) =>
              setSettings((prev) => (prev ? { ...prev, hero: { ...prev.hero, title: e.target.value } } : prev))
            }
          />
          <textarea
            className="settings-input resize-none"
            rows={2}
            placeholder="Hero 설명"
            value={settings.hero.description}
            onChange={(e) =>
              setSettings((prev) =>
                prev ? { ...prev, hero: { ...prev.hero, description: e.target.value } } : prev
              )
            }
          />
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-body text-sm font-medium text-ink">컬렉션</h2>
          <button onClick={addCollection} className="font-body text-xs text-accent">
            + 컬렉션 추가
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {settings.collections.map((c) => (
            <div key={c.id} className="grid grid-cols-1 gap-2 rounded-lg border border-line p-4 sm:grid-cols-3">
              <input
                className="settings-input"
                placeholder="컬렉션 이름"
                value={c.name}
                onChange={(e) => updateCollection(c.id, "name", e.target.value)}
              />
              <input
                className="settings-input"
                placeholder="slug (예: film-series)"
                value={c.slug}
                onChange={(e) => updateCollection(c.id, "slug", e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  className="settings-input"
                  placeholder="이미지 URL"
                  value={c.imageUrl}
                  onChange={(e) => updateCollection(c.id, "imageUrl", e.target.value)}
                />
                <button onClick={() => removeCollection(c.id)} className="px-2 text-muted">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-body text-sm font-medium text-ink">입금 계좌 정보</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            className="settings-input"
            placeholder="은행명"
            value={settings.bankInfo.bankName}
            onChange={(e) =>
              setSettings((prev) =>
                prev ? { ...prev, bankInfo: { ...prev.bankInfo, bankName: e.target.value } } : prev
              )
            }
          />
          <input
            className="settings-input"
            placeholder="계좌번호"
            value={settings.bankInfo.accountNumber}
            onChange={(e) =>
              setSettings((prev) =>
                prev ? { ...prev, bankInfo: { ...prev.bankInfo, accountNumber: e.target.value } } : prev
              )
            }
          />
          <input
            className="settings-input"
            placeholder="예금주"
            value={settings.bankInfo.accountHolder}
            onChange={(e) =>
              setSettings((prev) =>
                prev ? { ...prev, bankInfo: { ...prev.bankInfo, accountHolder: e.target.value } } : prev
              )
            }
          />
        </div>
      </section>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "저장 중..." : "변경사항 저장"}
      </Button>

      <style jsx global>{`
        .settings-input {
          width: 100%;
          border: 1px solid #e4ddd0;
          border-radius: 8px;
          padding: 10px 14px;
          font-family: var(--font-manrope);
          font-size: 14px;
          background: white;
        }
        .settings-input:focus {
          outline: 1.5px solid #1c1a17;
        }
      `}</style>
    </div>
  );
}

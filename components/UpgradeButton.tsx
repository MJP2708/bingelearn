"use client";

export function UpgradeButton() {
  async function handleUpgrade() {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
    });

    const data = (await response.json()) as { url?: string };
    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <button onClick={handleUpgrade} className="netflix-button rounded-xl px-5 py-3 font-semibold transition">
      Upgrade to subscription
    </button>
  );
}

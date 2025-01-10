"use client";

import { useTranslation } from "react-i18next";

export default function Page() {
  return (
    <main>
      <ClientComponent />
    </main>
  );
}

function ClientComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
    </div>
  );
}

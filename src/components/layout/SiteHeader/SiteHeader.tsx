import { Logo } from "@/components/brand/Logo/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation/MobileNavigation";
import { PrimaryNavigation } from "@/components/layout/PrimaryNavigation/PrimaryNavigation";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { primaryNavigation } from "@/content/navigation";
import { site } from "@/content/site";

import { HeaderShell } from "./HeaderShell";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-full items-center gap-10">
        <Logo href="/" eager className="h-9 nav:h-12" />
        <PrimaryNavigation items={primaryNavigation} className="ml-auto hidden nav:block" />
        <Button href={site.booking.href} size="sm" icon="arrow-right" className="hidden nav:inline-flex">
          {site.booking.label}
        </Button>
        <MobileNavigation items={primaryNavigation} className="ml-auto nav:hidden" />
      </Container>
    </HeaderShell>
  );
}

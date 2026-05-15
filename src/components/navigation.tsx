"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Home, Search, BookOpen, Shield, PlayCircle, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavigationProps {
  currentPage?: string;
}

export function Navigation({ currentPage }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-[#00b06a]/30 group-hover:ring-[#00b06a]/60 transition-all">
              <Image src="/images/logo.jpg" alt="RBXPass" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text leading-none">RBXPass</h1>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Активация кодов</p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex gap-1">
            <NavLink href="/" icon={Home} label="Главная" active={currentPage === "home" || currentPage === "activation"} />
            <NavLink href="/status" icon={Search} label="Статус" active={currentPage === "status"} />
            <NavLink href="/instructions" icon={BookOpen} label="Инструкция" active={currentPage === "instructions"} />
            <NavLink href="https://rutube.ru/video/a2652268ba8a379f99c77eecb5ac7745/" icon={PlayCircle} label="Видео" external />
            <NavLink href="/support" icon={Shield} label="Поддержка" active={currentPage === "support"} />
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Меню" className="text-foreground hover:bg-white/5">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0d0d14] border-white/5 p-6">
                <SheetTitle className="text-lg font-semibold mb-6 gradient-text">Навигация</SheetTitle>
                <div className="flex flex-col gap-1">
                  <MobileNavLink href="/" icon={Home} label="Главная" active={currentPage === "home" || currentPage === "activation"} />
                  <MobileNavLink href="/status" icon={Search} label="Статус заказа" active={currentPage === "status"} />
                  <MobileNavLink href="/instructions" icon={BookOpen} label="Инструкция" active={currentPage === "instructions"} />
                  <MobileNavLink href="https://rutube.ru/video/a2652268ba8a379f99c77eecb5ac7745/" icon={PlayCircle} label="Видеоинструкция" external />
                  <MobileNavLink href="/support" icon={Shield} label="Поддержка" active={currentPage === "support"} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon: Icon, label, active, external }: {
  href: string; icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean; external?: boolean;
}) {
  const cls = `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    active ? "bg-[#00b06a]/10 text-[#00b06a]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
  }`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}><Icon className="w-3.5 h-3.5" />{label}</a>;
  return <Link href={href} className={cls}><Icon className="w-3.5 h-3.5" />{label}</Link>;
}

function MobileNavLink({ href, icon: Icon, label, active, external }: {
  href: string; icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean; external?: boolean;
}) {
  const cls = `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
    active ? "bg-[#00b06a]/10 text-[#00b06a]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
  }`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}><Icon className="w-5 h-5" />{label}</a>;
  return <Link href={href} className={cls}><Icon className="w-5 h-5" />{label}</Link>;
}

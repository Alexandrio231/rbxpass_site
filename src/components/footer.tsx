import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-8">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold gradient-text">RBXPass</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Сервис активации кодов для получения Robux. Быстро, безопасно, с гарантией.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Навигация</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-[#00b06a] transition-colors">Главная</Link>
              <Link href="/instructions" className="text-sm text-muted-foreground hover:text-[#00b06a] transition-colors">Инструкция</Link>
              <Link href="/status" className="text-sm text-muted-foreground hover:text-[#00b06a] transition-colors">Статус заказа</Link>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-[#00b06a] transition-colors">Поддержка</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Документы</h4>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#00b06a] transition-colors">Политика конфиденциальности</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-[#00b06a] transition-colors">Пользовательское соглашение</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} RBXPass. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <a href="https://t.me/rbxpass_loothub" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-[#00b06a] transition-colors">Telegram</a>
            <a href="https://vk.com/rbxpass_loothub" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-[#00b06a] transition-colors">VKontakte</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

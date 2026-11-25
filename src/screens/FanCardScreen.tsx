import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Coffee, Camera, Gift, Check, Sparkles, Star } from 'lucide-react';
import { REWARDS } from '@/lib/data';
import { usePoints } from '@/lib/points';
import { Modal } from '@/components/Modal';

const REWARD_ICONS: Record<string, typeof Coffee> = { coffee: Coffee, scarf: Gift, camera: Camera };

export function FanCardScreen() {
  const { points, spendPoints } = usePoints();
  const [redeemed, setRedeemed] = useState<string | null>(null);
  const [voucher, setVoucher] = useState<{ title: string; cost: number } | null>(null);

  const redeem = (id: string, title: string, cost: number) => {
    if (redeemed) return;
    if (!spendPoints(cost)) return;
    setRedeemed(id);
    setVoucher({ title, cost });
  };

  return (
    <div className="px-4 pt-5 pb-28 space-y-5">
      <div>
        <h1 className="font-display text-2xl uppercase tracking-wide text-white">Karta Kibica</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">Program lojalnościowy Szarotek</p>
      </div>

      {/* Fan Card */}
      <div className="relative perspective-1000">
        <div className="relative rounded-3xl overflow-hidden holo-card p-5 border border-gold-400/20 shadow-2xl"
          style={{ transform: 'rotateX(2deg) rotateY(-1deg)' }}
        >
          <div className="absolute inset-0 shimmer-bg animate-shimmer pointer-events-none opacity-60" />
          {/* Decorative */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold-400/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-red-400/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gold-400 font-semibold">Karta Kibica</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-wider mt-0.5">Podhale Nowy Targ • Sezon 26/27</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-[9px] font-bold uppercase border border-gold-400/30 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-gold-300" /> VIP
              </span>
            </div>

            <div className="flex items-end gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-red-400 flex items-center justify-center text-navy-900 font-display text-2xl shrink-0">
                JK
              </div>
              <div className="flex-1">
                <p className="font-display text-lg uppercase text-white leading-none">Jan Kowalski</p>
                <p className="text-[11px] text-gold-400 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Fanatyk z Kowańca
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">Saldo</p>
                <p className="font-display text-3xl text-gradient-gold tabular leading-none">{points.toLocaleString('pl-PL')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Szarotek</p>
              </div>
              <div className="bg-white p-2 rounded-xl">
                <QRCodeSVG value={`PODHALE-FAN-JK-2026-${points}`} size={64} bgColor="#FFFFFF" fgColor="#0A1628" level="M" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[9px] text-gray-500 tabular">ID: PNT-2026-00148</span>
              <span className="text-[9px] text-gray-500">Ważna do 30.06.2027</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-4 h-4 text-gold-400" />
          <h2 className="font-display text-base uppercase tracking-wide text-white">Nagrody</h2>
        </div>
        <div className="space-y-2.5">
          {REWARDS.map(r => {
            const Icon = REWARD_ICONS[r.icon] || Gift;
            const canAfford = points >= r.cost && !redeemed;
            return (
              <div key={r.id} className="glass rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white font-medium leading-snug">{r.title}</p>
                  <p className="text-[11px] text-gold-400 font-bold tabular mt-0.5">{r.cost.toLocaleString('pl-PL')} pkt</p>
                </div>
                <button
                  onClick={() => redeem(r.id, r.title, r.cost)}
                  disabled={!canAfford}
                  className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase transition-all active:scale-95 ${canAfford ? 'bg-gold-400 text-navy-900 hover:bg-gold-300' : 'bg-white/5 text-gray-500'}`}
                >
                  {redeemed === r.id ? <Check className="w-4 h-4" /> : 'Odbierz'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voucher Modal */}
      <Modal open={!!voucher} onClose={() => setVoucher(null)} title="Voucher Nagrody">
        {voucher && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="font-display text-lg uppercase text-white mb-1">Nagroda odebrana!</h3>
            <p className="text-sm text-gray-400 mb-1">{voucher.title}</p>
            <p className="text-[11px] text-gold-400 font-bold tabular mb-5">−{voucher.cost.toLocaleString('pl-PL')} Szarotek</p>

            <div className="bg-white p-4 rounded-2xl inline-block mb-4">
              <QRCodeSVG value={`PODHALE-VOUCHER-${voucher.title.slice(0,10).toUpperCase()}`} size={140} bgColor="#FFFFFF" fgColor="#0A1628" level="M" />
            </div>
            <p className="text-[11px] text-gray-400 mb-1">Pokaż ten kod przy kasie na hali</p>
            <p className="text-[10px] text-gray-500 tabular">Kod: VT-{Date.now().toString().slice(-8)}</p>

            <button onClick={() => setVoucher(null)} className="w-full mt-5 py-3 rounded-xl bg-white/10 text-white font-semibold active:scale-95 transition-transform">
              Zamknij
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

import Image from "next/image";
export function BrandPanel({ title, text }: { title: string; text: string }) {
  return <aside className="hidden rounded-[100px_100px_24px_24px] border border-[#caa6af] bg-white/50 px-8 py-10 text-center shadow-[0_18px_50px_#5b1a2b0b] md:block"><Image src="/images/monograma-if.svg" alt="" width={150} height={150} className="mx-auto" /><p className="mt-3 font-display text-2xl text-wine">{title}</p><p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#794354]">{text}</p></aside>;
}

import Image from "next/image";

interface StakfloBrandMarkProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function StakfloBrandMark({
  src,
  alt,
  width = 36,
  height = 36,
  className = "h-8 w-8 shrink-0 object-contain",
  priority = false,
}: StakfloBrandMarkProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
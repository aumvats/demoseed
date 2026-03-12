"use client";

import Image from "next/image";

interface AvatarCellProps {
  name: string;
  email: string;
  avatar: string;
}

export function AvatarCell({ name, email, avatar }: AvatarCellProps) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <Image
        src={avatar}
        alt={name}
        width={28}
        height={28}
        className="rounded-full shrink-0 ring-1 ring-ds-border"
        unoptimized
      />
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ds-text-primary truncate">
          {name}
        </p>
        <p className="text-[11px] text-ds-text-secondary truncate">{email}</p>
      </div>
    </div>
  );
}

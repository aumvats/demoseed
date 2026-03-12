"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";

interface EditableCellProps {
  value: string;
  onEdit: (value: string) => void;
}

export function EditableCell({ value, onEdit }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const commit = () => {
    if (editValue !== value) {
      onEdit(editValue);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
          if (e.key === "Tab") {
            e.preventDefault();
            commit();
          }
        }}
        className="w-full h-full px-1 py-0.5 text-[13px] bg-ds-bg-primary border border-ds-accent rounded text-ds-text-primary outline-none font-data"
      />
    );
  }

  return (
    <div
      className="group flex items-center gap-1 cursor-text min-w-0"
      onClick={() => setIsEditing(true)}
    >
      <span className="text-[13px] text-ds-text-primary truncate">{value}</span>
      <Pencil className="w-3 h-3 text-ds-text-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </div>
  );
}

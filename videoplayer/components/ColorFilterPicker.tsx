"use client";

import styles from "./ColorFilterPicker.module.css";
import { FILTERS, type FilterId } from "@/lib/filters";

interface ColorFilterPickerProps {
  value: FilterId;
  onChange: (id: FilterId) => void;
}

export default function ColorFilterPicker({ value, onChange }: ColorFilterPickerProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Tonalidade</span>
      <div className={styles.swatches}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.swatch} ${value === f.id ? styles.active : ""}`}
            onClick={() => onChange(f.id)}
            aria-pressed={value === f.id}
            title={f.label}
          >
            <span className={styles.dot} style={{ background: f.swatch }} />
            <span className={styles.swatchLabel}>{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

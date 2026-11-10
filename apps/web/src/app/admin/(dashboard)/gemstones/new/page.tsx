import * as React from "react";
import { GemstoneForm } from "@/components/admin/gemstone-form";

export default function NewGemstonePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-medium text-forest-deep">
          Add New Gemstone Lot
        </h2>
        <p className="mt-1 text-xs text-stone leading-relaxed">
          Register a newly acquired colored gemstone parcel or fine faceted cut stone into the LibraGems commercial intake.
        </p>
      </div>

      <GemstoneForm isEditing={false} />
    </div>
  );
}

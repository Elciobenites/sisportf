import type { ArchitectureStep } from "@/data/projects";

type ArchitectureFlowProps = {
  steps: ArchitectureStep[];
};

export function ArchitectureFlow({ steps }: ArchitectureFlowProps) {
  return (
    <div className="card-surface rounded-2xl p-5 sm:p-6">
      <p className="mb-5 text-sm text-mist">
        Diagrama simplificado. Um desenho mais detalhado pode ser adicionado depois.
      </p>
      <ol className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        {steps.map((step, index) => (
          <li key={step.label} className="flex items-center gap-3">
            <span className="rounded-xl border border-line bg-navy-950 px-3 py-2 text-sm font-medium text-snow">
              {step.label}
            </span>
            {index < steps.length - 1 ? (
              <span className="text-mist lg:hidden" aria-hidden="true">
                ↓
              </span>
            ) : null}
            {index < steps.length - 1 ? (
              <span className="hidden text-mist lg:inline" aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

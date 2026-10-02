import type { JSX, SVGProps, ReactNode } from "react";

export type TechIconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

export function TechIcon({ name, className, ...props }: TechIconProps): JSX.Element {
  const normalized = name.toLowerCase().trim();

  let iconContent: ReactNode;

  // Google Cloud
  if (
    normalized.includes("google cloud") ||
    normalized.includes("gcp") ||
    normalized.includes("vertex") ||
    normalized.includes("bigquery")
  ) {
    iconContent = (
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    );
  }
  // Python
  else if (normalized.includes("python")) {
    iconContent = (
      <>
        <path d="M12 9H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3" />
        <path d="M12 15h7a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3" />
        <path d="M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4" />
        <path d="M16 15v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h4" />
        <circle cx="11" cy="5.5" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="13" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
      </>
    );
  }
  // PostgreSQL / Database
  else if (normalized.includes("postgres")) {
    iconContent = (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </>
    );
  }
  // dbt / Transformation
  else if (normalized.includes("dbt")) {
    iconContent = (
      <>
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </>
    );
  }
  // Docker
  else if (normalized.includes("docker")) {
    iconContent = (
      <>
        <path d="M22 12.5c-1.8-.3-2.7-1.1-3.5-2.5H3c-.6 0-1 .4-1 1v4c0 3.3 2.7 6 6 6h6.5c3.5 0 6.5-2.5 7.5-6.5.3 0 .7-.1 1-.1" />
        <path d="M5 8h2v2H5z" />
        <path d="M8 8h2v2H8z" />
        <path d="M11 8h2v2h-2z" />
        <path d="M8 5h2v2H8z" />
        <path d="M11 5h2v2h-2z" />
        <path d="M14 8h2v2h-2z" />
      </>
    );
  }
  // Terraform
  else if (normalized.includes("terraform")) {
    iconContent = (
      <>
        <path d="M2 3l6 3.5v7L2 10V3Z" />
        <path d="M9 7l6-3.5v7L9 14V7Z" />
        <path d="M9 15.5l6-3.5v7L9 22.5v-7Z" />
        <path d="M16 3.5L22 7v7l-6-3.5V3.5Z" />
      </>
    );
  }
  // FastAPI
  else if (normalized.includes("fastapi")) {
    iconContent = (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M13 6.5l-4.5 7h4l-1.5 5 5.5-8h-4.5l1.5-4Z" />
      </>
    );
  }
  // React
  else if (normalized.includes("react")) {
    iconContent = (
      <>
        <ellipse cx="12" cy="12" rx="9" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </>
    );
  }
  // Tailwind CSS
  else if (normalized.includes("tailwind")) {
    iconContent = (
      <>
        <path d="M11.667 6c-2.49 0-4.044 1.222-4.667 3.6.8-1.144 1.844-1.508 3.133-1.092.79.255 1.355.817 1.98 1.439 1.018 1.014 2.196 2.053 4.887 2.053 2.49 0 4.044-1.222 4.667-3.6-.8 1.144-1.844 1.508-3.133 1.092-.79-.255-1.355-.817-1.98-1.439-1.018-1.014-2.196-2.053-4.887-2.053Z" />
        <path d="M7 13c-2.49 0-4.044 1.222-4.667 3.6.8-1.144 1.844-1.508 3.133-1.092.79.255 1.355.817 1.98 1.439 1.018 1.014 2.196 2.053 4.887 2.053 2.49 0 4.044-1.222 4.667-3.6-.8 1.144-1.844 1.508-3.133 1.092-.79-.255-1.355-.817-1.98-1.439-1.018-1.014-2.196-2.053-4.887-2.053Z" />
      </>
    );
  }
  // Selenium
  else if (normalized.includes("selenium")) {
    iconContent = (
      <>
        <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
        <path d="M2.5 8.5h19" />
        <path d="m7 12.5 2 2-2 2" />
        <line x1="12" y1="16.5" x2="16" y2="16.5" />
      </>
    );
  }
  // Power BI
  else if (normalized.includes("power bi") || normalized.includes("powerbi")) {
    iconContent = (
      <>
        <rect x="3.5" y="13" width="4" height="8" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="16.5" y="3" width="4" height="18" rx="1" />
      </>
    );
  }
  // Pentaho / ETL Workflow
  else if (normalized.includes("pentaho") || normalized.includes("kettle")) {
    iconContent = (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <path d="M18 9v6" />
        <path d="M6 9v3a3 3 0 0 0 3 3h6" />
      </>
    );
  }
  // XGBoost / Decision Tree
  else if (normalized.includes("xgboost") || normalized.includes("gradient boosting")) {
    iconContent = (
      <>
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="M12 7.5v4" />
        <path d="M6 16.5v-1a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" />
      </>
    );
  }
  // Fallback terminal tool icon
  else {
    iconContent = (
      <>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {iconContent}
    </svg>
  );
}
